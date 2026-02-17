from flask import Blueprint, request, jsonify
from app.utils.db import db
from app.models.task import Task
from app.schemas.task_schema import validate_task 
from flask import current_app
from sqlalchemy import text

# Create blueprint ONCE
task_bp = Blueprint("task", __name__)


#  Create Task
@task_bp.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    error = validate_task(data)
    if error:
        current_app.logger.error(error)
        return jsonify({"error": error}), 400

    task = Task(
        title=data["title"],
        description=data.get("description"),
        status=data.get("status", "pending"),
        priority=data.get("priority", "medium")
    )

    db.session.add(task)
    db.session.commit()

    current_app.logger.info(f"Task created: {task.id}")

    return jsonify({"message": "Task created", "id": task.id}), 201



#  Get all tasks
@task_bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()

    result = []
    for task in tasks:
        result.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "created_at": task.created_at
        })

    return jsonify(result)


#  Get single task
@task_bp.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):
    task = Task.query.get_or_404(id)

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "priority": task.priority,
        "created_at": task.created_at
    })


#  Update task
@task_bp.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    task = db.session.get(Task, id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()

    error = validate_task(data)
    if error:
        return jsonify({"error": error}), 400

    old_title = task.title
    old_status = task.status
    old_priority = task.priority

    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.status = data.get("status", task.status)
    task.priority = data.get("priority", task.priority)

    db.session.commit()

    current_app.logger.info(
        f"Task updated: {id} | "
        f"Title: {old_title} -> {task.title}, "
        f"Status: {old_status} -> {task.status}, "
        f"Priority: {old_priority} -> {task.priority}"
    )

    return jsonify({"message": "Task updated"})


#  Delete task
@task_bp.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = db.session.get(Task, id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    current_app.logger.info(f"Task deleted: {id}")

    return jsonify({"message": "Task deleted"})



# Health check endpoint
@task_bp.route("/health", methods=["GET"])
def health_check():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify({
            "status": "ok",
            "database": "connected"
        }), 200
    except Exception as e:
        current_app.logger.error(str(e))
        return jsonify({
            "status": "error",
            "database": "disconnected"
        }), 500
