import React from 'react';
import { marked } from "marked";
import DOMPurify from "dompurify";

const initialState = `# 🚀 Portfolio Project Stack

A full-stack portfolio platform built to demonstrate modern **frontend development, backend API design, database integration, containerization, and production deployment**.

The application consists of a React/TypeScript frontend communicating with a Node.js/Express API backed by MongoDB.

---

## 🏗 Architecture Overview

\`\`\`text
                         Internet
                            │
                            ▼
                     ┌─────────────┐
                     │    Nginx    │
                     │ Reverse Proxy│
                     └──────┬──────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          ┌─────────────┐       ┌─────────────┐
          │    React    │       │   Express   │
          │  Frontend   │──────▶│     API     │
          └─────────────┘       └──────┬──────┘
                                       │
                                       ▼
                                ┌─────────────┐
                                │   MongoDB   │
                                │  Database   │
                                └─────────────┘
\`\`\`

### Request Flow

\`\`\`text
Browser
   │
   │ HTTPS
   ▼
Nginx
   │
   ├── /       → React Client
   │
   └── /api/*  → Express API
                    │
                    ▼
                 MongoDB
\`\`\`

The frontend is responsible for the user interface and communicates with the backend through REST API endpoints.

The backend handles business logic, authentication, validation, database operations, and API responses.

---

## 🖥 Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- Sass / CSS
- Data visualization

### Backend

- Node.js
- Express
- TypeScript
- REST API
- JWT Authentication
- bcrypt
- MongoDB / Mongoose
- dotenv
- CORS
- Multer

### Database

- MongoDB
- Mongoose ODM
- MongoDB authentication
- Separate development configuration

### DevOps / Infrastructure

- Docker
- Docker Compose
- Nginx
- Docker Hub
- Linux VPS
- Environment-based configuration
- Containerized production deployment

---

## 🏗 Project Structure

\`\`\`text
Portfolio/
│
├── client/
│   └── src/
│       ├── Projects/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── contact/
│   │   │   ├── exercise/
│   │   │   ├── timestamp/
│   │   │   ├── todo/
│   │   │   └── urlShortener/
│   │   ├── mongodb/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── Dockerfile.dev
│   ├── package.json
│   └── tsconfig.json
│
├── nginx/
├── docker-compose.yml
├── docker-compose-dev.yml
└── README.md
\`\`\`

---

## 🔌 Backend API

The Express backend exposes several REST APIs demonstrating different backend capabilities.

Examples include:

- Authentication and JWT-based sessions
- User management
- Exercise tracking
- Todo management
- URL shortening
- Timestamp generation
- Request-header parsing
- File metadata handling
- Contact forms
- Visitor tracking

The backend follows a modular structure:

\`\`\`text
module/
├── controller
├── routes
└── service
\`\`\`

This separation keeps HTTP handling, routing, and business logic independent and makes the API easier to maintain and extend.

---

## 🔐 Authentication

Authentication is implemented using:

- JWT
- bcrypt password hashing
- Express middleware
- Protected API routes
- MongoDB user persistence

Passwords are never stored as plain text.

Protected routes validate the authentication token before allowing access to protected resources.

---

## 🐳 Docker

The application is containerized to provide a consistent development and production environment.

Main services:

\`\`\`text
portfolio-client
portfolio-server
mongodb
nginx
\`\`\`

Docker Compose is used to orchestrate the services.

### Development

\`\`\`bash
docker compose -f docker-compose-dev.yml up -d
\`\`\`

### Production

\`\`\`bash
docker compose up -d
\`\`\`

---

## 🌍 Production Architecture

The application is deployed on a Linux VPS using Docker.

\`\`\`text
                         ┌──────────────────┐
                         │      Internet    │
                         └────────┬─────────┘
                                  │
                               HTTPS
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      Nginx       │
                         │ Reverse Proxy    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             portfolio-client            portfolio-server
                React                     Node / Express
                                                │
                                                ▼
                                             MongoDB
\`\`\`

Production containers are distributed through Docker Hub and pulled by the VPS during deployment.

---

## 🚀 Production Deployment

### 1. Build Docker Images

\`\`\`bash
docker build -t yannickkloud/portfolio:client-latest ./client
docker build -t yannickkloud/portfolio:server-latest ./server
\`\`\`

### 2. Push Images to Docker Hub

\`\`\`bash
docker push yannickkloud/portfolio:client-latest
docker push yannickkloud/portfolio:server-latest
\`\`\`

### 3. Deploy on the VPS

\`\`\`bash
docker compose pull
docker compose up -d --force-recreate
\`\`\`

### 4. Verify Containers

\`\`\`bash
docker compose ps
\`\`\`

### 5. Inspect Logs

\`\`\`bash
docker compose logs -f
\`\`\`

---

## 🔄 Deployment Workflow

\`\`\`text
Developer
    │
    ▼
Git Repository
    │
    ▼
Build Docker Images
    │
    ▼
Docker Hub
    │
    ▼
VPS
    │
    ├── docker compose pull
    │
    └── docker compose up -d --force-recreate
            │
            ▼
       Live Application
\`\`\`

This allows the production server to deploy the same container images that were built and published from the development environment.

---

## 🧪 Useful Commands

### View Running Containers

\`\`\`bash
docker compose ps
\`\`\`

### View Logs

\`\`\`bash
docker compose logs -f
\`\`\`

### View Server Logs

\`\`\`bash
docker compose logs -f portfolio-server
\`\`\`

### Restart API

\`\`\`bash
docker compose restart portfolio-server
\`\`\`

### Restart Client

\`\`\`bash
docker compose restart portfolio-client
\`\`\`

### Rebuild an Image

\`\`\`bash
docker compose build --no-cache portfolio-server
\`\`\`

### Stop Services

\`\`\`bash
docker compose down
\`\`\`

---

## 🌐 Live Application

**Production:** https://www.njiloportfolio.de

The live application demonstrates the complete flow from frontend interaction to backend API processing and database persistence.

---

## 🎯 Project Goals

This project is designed not only as a personal portfolio but also as a demonstration of practical full-stack engineering.

It demonstrates:

- **Frontend:** React + TypeScript application development
- **Backend:** REST API development with Express and TypeScript
- **Architecture:** Modular backend organization
- **Database:** MongoDB data persistence with Mongoose
- **Security:** JWT authentication and password hashing
- **Infrastructure:** Dockerized services
- **Networking:** Nginx reverse proxy
- **Deployment:** Docker Hub → VPS production deployment
- **Configuration:** Environment-specific application settings
- **Maintainability:** Separation of routes, controllers, services, and models

---

## 📄 License

MIT
`;

const ProjectArchitecture: React.FC = () => {
    const text = initialState;
    const markdown = DOMPurify.sanitize(marked(text));
    return (
        <>
            <div id="ProjectArchitecture">
                <div className="container">
                    <header>
                        <h1>Project Architecture</h1>
                    </header>
                    <section>
                        <div
                            id="preview"
                            dangerouslySetInnerHTML={{ __html: markdown }}
                        ></div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ProjectArchitecture;
