from flask import Flask
from app.utils.db import db
from flask_cors import CORS
from app.utils.logger import setup_logger

def create_app():
    app = Flask(__name__)

    # Database config (simple SQLite)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)  
    logger = setup_logger()
    app.logger = logger

    # REGISTER ROUTES (VERY IMPORTANT)
    from .routes.task_routes import task_bp
    app.register_blueprint(task_bp)

    return app
