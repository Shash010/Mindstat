from flask import Blueprint, jsonify, current_app
from pymongo import MongoClient
from flask_jwt_extended import jwt_required

visualizations_bp = Blueprint('visualizations', __name__)

def get_db_collection():
    mongo_client = MongoClient(current_app.config["MONGO_URI"])
    db = mongo_client["MentalHealth"]
    return db["Mindstat"]


@visualizations_bp.route('/visualizations/gender', methods=['GET'])
def gender_distribution():
    collection = get_db_collection()
    pipeline = [
        {"$group": {"_id": "$Gender", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    results = list(collection.aggregate(pipeline))
    labels = [r["_id"] for r in results if r["_id"]]
    data = [r["count"] for r in results if r["_id"]]
    return jsonify({"labels": labels, "data": data})


@visualizations_bp.route('/visualizations/social_weakness', methods=['GET'])
@jwt_required()
def social_weakness_distribution():
    collection = get_db_collection()
    pipeline = [
        {"$group": {"_id": "$Social_Weakness", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    results = list(collection.aggregate(pipeline))
    labels = [r["_id"] for r in results if r["_id"]]
    data = [r["count"] for r in results if r["_id"]]
    return jsonify({"labels": labels, "data": data})


@visualizations_bp.route('/visualizations/country', methods=['GET'])
def participants_by_country():
    collection = get_db_collection()
    pipeline = [
        {"$group": {"_id": "$Country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    results = list(collection.aggregate(pipeline))
    labels = [r["_id"] for r in results if r["_id"]]
    data = [r["count"] for r in results if r["_id"]]
    return jsonify({"labels": labels, "data": data})

@visualizations_bp.route('/visualizations/mood_swings', methods=['GET'])
@jwt_required()
def mood_swings_chart():
    collection = get_db_collection()
    pipeline = [
        {"$group": {"_id": "$Mood_Swings", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    results = list(collection.aggregate(pipeline))
    labels = [r["_id"] for r in results if r["_id"]]
    data = [r["count"] for r in results if r["_id"]]
    return jsonify({"labels": labels, "data": data})

@visualizations_bp.route('/visualizations/days_indoors', methods=['GET'])
@jwt_required()
def days_indoors_chart():
    collection = get_db_collection()
    pipeline = [
        {"$group": {"_id": "$Days_Indoors", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    results = list(collection.aggregate(pipeline))
    labels = [r["_id"] for r in results if r["_id"]]
    data = [r["count"] for r in results if r["_id"]]
    return jsonify({"labels": labels, "data": data})

@visualizations_bp.route("/visualizations/stress_by_indoors", methods=["GET"])
@jwt_required()
def stress_by_days_indoors():
    collection = get_db_collection()
    pipeline = [
        {
            "$group": {
                "_id": {
                    "Days_Indoors": "$Days_Indoors",
                    "Growing_Stress": "$Growing_Stress"
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$group": {
                "_id": "$_id.Days_Indoors",
                "stress_counts": {
                    "$push": {
                        "stress": "$_id.Growing_Stress",
                        "count": "$count"
                    }
                }
            }
        },
        {"$sort": {"_id": 1}}
    ]
    results = list(collection.aggregate(pipeline))

    labels = []
    stress_categories = ["Yes", "No", "Maybe"]
    stress_data = {cat: [] for cat in stress_categories}

    for r in results:
        labels.append(r["_id"])
        counts = {item["stress"]: item["count"] for item in r["stress_counts"]}
        for cat in stress_categories:
            stress_data[cat].append(counts.get(cat, 0))

    return jsonify({"labels": labels, "datasets": stress_data})

@visualizations_bp.route("/visualizations/stress_by_occupation", methods=["GET"])
@jwt_required()
def stress_by_occupation():
    collection = get_db_collection()
    pipeline = [
        {
            "$group": {
                "_id": {
                    "Occupation": "$Occupation",
                    "Growing_Stress": "$Growing_Stress"
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$group": {
                "_id": "$_id.Occupation",
                "stress_counts": {
                    "$push": {
                        "stress": "$_id.Growing_Stress",
                        "count": "$count"
                    }
                }
            }
        },
        {"$sort": {"_id": 1}}
    ]

    results = list(collection.aggregate(pipeline))
    labels = []
    stress_categories = ["Yes", "No", "Maybe"]
    stress_data = {cat: [] for cat in stress_categories}

    for r in results:
        labels.append(r["_id"])
        counts = {item["stress"]: item["count"] for item in r["stress_counts"]}
        for cat in stress_categories:
            stress_data[cat].append(counts.get(cat, 0))

    return jsonify({"labels": labels, "datasets": stress_data})