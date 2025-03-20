from flask_restful import Resource, reqparse
from flask import jsonify, request
from .models import User
from .database import db

class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        return jsonify(user.to_dict())
        
    def post(self):
        data = request.get_json()
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict())
        
    def put(self, user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user.to_dict())
        
    def delete(self, user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({
            "message": "User deleted"
        })

class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])