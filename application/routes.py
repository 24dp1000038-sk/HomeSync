from flask import current_app as app, jsonify, request
from flask_security import login_user, hash_password, verify_password, auth_required, logout_user, roles_required
from  .database import db
from .models import Customer, Professional

datastore = app.security.datastore

@app.route('/')
def index():
    return jsonify({"message": "Hello from backend"}), 200

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
                "user_name": user.name,
                "user_email": user.email,
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
    password = hash_password(data['password'])
    name = data['name']
    
    try:
        if not email or not password or not name:
            return jsonify({"message": "Missing email, password or name"}), 400

        if app.security.datastore.find_user(email=data['email']):
            return jsonify({"message": "User already exists"}), 400

        if 'phone' in data and 'address' in data:
            user = app.security.datastore.create_user(email=email, password=password, name=name, roles=['user'])
            db.session.commit()
            customer = Customer(user_id=user.id, phone= data['phone'], address= data['address'])
            db.session.add(customer)
            db.session.commit()
            return jsonify({"message": "Customer created successfully"}), 201

        elif 'experience' in data and 'service_type' in data:
            user = app.security.datastore.create_user(email=email, password=password, name=name, roles=['pro'])
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

@app.route('/api/admin')
@auth_required('token')
@roles_required('admin')
def admin_page():
    return jsonify({
        "message": "Admin login successful"
    })

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
