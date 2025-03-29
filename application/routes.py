from flask import current_app as app, jsonify, request, render_template
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required, current_user
from  .database import db
from .models import Customer, Professional

datastore = app.security.datastore

@app.route('/', methods = ['GET'])
def home():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    if not email:
        return jsonify({
            "message": "Email is required"
        }), 400
    
    user = app.security.datastore.find_user(email = email)
    
    if user:
        if verify_password(password, user.password):
            login_user(user)
            return jsonify({
                "message": "Logged in successfully",
                "auth-token": user.get_auth_token(),
                "user_id": user.id,
            }), 200
        else:
            return jsonify({
                "message": "Invalid password"
            }), 400
    else:
        return jsonify({
            "message": "User not found"
        }), 404

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']
    password2 = data['password2']
    name = data['name']
    try:
        if not email or not password or not name:
            return jsonify({"message": "Missing email, password or name"}), 400
        
        if password != password2:
            return jsonify({"message": "password don't match"}), 400
        
        if app.security.datastore.find_user(email=data['email']):
            return jsonify({"message": "User already exists"}), 400

        if 'phone' in data and 'address' in data:
            user = app.security.datastore.create_user(email=email, password=hash_password(password), name=name, roles=['user'])
            db.session.add(user)
            db.session.commit()
            customer = Customer(user_id=user.id, phone= data['phone'], address= data['address'])
            db.session.add(customer)
            db.session.commit()
            return jsonify({"message": "Customer created successfully"}), 201

        elif 'experience' in data and 'service_type' in data:
            app.security.datastore.create_user(email=email, password=password, name=name, roles=['pro'])
            db.session.add(user)
            db.session.commit()
            professional = Professional(user_id=user.id, experience= data['experience'], service_type= data['service_type']) 
            db.session.add(professional)
            db.session.commit()
            return jsonify({"message": "Professional created successfully"}), 201
    except Exception as e:
        print(e)
        db.session.rollback()
        app.security.datastore.delete_user(user)
        db.session.commit()
        return jsonify({"message": "Error in register"}), 400
    
@app.route('/api/logout', methods=['POST'])
@auth_required('token')
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

# ----------------  Admin  -----------------

@app.route('/api/admin')
@auth_required('token')
@roles_required('admin')
def admin_page():
    return jsonify({
        "message": "Admin login successful"
    })
    
@app.route('/api/create_service', methods=['POST'])
@roles_required('admin')
@auth_required('token')
def create_service():
    data = request.get_json()
    service = ServiceType(
        name=data['name'],
        description=data.get('description', ''),
        base_price=data['base_price']
    )
    db.session.add(service)
    db.session.commit()
    
    log_admin_activity(current_user.id, 'create_service', service.id)
    return jsonify(service.to_dict()), 201

@app.route('/api/edit_services/<int:service_id>', methods=['PUT'])
@roles_required('admin')
@auth_required('token')
def edit_service(service_id):
    service = ServiceType.query.get_or_404(service_id)
    data = request.get_json()
    
    service.name = data.get('name', service.name)
    service.description = data.get('description', service.description)
    service.base_price = data.get('base_price', service.base_price)
    
    db.session.commit()
    log_admin_activity(current_user.id, 'update_service', service.id)
    return jsonify(service.to_dict())

# admin/professionals.py
@app.route('/professionals/<int:pro_id>/verify', methods=['POST'])
@roles_required('admin')
@auth_required('token')
def verify_professional(pro_id):
    """Verify a professional account"""
    professional = Professional.query.get_or_404(pro_id)
    professional.is_verified = True
    db.session.commit()
    
    log_admin_activity(current_user.id, 'verify_professional', pro_id)
    return jsonify({"status": "verified"})

# admin/users.py
@app.route('/users/<int:user_id>/suspend', methods=['POST'])
@roles_required('admin')
@auth_required('token')
def suspend_user(user_id):
    """Suspend a user account"""
    user = User.query.get_or_404(user_id)
    user.active = False
    db.session.commit()
    
    log_admin_activity(current_user.id, 'suspend_user', user_id)
    return jsonify({"status": "suspended"})
    

@app.route('/api/pro')
@auth_required('token')
@roles_required('pro')
def pro_page():
    user = current_user
    return jsonify({
        "username": user.name,
        "email": user.email,
        "message": "User login successful"
    })

@app.route('/api/user')
@auth_required('token')
@roles_required('user')
def user_page():
    user = current_user
    return jsonify({
        "username": user.name,
        "email": user.email,
        "message": "User login successful"
    })
