# Union — NFC Identity & Event Platform

> NFC-based identity, authentication, attendance and event management system.

**Stack:** Java · Spring Boot · PostgreSQL · React · TypeScript · Docker · GitHub Actions · NFC

**Type:** Personal / Full-Stack System
**Status:** In Development
**Role:** System Design · Backend · Frontend · DevOps

---

## 01 — Overview

Union is a system for managing identity, NFC-based authentication, event access, attendance and gamified tasks.

The system combines NFC hardware with a web application and backend services. NFC readers communicate with the backend over HTTPS, while the backend manages authentication, users, events, attendance and progression.

The project is developed as a full-stack system with a focus on structured system development, clear interfaces, automated testing and reproducible deployment.

---

## 02 — Current State

**Overall progress:** `████████████████░░░░ 80%`

### Completed

* [x] Project architecture
* [x] Backend foundation
* [x] Database
* [x] Authentication
* [x] Docker setup
* [x] CI/CD foundation
* [x] Frontend foundation

### In Progress

* [ ] NFC credential verification
* [ ] Event access

### Planned

* [ ] Attendance
* [ ] Tasks
* [ ] Points / Progress
* [ ] Production hardening

---

# 03 — Requirements

## Functional Requirements

* Credential provisioning
* Secure credential storage
* NFC registration / binding
* NFC-based authentication
* User identity validation
* Session management
* Event access
* Attendance tracking
* Task management
* Task completion
* Points and progress tracking

## Technical Requirements

* REST API
* Secure authentication
* Relational database
* Automated testing
* Containerized deployment
* CI/CD
* Production health monitoring

---

# 04 — System Architecture

## High-Level Architecture

```text
                    ┌───────────────┐
                    │     Phone     │
                    │    NFC Tag    │
                    └───────┬───────┘
                            │
                           NFC
                            │
                            ▼
                    ┌───────────────┐
                    │ NFC Hardware  │
                    │    Reader     │
                    └───────┬───────┘
                            │
                           WiFi
                            │
                            ▼
                    ┌───────────────┐
                    │ Reader App /  │
                    │   Firmware    │
                    └───────┬───────┘
                            │
                          HTTPS
                            │
                            ▼
                    ┌───────────────┐
                    │ Union Backend │
                    └───────┬───────┘
                            │
                       PostgreSQL
                            │
                            ▼
                    ┌───────────────┐
                    │   Database    │
                    └───────────────┘
```

## Software Architecture

```text
Frontend
   │
   │ REST
   ▼
Controller
   │
   ▼
Service / Use Case
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

---

# 05 — System Flows

## Identity Flow

```text
Credential Provisioning
        ↓
Credential Storage
        ↓
NFC Registration / Binding
        ↓
NFC Tap / Authentication
        ↓
User Identity / Session Validation
```

## Event Flow

```text
Authentication
        ↓
Authorization
        ↓
Game / Event Access
        ↓
Attendance
```

## Gamification Flow

```text
Tasks
  ↓
Task Completion
  ↓
Points
  ↓
Progress
```

## Complete System Flow

```text
Credential Provisioning
        ↓
Credential Storage
        ↓
NFC Registration / Binding
        ↓
NFC Tap / Authentication
        ↓
User Identity / Session Validation
        ↓
Game / Event Access
        ↓
Attendance
        ↓
Tasks
        ↓
Task Completion
        ↓
Points / Progress
```

---

# 06 — Development Approach

The project is developed independently, so not all practices of a formal software development process can be applied in their original form.

Nevertheless, I use the principles learned in **Methodical Systems Engineering** as a framework for structuring the development process.

Requirements are defined before implementation, system boundaries and interfaces are documented, technical decisions are made explicitly, and features are broken down into manageable implementation tasks.

The process is intentionally lightweight and adapted to a solo development environment while maintaining the separation between:

```text
Requirements
     ↓
Architecture
     ↓
Design
     ↓
Implementation
     ↓
Testing
     ↓
Integration
     ↓
