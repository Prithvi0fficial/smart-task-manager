# AGENT.md — Smart Task Manager Architecture Guide

## Project Overview
Smart Task Manager is a full-stack web application for managing tasks with authentication and CRUD functionality.

## Architecture

### Frontend
- Handles UI rendering
- Communicates with backend via REST API
- Located in `/frontend`

### Backend
- Handles authentication
- Task CRUD operations
- API endpoints
- Located in `/backend`

## Data Flow
User → Frontend → API Request → Backend → Database → Response → UI Update

## Setup Instructions

### Backend
cd backend
install dependencies
run server

### Frontend
cd frontend
install dependencies
start client

## Developer Rules
- Follow REST API structure
- Keep business logic in backend
- Maintain modular code structure
