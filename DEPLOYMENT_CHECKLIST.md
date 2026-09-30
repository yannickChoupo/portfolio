# Portfolio Deployment Checklist

Use this checklist when deploying the portfolio client, API, MongoDB integration, and GitHub Projects integration to production.

## 1. One-time GitHub setup

- [ ] Create the Docker Hub repository `<DOCKER_USERNAME>/portfolio`.
- [ ] Add the following GitHub Actions repository secrets:
  - [ ] `DOCKER_USERNAME`
  - [ ] `DOCKER_PASSWORD`
  - [ ] `SERVER_HOST`
  - [ ] `SERVER_USER`
  - [ ] `SERVER_SSH_KEY`
  - [ ] `SERVER_SSH_PORT` if the VPS does not use port `22`
  - [ ] `SERVER_PATH` if the repository is not located at `/var/www/html`
- [ ] Create or approve the GitHub `production` environment.
- [ ] Protect `master` and require the CI workflow before merging.
- [ ] Confirm GitHub Actions has read access to repository contents.

## 2. One-time VPS setup

- [ ] Install Docker Engine and the Docker Compose plugin.
- [ ] Keep the shared production `docker-compose.yml` in `SERVER_PATH` (normally `/var/www/html`).
- [ ] Confirm the shared Compose file defines `portfolio-server` and `portfolio-client` in the `portfolio` profile.
- [ ] Authenticate Docker with Docker Hub if the image repository is private.
- [ ] Create the production `.env` file on the VPS.
- [ ] Restrict `.env` permissions to the deployment user.
- [ ] Configure the external Nginx reverse proxy and TLS certificate.
- [ ] Confirm `/api/*` is forwarded to `127.0.0.1:5000`.
- [ ] Confirm the frontend is reachable through the intended public domain.
- [ ] Configure persistent Docker storage for MongoDB.
- [ ] Configure database backups and test one restore.

## 3. Required production environment

Confirm these values exist in the VPS `.env` file. Do not commit their values.

### Application

- [ ] `NODE_ENV=production`
- [ ] `SERVERPORT=5000`
- [ ] `ACCESS_SECRET`
- [ ] `REFRESH_SECRET`
- [ ] `JWT_EXPIRES_IN`

### MongoDB

- [ ] `MONGO_HOST`
- [ ] `MONGO_PORT`
- [ ] `MONGO_DATABASE`
- [ ] `MONGO_USERNAME`
- [ ] `MONGO_PASSWORD`
- [ ] `MONGO_INITDB_ROOT_USERNAME`
- [ ] `MONGO_INITDB_ROOT_PASSWORD`
- [ ] `MONGO_INITDB_DATABASE`

### GitHub Projects

- [ ] `GITHUB_PROJECT_TOKEN`
- [ ] `ADMIN_REFRESH_KEY`
- [ ] Optionally set `GITHUB_PROJECT_CACHE_TTL_MS`; the default is 12 hours.
- [ ] Confirm the GitHub token can read the required Projects V2 data.
- [ ] Confirm `ADMIN_REFRESH_KEY` is long and randomly generated.
- [ ] Do not expose either secret through a `VITE_*` variable.

Generate a suitable admin refresh key locally with:

```bash
openssl rand -hex 32
```

## 4. Before every release

- [ ] Work is committed to a feature or maintenance branch.
- [ ] The feature branch is merged into `develop`.
- [ ] CI passes on `develop`.
- [ ] The application is tested in the development environment.
- [ ] No `.env` files or credentials are staged.
- [ ] Review the outgoing commits:

```bash
git status
git log --oneline origin/master..develop
git diff --stat origin/master...develop
```

- [ ] Build the backend:

```bash
cd server
npm ci
npm run build
```

- [ ] Build the frontend:

```bash
cd client
npm ci
npm run build
```

- [ ] Validate Compose from the repository root:

```bash
docker compose config -q
```

- [ ] Verify the production Docker images locally when infrastructure changed:

```bash
docker build -t portfolio-server:release-check ./server
docker build --build-arg VITE_API_URL=/api -t portfolio-client:release-check ./client
```

## 5. Release and automated deployment

- [ ] Open a pull request from `develop` into `master`.
- [ ] Confirm the CI workflow passes.
- [ ] Review and merge the pull request.
- [ ] Confirm the `Deploy Production` workflow starts on `master`.
- [ ] Confirm the verification job succeeds.
- [ ] Confirm the client and server SHA-tagged images are published.
- [ ] Confirm the VPS deployment step succeeds.
- [ ] Record the deployed Git commit SHA.

## 6. Post-deployment verification

- [ ] Verify the API health endpoint:

```bash
docker compose exec -T portfolio-server node -e \
  "fetch('http://127.0.0.1:5000/health').then(r => { if (!r.ok) process.exit(1) })"
```

- [ ] Open the production homepage.
- [ ] Verify static assets load without browser-console errors.
- [ ] Verify `/api/projects/github` returns projects.
- [ ] Confirm the response contains `fallback: false` when GitHub is available.
- [ ] Open the Union project page and verify progress statistics.
- [ ] Confirm `In progress` and `In review` tasks appear as active work.
- [ ] Open the admin page and test `Refresh GitHub` with `ADMIN_REFRESH_KEY`.
- [ ] Confirm an incorrect admin key receives `401 Unauthorized`.
- [ ] Verify MongoDB-dependent endpoints.
- [ ] Verify the contact form and visitor tracking.
- [ ] Inspect container state and recent logs:

```bash
docker compose ps
docker compose logs --tail=100 portfolio-server
docker compose logs --tail=100 portfolio-client
```

- [ ] Check Grafana/Loki for new errors after deployment.
- [ ] Confirm the previous production image tags still exist for rollback.


## 7. Rollback

- [ ] Identify the last known-good Git commit SHA and Docker image tags.
- [ ] On the VPS, set `IMAGE_TAG` to the known-good SHA.
- [ ] Pull and recreate only the application services:

```bash
export IMAGE_TAG=<known-good-sha>
docker compose pull portfolio-server portfolio-client
docker compose up -d --no-deps --force-recreate portfolio-server portfolio-client
```

- [ ] Re-run the API health check.
- [ ] Verify the homepage and critical API paths.
- [ ] Preserve failed-container logs for investigation.
- [ ] Document the rollback reason and affected release SHA.

## 8. Security reminders

- [ ] Never commit `.env`, `.env.dev`, `client/.env`, tokens, passwords, or private keys.
- [ ] Never place server credentials in variables prefixed with `VITE_`.
- [ ] Rotate any credential that was committed or included in a browser bundle.
- [ ] Use least-privilege GitHub and database credentials.
- [ ] Review dependency and container-image security updates regularly.