Deployment
```

---

# 07 — Backend

## Architecture

The backend provides the central API and handles:

* Authentication
* User identity
* Credential management
* NFC verification
* Events
* Attendance
* Tasks
* Points / progression

## Backend Tasks

### Requirements

* [ ] Define feature requirements
* [ ] Define use cases
* [ ] Define acceptance criteria

### API

* [ ] Define API contract
* [ ] Define request / response models
* [ ] Define error responses
* [ ] Define authentication requirements

### Database

* [ ] Define database changes
* [ ] Define entities
* [ ] Define relationships
* [ ] Create migrations

### Implementation

* [ ] Implement backend feature
* [ ] Implement domain / business logic
* [ ] Implement REST endpoints
* [ ] Implement validation
* [ ] Implement authentication / authorization

### Testing

* [ ] Add backend unit tests
* [ ] Add integration tests
* [ ] Test authentication
* [ ] Test error handling
* [ ] Test edge cases

### Verification

* [ ] Verify backend build
* [ ] Verify backend CI

---

# 08 — Frontend

The frontend provides the user-facing interface for managing users, events, attendance, tasks and progression.

## Frontend Tasks

### API Integration

* [ ] Implement API integration
* [ ] Implement authentication handling
* [ ] Implement API error handling

### Domain / Use Cases

* [ ] Implement domain models
* [ ] Implement use cases
* [ ] Connect frontend use cases to backend APIs

### State Management

* [ ] Define application state
* [ ] Implement state management
* [ ] Handle loading states
* [ ] Handle error states

### UI

* [ ] Implement UI
* [ ] Implement authentication flow
* [ ] Implement event management
* [ ] Implement attendance
* [ ] Implement tasks
* [ ] Implement points / progress

### Testing

* [ ] Add frontend tests
* [ ] Test components
* [ ] Test state management
* [ ] Test API integration

### Verification

* [ ] Verify frontend build
* [ ] Verify frontend CI

---

# 09 — NFC / Hardware

The NFC subsystem connects physical interaction with the software system.

```text
Phone / NFC Tag
       │
       │ NFC
       ▼
NFC Reader
       │
       │ WiFi
       ▼
Reader Application / Firmware
       │
       │ HTTPS
       ▼
Union Backend
       │
       ▼
Credential Verification
       │
       ▼
User Identity
       │
       ▼
Authorized Action
```

## NFC Lifecycle

```text
Provision
   ↓
Store securely
   ↓
Register / Bind
   ↓
Read NFC credential
   ↓
Verify
   ↓
Identify user
   ↓
Authorize action
```

---

# 10 — Integration

The individual components are tested together to verify the complete system behaviour.

## Integration Tasks

* [ ] Test backend + frontend integration
* [ ] Test NFC reader + backend integration
* [ ] Test authentication flow
* [ ] Test authorization flow
* [ ] Test error handling
* [ ] Test edge cases
* [ ] Test complete user flows
* [ ] Update documentation

---

# 11 — Testing Strategy

## Unit Tests

```text
Services
   ├── Domain logic
   ├── Validation
   └── Business rules
```

## Integration Tests

```text
REST API
   ├── PostgreSQL
   ├── Authentication
   └── Persistence
```

## Frontend Tests

```text
Components
   ├── State
   └── API integration
```

## System Tests

```text
NFC Authentication
        ↓
User Identification
        ↓
Authorization
        ↓
Event Access
        ↓
Attendance
```

---

# 12 — CI/CD

The project uses automated verification and containerized deployment.

```text
Git Push
   ↓
GitHub Actions
   ↓
Backend Tests
   ↓
Frontend Tests
   ↓
Build
   ↓
Docker Build
   ↓
Docker Image
   ↓
Docker Hub
   ↓
Deployment
   ↓
