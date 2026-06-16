# Note App

A full-stack notes application with JWT-based authentication, category filtering, search, and a modern React UI.

## Overview

This project is split into two apps:

- **`client/`**: React + Vite frontend
- **`server/`**: Express + MongoDB API

Users can sign up, log in, create and manage their own notes, and filter/search notes by category and text.

## Features

- User authentication (signup/login/logout)
- JWT token auth with protected API routes
- Personal note ownership (users only access their own notes)
- Create, read, update, and delete notes
- Category-based filtering (`Personal`, `Work`, `Study`, `Ideas`)
- Search notes by title/content
- Light/dark theme toggle persisted in local storage
- Form validation on both frontend and backend

## Tech Stack

### Frontend (`client`)

- React
- React Router
- Vite
- Lucide React icons

### Backend (`server`)

- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Password hashing with `bcryptjs`

## Project Structure

```text
note-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB instance (local or hosted, e.g., MongoDB Atlas)

## Environment Variables

### Server (`server/.env`)

Create `server/.env` with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/note-app
JWT_SECRET=CHANGE_THIS_TO_A_SECURE_RANDOM_STRING_OF_AT_LEAST_32_CHARACTERS
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

Create `client/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

If omitted, the frontend defaults to `http://localhost:5000/api`.

## Installation

From the project root:

```bash
cd /path/to/note-app
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Running the Application

Start backend:

```bash
cd server
node server.js
```

Start frontend (new terminal):

```bash
cd client
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Available Scripts

### Client

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint checks
npm run preview  # Preview production build locally
```

### Server

```bash
npm test         # Placeholder command (fails by default: no server tests are implemented yet)
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Auth Routes

- `POST /auth/signup` — Register user
- `POST /auth/login` — Login user
- `GET /auth/me` — Get current authenticated user

### Notes Routes (Authenticated)

- `GET /notes` — List current user notes (supports `category` and `search` query params)
- `GET /notes/:id` — Get note by ID (owned by current user)
- `POST /notes` — Create note
- `PUT /notes/:id` — Update note
- `DELETE /notes/:id` — Delete note

Authentication header for protected routes:

```http
Authorization: token-from-login-response
```

## Security and Validation Notes

- Passwords are hashed before storage.
- JWT tokens are required for all `/api/notes` routes.
- Notes are always scoped to the authenticated user.
- Backend validates user fields and note schema constraints.

## Known Limitations

- No automated test suite is currently implemented on the server.
- Current client lint configuration reports existing issues unrelated to this README.

## License

ISC (as defined in `server/package.json`).
