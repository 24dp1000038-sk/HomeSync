from flask import Flask
from .database import db
from .models import User, Role
from .config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS

app = None

def start():
    app = Flask(__name__, template_folder='frontend', static_folder='frontend/static', static_url_path='/static')
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    CORS(app)
    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore)
    app.app_context().push()
    
    return app
    
app = start()

from .create_initial_data import *
from .routes import *   

if __name__ == '__main__':
    app.run()