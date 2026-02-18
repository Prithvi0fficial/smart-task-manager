## Smart Task Manager

A small task management application built with Python Flask (API) and React, implementing full CRUD operations with task priority, status, and logging.
________________________________________
## Tech Stack
•	Backend: Python 3.10, Flask, Flask-SQLAlchemy

•	Frontend: React, Axios

•	Database: SQLite

•	Tools: VSCode, Git

•	Other: Logging for create/update/delete, client-server validation
________________________________________
## Features
•	Create, update, delete tasks

•	Mark tasks as completed/pending

•	Edit task priority: low, medium, high

•	Validations to prevent invalid task data

•	Logging for create, update, delete actions

•	Responsive UI with modern styling

•	All API interactions handled with Axios
________________________________________
## Installation & Setup
Backend
1.	Navigate to backend folder:
 	cd backend
2.	Install dependencies:
 	pip install -r requirements.txt
3.	Run the app:
 	python run.py
 	The API will run on http://127.0.0.1:5000.
Frontend
1.	Navigate to frontend folder:
 	cd frontend
2.	Install dependencies:
 	npm install
3.	Start the development server:
 	npm start
 	The frontend will run on http://localhost:3000.
________________________________________
## API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create a new task
GET	/tasks/<id>	Get single task
PUT	/tasks/<id>	Update task
DELETE	/tasks/<id>	Delete task
All endpoints validate input data and return JSON responses.
________________________________________
## Logging
Backend logs every create, update, delete action with task ID for traceability.
Update actions also log status and priority changes.
________________________________________
## AI Guidance 
•	AI-assisted planning for React state management and Axios API integration

•	Used structured prompts to verify proper backend validations and frontend updates
________________________________________
## Known Limitations / Extensions
•	No authentication/login (can be added for multi-user support)

•	Could extend to persistent database like PostgreSQL for production

•	Can add due dates, filtering, or search functionality
________________________________________
## Testing

Backend testing is implemented using pytest.

### Test Results
- Total tests: 5
- Status: All tests passed

### Run Tests
pytest

Tests cover:
- Core backend functionality
- API validation
- Database logic

________________________________________

## Health Check 

•	GET /health

•	Returns system and database status.

•	Used for monitoring and failure detection.

               curl http://127.0.0.1:5000/health

•	Purpose: Observability and failure diagnosis.
________________________________________
## PRITHVI V

BCA Graduate – Software Development and Web Design
Prepared for Better Software Associate Software Engineer Assessment
All code created specifically for this assessment. 

