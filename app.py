from flask import Flask
from application.database import db
from application.models import User, Role
from application.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore, hash_password


app = None

def start():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore)
    app.app_context().push()
    
    return app
    
app = start()

with app.app_context():
    db.create_all()
    
    app.security.datastore.find_or_create_role(name='admin', description = 'admin of housesync')
    app.security.datastore.find_or_create_role(name='service', description = 'housesync service providers')
    app.security.datastore.find_or_create_role(name='user', description = 'user to get the service from service providers')
    db.session.commit()
    
    if not app.security.datastore.find_user(email= 'admin@gmail.com'):
        app.security.datastore.create_user(email = 'admin@gmail.com',name='admin', password = hash_password('password'), roles = ['admin'])
        
    if not app.security.datastore.find_user(email= 'sam@gmail.com'):
        app.security.datastore.create_user(email = 'sam@gmail.com',name='sam', password = hash_password('password'), roles = ['user'])
    
    db.session.commit()

from application.routes import *

if __name__ == '__main__':
    app.run()