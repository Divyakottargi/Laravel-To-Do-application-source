# Task Management System

A full-stack task management application developed as part of my Full Stack Development Internship — Project 2 (Intermediate).

The application uses a React frontend and a Laravel REST API backend to provide user authentication, task management, dashboard statistics, and browser-side preferences.

## Project Overview

The project consists of two applications:

- **Frontend:** React, Vite, Tailwind CSS, and JavaScript
- **Backend:** Laravel 12 REST API, Laravel Sanctum, and MySQL

The frontend provides the user interface for authentication, task management, dashboard statistics, and calendar-based task visualization. The backend handles authentication, request validation, task operations, and database persistence.

> **Project attribution:** This repository is based on an existing task-management starter project and is intended for further learning, customization, and development. Refer to the original repository and its license for attribution and reuse requirements.

## Features

- User registration and login
- Token-based authentication using Laravel Sanctum
- Protected frontend routes
- Create, read, update, and delete tasks
- Task status management: To Do, In Progress, and Done
- Dashboard summary cards
- Calendar view for task due dates
- Task filtering and search, where implemented
- Dark and light theme preference
- API communication using Axios
- MySQL database persistence
- Browser `localStorage` for supported preferences and authentication state

**Note:** A localStorage backup of task data during API outages and subsequent synchronization is a separate requirement. Confirm that this functionality is implemented before claiming it is complete.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 7 |
| API communication | Axios |
| State management | React Context API |
| Backend | Laravel 12, PHP |
| Authentication | Laravel Sanctum |
| Database | MySQL |
| Data access | Laravel Eloquent ORM |

## Project Structure

```text
laravel-todo-internship/
├── src/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── utils/
├── public/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   ├── config/
│   ├── database/migrations/
│   └── routes/
├── tech-stack.html
└── README.md
```

The exact folder structure may differ depending on the files present in the repository.

## Application Pages

The frontend is organized around the following pages:

- `/login` — user login
- `/register` — user registration
- `/dashboard` — task statistics
- `/tasks` — task listing and management
- `/tasks/new` — create a task
- `/tasks/:id/edit` — edit a task
- `/calendar` — view tasks by due date

## REST API Endpoints

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/register` | Register a user |
| POST | `/api/login` | Authenticate a user |
| POST | `/api/logout` | Log out and revoke the current token |

### Task Management

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Retrieve the authenticated user's tasks |
| GET | `/api/tasks/{task}` | Retrieve a specific task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{task}` | Update a task |
| DELETE | `/api/tasks/{task}` | Delete a task |

These endpoints should be verified against the actual Laravel routes before submission.

## Database Design

### Users

The `users` table stores account information and is managed through Laravel's authentication system.

### Tasks

The `tasks` table is intended to contain:

- `id`
- `user_id`
- `title`
- `description`
- `status`
- `due_date`
- `created_at`
- `updated_at`

Each task belongs to a user. The backend must enforce ownership so one user cannot access or modify another user's tasks.

## Authentication Flow

1. A user registers or logs in through the frontend.
2. Laravel validates the request.
3. On successful authentication, the backend returns an access token.
4. The frontend uses the token for authenticated API requests.
5. The backend validates the token before allowing access to protected endpoints.
6. Task queries are restricted to the authenticated user.

## localStorage

The frontend uses browser localStorage for supported client-side data, such as theme preferences and authentication state.

For the required task-backup feature, the application should also:

- Save a copy of the task list after successful API responses.
- Display cached tasks when the API is temporarily unavailable.
- Clearly indicate when displayed data may be outdated.
- Provide a safe retry or synchronization mechanism.
- Clear user-specific cached data when the user logs out.

Only describe these backup and synchronization features as completed after verifying their implementation.

## Local Setup

### Prerequisites

Install the following tools:

- PHP compatible with the selected Laravel version
- Composer
- Node.js and npm
- MySQL
- Git

### 1. Configure the Backend

Open a terminal in the project directory:

```bash
cd backend
composer install
```

Copy `.env.example` to `.env`, configure the database credentials, and then run:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

The Laravel API should be available at `http://127.0.0.1:8000` when running with the default development server.

### 2. Configure the Frontend

Open a second terminal in the frontend project directory, which contains `package.json`:

```bash
npm install
npm run dev
```

Configure the frontend API base URL to point to the local Laravel API, for example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Use the actual environment-variable name expected by the frontend code.

Open the local URL printed by Vite in the terminal.

### 3. Database Configuration

Configure the backend `.env` file with the database connection details. For example:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_manage
DB_USERNAME=root
DB_PASSWORD=
```

Create the database before running migrations. Never commit real passwords, access tokens, or other secrets.

## Testing Checklist

Before submitting the project, verify:

- [ ] User registration and login
- [ ] Protected API access
- [ ] Creating, editing, completing, and deleting tasks
- [ ] Validation of invalid input
- [ ] Task ownership and user isolation
- [ ] Dashboard counts and task filtering
- [ ] localStorage task backup and API-failure handling
- [ ] Safe synchronization after reconnection
- [ ] Logout and removal of user-specific cached data
- [ ] Frontend and backend setup instructions

## Learning Outcomes

This project provides practical experience with:

- Integrating a JavaScript frontend with a Laravel REST API
- Authentication and protected routes
- CRUD operations and database persistence
- API requests and error handling
- Client-side storage
- Organizing a full-stack application
- Documenting setup instructions and testing requirements

## Project Information

**Project:** Task Management System  
**Program:** Full Stack Development Internship  
**Assignment:** Project 2 — Intermediate  
**Repository:** `laravel-todo-internship`

## Future Improvements

- Complete and test offline task backup and synchronization.
- Add automated backend and frontend tests.
- Improve API error handling and validation.
- Configure deployment and production environment variables.
- Add API documentation and screenshots.
