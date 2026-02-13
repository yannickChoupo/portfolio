# Deployment Guide for MERN App on Droplet with MongoDB Atlas

## Prerequisites
- Docker & Docker Compose installed on the droplet
- Node.js (for local builds, optional)
- MongoDB Atlas cluster and credentials
- Environment files (.env, .env.dev) with proper secrets (see .env.example)

## 1. Prepare Environment Variables
- Copy `.env.example` to `.env` and fill in your production MongoDB Atlas URI and secrets.
- Never commit real credentials to version control.

## 2. Build and Deploy with Docker Compose

### Production
```sh
# On the droplet, in the project root:
docker-compose -f docker-compose-prod.yml up --build -d
```

### Development (local)
```sh
docker-compose -f docker-compose-dev.yml up --build
```

## 3. Updating the App
- Pull latest code
- Rebuild containers:
```sh
docker-compose -f docker-compose-prod.yml up --build -d
```

## 4. Stopping the App
```sh
docker-compose -f docker-compose-prod.yml down
```

## 5. Notes
- The app uses MongoDB Atlas, so no local MongoDB container is needed.
- All sensitive data is managed via environment variables.
- For Nginx or domain setup, configure your droplet/firewall accordingly.

---
For more details, see README.md or contact the maintainer.