Production Verification
```

## CI Tasks

* [ ] Fix backend CI to run reliably with PostgreSQL
* [ ] Fix local `act` PostgreSQL port conflict
* [ ] Avoid mapping PostgreSQL `5432` to host when running `act`
* [ ] Verify backend CI on GitHub Actions
* [ ] Verify frontend CI
* [ ] Verify frontend build

---

# 13 — Docker & Infrastructure

## Docker

* [ ] Verify backend Docker build
* [ ] Verify frontend Docker build
* [ ] Verify Docker configuration
* [ ] Verify environment configuration

## Docker Hub

* [ ] Verify Docker Hub authentication
* [ ] Verify Docker image push
* [ ] Verify image versioning

## VPS

* [ ] Verify VPS SSH deployment
* [ ] Configure staging deployment
* [ ] Configure production deployment
* [ ] Verify production environment

---

# 14 — Configuration & Security

Production configuration must be provided through environment variables or a secure secret-management mechanism.

## Required Configuration

* [ ] Verify production `DATABASE_URL`
* [ ] Verify production `JWT_SECRET`
* [ ] Verify production `JWT_EXPIRES_IN`
* [ ] Verify production environment variables
* [ ] Verify secrets are not committed to Git

---

# 15 — Release

## Development

* [ ] Merge feature into `dev`
* [ ] Verify dev environment

## Release

* [ ] Merge `dev` into `master`
* [ ] Create release tag
* [ ] Build release

## Deployment

* [ ] Deploy release
* [ ] Verify deployment
* [ ] Add production health check
* [ ] Verify production functionality

## Rollback

* [ ] Define backend deployment rollback strategy
* [ ] Define Docker image rollback procedure
* [ ] Document recovery procedure

---

# 16 — Task Tracking

Tasks are organized by development area.

## Requirements

* [ ] `REQ-001` Define feature requirements
* [ ] `REQ-002` Define use cases
* [ ] `REQ-003` Define acceptance criteria

## Backend

* [ ] `BE-001` Define API contract
* [ ] `BE-002` Define database changes
* [ ] `BE-003` Implement backend feature
* [ ] `BE-004` Add backend tests
* [ ] `BE-005` Verify backend build
* [ ] `BE-006` Verify backend CI

## Frontend

* [ ] `FE-001` Implement API integration
* [ ] `FE-002` Implement domain / use case
* [ ] `FE-003` Implement state management
* [ ] `FE-004` Implement UI
* [ ] `FE-005` Add frontend tests
* [ ] `FE-006` Verify frontend build
* [ ] `FE-007` Verify frontend CI

## Integration

* [ ] `INT-001` Test backend + frontend integration
* [ ] `INT-002` Test authentication flow
* [ ] `INT-003` Test error handling
* [ ] `INT-004` Test edge cases
* [ ] `INT-005` Update documentation

## Infrastructure

* [ ] `INFRA-001` Fix backend CI PostgreSQL setup
* [ ] `INFRA-002` Fix local `act` PostgreSQL port conflict
* [ ] `INFRA-003` Verify Docker build
* [ ] `INFRA-004` Verify Docker Hub authentication
* [ ] `INFRA-005` Verify Docker image push
* [ ] `INFRA-006` Verify VPS SSH deployment
* [ ] `INFRA-007` Configure staging
* [ ] `INFRA-008` Configure production

## Release

* [ ] `REL-001` Merge feature into `dev`
* [ ] `REL-002` Verify dev environment
* [ ] `REL-003` Merge `dev` into `master`
* [ ] `REL-004` Create release tag
* [ ] `REL-005` Build release
* [ ] `REL-006` Deploy release
* [ ] `REL-007` Verify production

---

# 17 — Technical Decisions

## Why REST?

REST provides a clear separation between the frontend, NFC reader and backend while allowing different clients to communicate with the same API.

## Why PostgreSQL?

The domain contains structured relationships between users, credentials, events, attendance and tasks. A relational database provides strong consistency and clear data relationships.

## Why Docker?

Docker provides reproducible development and deployment environments and reduces differences between local, CI and production environments.

## Why GitHub Actions?

Automated CI provides continuous verification of builds and tests before changes are released.

## Why NFC?

NFC provides a physical interaction mechanism that connects the real-world event environment with the digital system.

## Why JWT?

JWT-based authentication provides a mechanism for authenticated communication between clients and the backend without requiring server-side session storage for every request.

---

# 18 — Current Development Roadmap

```text
                    ┌─────────────────────┐
                    │ Requirements        │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ System Architecture │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Backend             │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Frontend            │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ NFC Integration     │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Testing             │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ CI/CD               │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Production          │
                    └─────────────────────┘
```

---

# 19 — What I Learned

This project gave me the opportunity to apply concepts from university to a complete software system rather than an isolated programming assignment.

In particular, I learned how important requirements, interfaces and system boundaries become as a project grows. I also gained practical experience with backend architecture, authentication, database design, API development, testing, containerization and CI/CD.

One of the main lessons was that a structured development process does not have to mean excessive documentation. For a solo project, the methodology has to be adapted to the available resources while still providing enough structure to make decisions, track progress and maintain the system.

The project is still evolving, which also gives me the opportunity to continuously refine both the implementation and the development process itself.

---

# 20 — Project Status

**Status:** In Development

**Current focus:**

1. NFC credential verification
2. Event authorization
3. Attendance
4. Task system
5. Points / progression
6. Production deployment

The project is continuously developed and documented as the system evolves.
