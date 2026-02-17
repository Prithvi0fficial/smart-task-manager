import pytest
from app import create_app
from app.utils.db import db


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client


def test_create_task(client):
    response = client.post("/tasks", json={"title": "Test task"})
    assert response.status_code == 201


def test_get_tasks(client):
    client.post("/tasks", json={"title": "Test"})
    response = client.get("/tasks")
    assert response.status_code == 200


def test_validation(client):
    response = client.post("/tasks", json={})
    assert response.status_code == 400

def test_update_task(client):
    res = client.post("/tasks", json={"title": "Old"})
    task_id = res.json["id"]

    response = client.put(
        f"/tasks/{task_id}",
        json={"title": "New"}
    )

    assert response.status_code == 200


def test_delete_task(client):
    res = client.post("/tasks", json={"title": "Delete Me"})
    task_id = res.json["id"]

    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
