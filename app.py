from flask import Flask
from backend.database import db
from backend.models import User, Role
from backend.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore

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

import backend.create_initial_data
from backend.routes import *

if __name__ == '__main__':
    app.run()