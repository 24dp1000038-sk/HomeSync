from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required, current_user, roles_accepted

datastore = app.security.datastore

@app.route('/')
def home():
    return 'hello'

@app.route('/admin')
@auth_required('token')
@roles_required('admin')
def admin_page():
    return jsonify({
        "message": "Admin login successful"
    })
    
@app.route('/user')
@auth_required('token')
@roles_accepted('user', 'admin')
def user_page():
    user = current_user
    return jsonify({
        "username": user.username,
        "email": user.email,
        "message": "User login successful"
    })
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = datastore.create_user(**data)
    return jsonify({
        "message": "User created",
        "user": user.to_dict()
    })  
    