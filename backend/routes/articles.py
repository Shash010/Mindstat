from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId

articles_bp = Blueprint("articles", __name__, url_prefix="/articles")

# 🔹 Helper to get MongoDB collection
def get_article_collection():
    client = MongoClient(current_app.config["MONGO_URI"])
    db = client["MentalHealth"]
    return db["articles"]

# 🔸 Get all articles
@articles_bp.route("", methods=["GET"])
def get_articles():
    collection = get_article_collection()
    articles = list(collection.find())
    for art in articles:
        art["id"] = str(art["_id"])
        del art["_id"]
    return jsonify(articles), 200

# 🔸 Add new article
@articles_bp.route("", methods=["POST"])
@jwt_required()
def add_article():
    data = request.get_json()
    if not data or not data.get("title") or not data.get("description") or not data.get("link"):
        return jsonify({"error": "Missing required fields"}), 400

    data["user"] = get_jwt_identity()
    collection = get_article_collection()
    result = collection.insert_one(data)
    return jsonify({"message": "Article added", "id": str(result.inserted_id)}), 201