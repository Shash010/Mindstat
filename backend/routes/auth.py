from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import mongo
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 409

    hashed_password = generate_password_hash(data["password"])
    user_data = {
        "email": data["email"],
        "password": hashed_password,
        "name": data.get("name", "")  # Add additional fields if needed
    }
    mongo.db.users.insert_one(user_data)
    return jsonify({"message": "User registered"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"email": data["email"]})

    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user["email"])
    return jsonify({"token": token})

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": user_email}, {"_id": 0, "password": 0})

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"msg": "User not found"}), 404
