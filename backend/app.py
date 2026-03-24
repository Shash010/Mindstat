from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

CORS(app)
mongo = PyMongo(app)
jwt = JWTManager(app)

from routes.auth import auth_bp
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True)

from routes.visualizations import visualizations_bp
app.register_blueprint(visualizations_bp)

from routes.survey import survey_bp
app.register_blueprint(survey_bp)

from routes.resources import resources_bp
app.register_blueprint(resources_bp)

from routes.articles import articles_bp
app.register_blueprint(articles_bp)