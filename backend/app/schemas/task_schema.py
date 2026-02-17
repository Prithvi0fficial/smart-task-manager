ALLOWED_STATUS = ["pending", "completed"]
ALLOWED_PRIORITY = ["low", "medium", "high"]


def validate_task(data):
    if not data:
        return "Request body is required"

    # title required
    if "title" not in data or not data["title"].strip():
        return "Title is required"

    # validate status
    if "status" in data and data["status"] not in ALLOWED_STATUS:
        return f"Status must be one of {ALLOWED_STATUS}"

    # validate priority
    if "priority" in data and data["priority"] not in ALLOWED_PRIORITY:
        return f"Priority must be one of {ALLOWED_PRIORITY}"

    return None
