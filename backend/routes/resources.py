from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from pymongo import MongoClient
from bson import ObjectId

resources_bp = Blueprint("resources", __name__, url_prefix="/resources")

# 🔹 Helper to get MongoDB collection
def get_resource_collection():
    client = MongoClient(current_app.config["MONGO_URI"])
    db = client["MentalHealth"]
    return db["resources"]

# 🔸 Get all resources
@resources_bp.route("", methods=["GET"])
@jwt_required()
def get_resources():
    collection = get_resource_collection()
    resources = list(collection.find())
    for res in resources:
        res["id"] = str(res["_id"])
        del res["_id"]
    return jsonify(resources), 200

# 🔸 Add new resource
@resources_bp.route("", methods=["POST"])
@jwt_required()
def add_resource():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    collection = get_resource_collection()
    result = collection.insert_one(data)
    return jsonify({"message": "Resource added", "id": str(result.inserted_id)}), 201

# 🔸 (Optional) Delete a resource by ID
@resources_bp.route("/<resource_id>", methods=["DELETE"])
@jwt_required()
def delete_resource(resource_id):
    collection = get_resource_collection()
    result = collection.delete_one({"_id": ObjectId(resource_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Resource not found"}), 404
    return jsonify({"message": "Resource deleted"}), 200