from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId

survey_bp = Blueprint("survey", __name__, url_prefix="/survey")

# 🔹 Helper to get MongoDB collection
def get_survey_collection():
    client = MongoClient(current_app.config["MONGO_URI"])
    db = client["MentalHealth"]
    return db["surveyResponses"]  # Change name if needed

# 🔸 Create a new survey
@survey_bp.route("", methods=["POST"])
@jwt_required()
def submit_survey():
    data = request.get_json()
    user_email = get_jwt_identity()
    if not data:
        return jsonify({"error": "Missing data"}), 400

    data["user"] = user_email
    collection = get_survey_collection()
    inserted = collection.insert_one(data)
    return jsonify({"message": "Survey submitted", "id": str(inserted.inserted_id)}), 201

# 🔸 Read all surveys for logged-in user
@survey_bp.route("", methods=["GET"])
@jwt_required()
def get_surveys():
    user_email = get_jwt_identity()
    collection = get_survey_collection()
    surveys = list(collection.find({"user": user_email}))
    for s in surveys:
        s["id"] = str(s["_id"])
        del s["_id"]
    return jsonify(surveys)

# 🔸 Update a specific survey
@survey_bp.route("/<survey_id>", methods=["PUT"])
@jwt_required()
def update_survey(survey_id):
    user_email = get_jwt_identity()
    data = request.get_json()
    collection = get_survey_collection()
    result = collection.update_one(
        {"_id": ObjectId(survey_id), "user": user_email},
        {"$set": data}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Survey not found or unauthorized"}), 404
    return jsonify({"message": "Survey updated"}), 200

# 🔸 Delete a specific survey
@survey_bp.route("/<survey_id>", methods=["DELETE"])
@jwt_required()
def delete_survey(survey_id):
    user_email = get_jwt_identity()
    collection = get_survey_collection()
    result = collection.delete_one(
        {"_id": ObjectId(survey_id), "user": user_email}
    )
    if result.deleted_count == 0:
        return jsonify({"error": "Survey not found or unauthorized"}), 404
    return jsonify({"message": "Survey deleted"}), 200
