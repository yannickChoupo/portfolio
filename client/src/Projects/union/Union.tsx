import React, { useEffect, useState } from "react";

import ProgressOverview from "./ProgressOverview";
import AXIOS from "../../redux/services/axios";

import architectureImage from "../../assets/UnionSystemArchitektur.png";

import type {
    RequirementLabel,
} from "../../pages/Admin/types/admin.types";

import { MermaidDiagram } from "./MermaidDiagramm";

/*
 * ============================================================
 * Types
 * ============================================================
 */

export type ProjectTodo = {
    number: number;
    title: string;
    url: string;
    state: "OPEN" | "CLOSED";
    status: string;
    completed: boolean;
    labels: RequirementLabel[];
};

export type ProjectRequirement = {
    number: number;
    title: string;
    url: string;
    state: "OPEN" | "CLOSED";
    status: string;
    progress: number;
    completed: number;
    total: number;
    todos: ProjectTodo[];
    labels: RequirementLabel[];
};

export type GithubProject = {
    number: number;
    title: string;
    url: string;
    requirements: ProjectRequirement[];
};

export type GithubProjectsResponse = {
    projects: GithubProject[];
};

/*
 * ============================================================
 * API
 * ============================================================
 */

export const getProjects =
    async (): Promise<GithubProjectsResponse> => {
        const response =
            await AXIOS.get<GithubProjectsResponse>(
                "/projects/github"
            );

        return response.data;
    };

/*
 * ============================================================
 * Domain diagram
 * ============================================================
 */

// const domainDiagram = `
// classDiagram

//     User "1" --> "0..*" NfcCredential : owns
//     User "1" --> "0..*" GameAttendance : attends

//     Game "1" --> "0..*" GameAttendance : contains
//     Game "1" --> "0..*" NfcReaderGame : uses

//     NfcReader "1" --> "0..*" NfcReaderGame : assigned to

//     class User {
//         Int id
//         String email
//         String phone
//         Role role
//     }

//     class NfcCredential {
//         Int id
//         String credential
//         Boolean revoked
//         DateTime createdAt
//         DateTime revokedAt
//     }

//     class Game {
//         Int id
//         GameStatus status
//         DateTime startTime
//         DateTime endTime
//     }

//     class GameAttendance {
//         Int id
//         AttendanceStatus status
//         DateTime arrivedAt
//     }

//     class NfcReader {
//         Int id
//         String name
//         String tokenHash
//         Boolean active
//         DateTime lastSeenAt
//         DateTime revokedAt
//     }

//     class NfcReaderGame {
//         Int id
//         DateTime activatedAt
//         DateTime deactivatedAt
//     }
// `;

/*
 * ============================================================
 * Communication diagram
 * ============================================================
 */

const communicationDiagram = `
sequenceDiagram

    participant F as Frontend
    participant B as Backend
    participant D as ESP32
    participant DB as PostgreSQL

    F->>B: REST / JSON
    B->>DB: Query / mutation
    DB-->>B: Result
    B-->>F: JSON response

    D->>B: HTTP / JSON
    D->>B: Reader authentication
    B->>DB: Validate reader
    DB-->>B: Reader
    B-->>D: HTTP response

    D->>B: Heartbeat
    B->>DB: Update lastSeenAt
    B-->>D: 204 No Content
`;

/*
 * ============================================================
 * Observability diagram
 * ============================================================
 */

const observabilityDiagram = `
flowchart LR

    F[Frontend]
    B[Backend]
    D[ESP32]

    F --> O[Telemetry]
    B --> O
    D --> O

    O --> A[Grafana Alloy]

    A --> L[Loki]
    A --> M[Metrics]
    A --> T[Tempo]

    L --> G[Grafana]
    M --> G
    T --> G
`;

/*
 * ============================================================
 * Union page
 * ============================================================
 */

const Union: React.FC = () => {
    const [
        requirements,
        setRequirements,
    ] = useState<ProjectRequirement[]>([]);

    const [
        requirementLabels,
        setRequirementLabels,
    ] = useState<RequirementLabel[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        const loadUnion = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await getProjects();

                const projects =
                    response.projects ?? [];

                const unionProject =
                    projects.find(
                        (project) =>
                            project.title ===
                            "union"
                    );

                if (!unionProject) {
                    setError(
                        "Union backend project not found."
                    );
                    return;
                }

                setRequirements(
                    unionProject.requirements ?? []
                );
            } catch (err) {
                console.error(
                    "Failed to load Union project:",
                    err
                );

                setError(
                    "Failed to load Union project."
                );
            } finally {
                setLoading(false);
            }
        };

        loadUnion();
    }, []);

    useEffect(() => {
        const labels =
            requirements.flatMap(
                (requirement) =>
                    requirement.labels ?? []
            );

        const uniqueLabels =
            Array.from(
                new Map(
                    labels.map((label) => [
                        label.name,
                        label,
                    ])
                ).values()
            );

        setRequirementLabels(
            uniqueLabels
        );
    }, [requirements]);

    if (loading) {
        return (
            <main>
                Loading Union...
            </main>
        );
    }

    if (error) {
        return (
            <main>
                {error}
            </main>
        );
    }

    return (
        <main
            id="app"
            className="union"
        >

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="union-hero">
                <p className="project-label">
                    PERSONAL PROJECT ·
                    DISTRIBUTED SYSTEM ·
                    FULL-STACK
                </p>

                <h1>Union</h1>

                <p className="subtitle">
                    A system for organizing
                    football, coordinating
                    responsibilities and making
                    participation more reliable
                    through software and physical
                    device integration.
                </p>

                <div className="project-meta">
                    <div className="stack-tags">
                        <span>React</span>
                        <span>TypeScript</span>
                        <span>ExpressJS</span>
                        <span>PostgreSQL</span>
                        <span>ESP32</span>
                        <span>Bluetooth</span>
                        <span>NFC</span>
                        <span>Docker</span>
                        <span>GitHub Actions</span>
                        <span>Grafana</span>
                    </div>

                    <div className="project-details">
                        <div>
                            <strong>
                                Type
                            </strong>

                            <span>
                                Personal /
                                Full-Stack /
                                IoT
                            </span>
                        </div>

                        <div>
                            <strong>
                                Status
                            </strong>

                            <span>
                                In Development
                            </span>
                        </div>

                        <div>
                            <strong>
                                Focus
                            </strong>

                            <span>
                                Product Development ·
                                System Design ·
                                IoT ·
                                Observability
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                SUB NAVIGATION
            ===================================================== */}
            <section id="nav-start">
                <nav
                    className="case-study-nav"
                    aria-label="Union case study navigation"
                >
                    <div className="case-study-nav-section">
                        <strong>Product</strong>

                        <a href="#overview">
                            Overview
                        </a>

                        <a href="#problem">
                            Problem
                        </a>

                        <a href="#requirements">
                            Requirements
                        </a>
                    </div>

                    <div className="case-study-nav-section">
                        <strong>System</strong>

                        <a href="#architecture">
                            Architecture
                        </a>

                        <a href="#api">
                            API & Protocols
                        </a>

                        <a href="#device">
                            Device
                        </a>

                        <a href="#lifecycle">
                            Device Lifecycle
                        </a>
                    </div>

                    <div className="case-study-nav-section">
                        <strong>Engineering</strong>

                        <a href="#observability">
                            Observability
                        </a>

                        <a href="#reliability">
                            Reliability
                        </a>

                        <a href="#scaling">
                            Scaling
                        </a>
                    </div>

                    <div className="case-study-nav-section">
                        <strong>Delivery</strong>

                        <a href="#progress">
                            Progress
                        </a>

                        <a href="#testing">
                            Testing & CI/CD
                        </a>

                        <a href="#current">
                            Current State
                        </a>
                    </div>

                    <div className="case-study-nav-section">
                        <strong>Reflection</strong>

                        <a href="#decisions">
                            Decisions
                        </a>

                        <a href="#learnings">
                            Learnings
                        </a>
                    </div>
                </nav>
            </section>

            {/* =====================================================
                01. OVERVIEW
            ===================================================== */}

            <section
                id="overview"
                className="case-study-section overview"
            >
                <span className="section-number">
                    01
                </span>

                <h2>
                    Overview
                </h2>

                <p>
                    Union started as a solution
                    to a simple organizational
                    problem around recurring
                    football games.
                </p>

                <p>
                    It has since evolved into a
                    distributed system combining
                    a web application, backend,
                    PostgreSQL database and
                    physical ESP32-based devices.
                </p>

                <p>
                    The project is developed end
                    to end: from identifying the
                    problem and defining product
                    requirements to designing,
                    implementing, testing,
                    deploying and monitoring the
                    system.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Product
                        </h3>

                        <p>
                            Games, attendance,
                            responsibilities and
                            progression are managed
                            through one system.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Distributed System
                        </h3>

                        <p>
                            Frontend, backend,
                            database and physical
                            devices communicate
                            through explicit
                            interfaces.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Operations
                        </h3>

                        <p>
                            Structured logs,
                            telemetry, heartbeats
                            and monitoring are used
                            to make the running
                            system observable.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                02. PROBLEM
            ===================================================== */}

            <section
                id="problem"
                className="case-study-section motivation"
            >
                <span className="section-number">
                    02
                </span>

                <h2>
                    Problem
                </h2>

                <p>
                    Union started with a practical
                    problem: organizing recurring
                    football games reliably.
                </p>

                <p>
                    Games were originally
                    organized informally through
                    group messages. Attendance
                    was often assumed rather than
                    explicitly confirmed.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Unclear commitment
                        </h3>

                        <p>
                            Players were effectively
                            assumed to attend without
                            making an explicit
                            commitment.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Shared responsibilities
                        </h3>

                        <p>
                            Equipment, goals and
                            other organizational
                            tasks needed to be
                            distributed fairly.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Arrival tracking
                        </h3>

                        <p>
                            Arrival and late
                            attendance should not
                            depend entirely on manual
                            observation.
                        </p>
                    </article>
                </div>

                <h3>
                    From problem to system
                </h3>

                <p>
                    The solution is not only a
                    frontend interface. It requires
                    a backend to enforce business
                    rules and a physical device to
                    observe events in the real
                    environment.
                </p>
            </section>

            {/* =====================================================
                03. REQUIREMENTS
            ===================================================== */}

            <section
                id="requirements"
                className="case-study-section requirements"
            >
                <span className="section-number">
                    03
                </span>

                <h2>
                    Requirements
                </h2>

                <p>
                    The requirements are derived
                    from the operational problems
                    identified during the
                    organization of the games.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Events
                        </h3>

                        <ul>
                            <li>
                                Define game dates
                                and times
                            </li>

                            <li>
                                Manage recurring
                                events
                            </li>

                            <li>
                                Define participation
                                deadlines
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h3>
                            Attendance
                        </h3>

                        <ul>
                            <li>
                                Track expected
                                attendance
                            </li>

                            <li>
                                Allow players to
                                cancel
                            </li>

                            <li>
                                Register arrival
                            </li>

                            <li>
                                Track late arrivals
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h3>
                            Responsibilities
                        </h3>

                        <ul>
                            <li>
                                Create tasks
                            </li>

                            <li>
                                Assign
                                responsibilities
                            </li>

                            <li>
                                Rotate tasks
                                between players
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h3>
                            Identity
                        </h3>

                        <ul>
                            <li>
                                Manage users
                            </li>

                            <li>
                                Authenticate users
                            </li>

                            <li>
                                Associate physical
                                credentials
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h3>
                            Device Management
                        </h3>

                        <ul>
                            <li>
                                Register readers
                            </li>

                            <li>
                                Authenticate readers
                            </li>

                            <li>
                                Track device state
                            </li>

                            <li>
                                Monitor last-seen
                                status
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h3>
                            Infrastructure
                        </h3>

                        <ul>
                            <li>
                                Containerized
                                services
                            </li>

                            <li>
                                Automated testing
                            </li>

                            <li>
                                CI/CD
                            </li>

                            <li>
                                Operational
                                monitoring
                            </li>
                        </ul>
                    </article>
                </div>
            </section>

            {/* =====================================================
                04. ARCHITECTURE
            ===================================================== */}

            <section
                id="architecture"
                className="case-study-section architecture"
            >
                <span className="section-number">
                    04
                </span>

                <h2>
                    System Architecture
                </h2>

                <p>
                    Union is composed of
                    independent components with
                    clearly defined responsibilities.
                </p>

                <div className="architecture-diagram">
                    <img
                        src={architectureImage}
                        alt="Union system architecture"
                    />
                </div>

                <div className="content-grid">
                    <article>
                        <h3>
                            Frontend
                        </h3>

                        <p>
                            Provides the user
                            interface for managing
                            games, attendance,
                            responsibilities and
                            progression.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Backend
                        </h3>

                        <p>
                            Contains the central
                            business logic and exposes
                            APIs to the frontend and
                            physical devices.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Database
                        </h3>

                        <p>
                            PostgreSQL stores users,
                            credentials, games,
                            attendance and device
                            relationships.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Device
                        </h3>

                        <p>
                            ESP32-based hardware
                            observes physical events
                            and communicates device
                            state with the backend.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                05. API & PROTOCOLS
            ===================================================== */}

            <section
                id="api"
                className="case-study-section"
            >
                <span className="section-number">
                    05
                </span>

                <h2>
                    API & Protocols
                </h2>

                <p>
                    Communication boundaries are
                    explicit. Each component
                    communicates through APIs rather
                    than directly accessing another
                    component's internal state.
                </p>

                <MermaidDiagram
                    chart={communicationDiagram}
                />

                <div className="content-grid">
                    <article>
                        <h3>
                            Frontend → Backend
                        </h3>

                        <p>
                            REST-style HTTP APIs
                            using JSON for application
                            operations.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Device → Backend
                        </h3>

                        <p>
                            HTTP requests with JSON
                            payloads are used for
                            registration, configuration,
                            heartbeat and telemetry.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Authentication
                        </h3>

                        <p>
                            Physical readers identify
                            themselves using a reader
                            token supplied through the
                            request authentication
                            header.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Response semantics
                        </h3>

                        <p>
                            HTTP status codes are used
                            to distinguish successful
                            operations, authentication
                            failures, missing resources
                            and backend failures.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                06. DEVICE
            ===================================================== */}

            <section
                id="device"
                className="case-study-section"
            >
                <span className="section-number">
                    06
                </span>

                <h2>
                    Physical Device
                </h2>

                <p>
                    The physical device connects
                    events in the real world with the
                    digital system.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Identity
                        </h3>

                        <p>
                            Each reader has a persistent
                            reader ID and authentication
                            token.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Runtime State
                        </h3>

                        <p>
                            The device maintains state
                            such as configuration,
                            active status, backend
                            reachability, authentication
                            and assigned game.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Communication
                        </h3>

                        <p>
                            The reader communicates
                            with the backend for
                            registration, configuration,
                            heartbeat and operational
                            telemetry.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Physical Interaction
                        </h3>

                        <p>
                            Bluetooth and NFC are used
                            as part of the physical
                            interaction and identity
                            layer of the prototype.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                07. DEVICE LIFECYCLE
            ===================================================== */}

            <section
                id="lifecycle"
                className="case-study-section"
            >
                <span className="section-number">
                    07
                </span>

                <h2>
                    Device Lifecycle
                </h2>

                <p>
                    Device management is treated as
                    an explicit lifecycle rather than
                    simply storing a device record.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            01 · Provision
                        </h3>

                        <p>
                            The device loads stored
                            credentials or starts the
                            registration process.
                        </p>
                    </article>

                    <article>
                        <h3>
                            02 · Register
                        </h3>

                        <p>
                            A new reader receives an
                            identity and authentication
                            token from the backend.
                        </p>
                    </article>

                    <article>
                        <h3>
                            03 · Authenticate
                        </h3>

                        <p>
                            Subsequent device requests
                            are authenticated using the
                            reader token.
                        </p>
                    </article>

                    <article>
                        <h3>
                            04 · Monitor
                        </h3>

                        <p>
                            Heartbeats update the
                            backend's last-seen state
                            and provide a basic
                            availability signal.
                        </p>
                    </article>

                    <article>
                        <h3>
                            05 · Assign
                        </h3>

                        <p>
                            A reader can be associated
                            with a game through the
                            device/game relationship.
                        </p>
                    </article>

                    <article>
                        <h3>
                            06 · Revoke
                        </h3>

                        <p>
                            Readers can be deactivated
                            or revoked when they should
                            no longer participate in
                            the system.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                08. OBSERVABILITY
            ===================================================== */}

            <section
                id="observability"
                className="case-study-section"
            >
                <span className="section-number">
                    08
                </span>

                <h2>
                    Observability
                </h2>

                <p>
                    As the system became distributed,
                    logging alone was no longer enough.
                    The goal is to make failures
                    observable across frontend,
                    backend and physical devices.
                </p>

                <MermaidDiagram
                    chart={observabilityDiagram}
                />

                <div className="content-grid">
                    <article>
                        <h3>
                            Structured Logging
                        </h3>

                        <p>
                            Logs contain structured
                            information such as level,
                            service, event, source,
                            request ID, trace ID and
                            relevant entity IDs.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Device Telemetry
                        </h3>

                        <p>
                            ESP32 devices can emit
                            predefined telemetry events
                            containing a level, module,
                            event name and message.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Heartbeat
                        </h3>

                        <p>
                            A periodic heartbeat allows
                            the backend to update
                            <code>lastSeenAt</code> and
                            determine when a reader was
                            last communicating.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Grafana
                        </h3>

                        <p>
                            Grafana provides the
                            operational interface for
                            inspecting application and
                            device telemetry.
                        </p>
                    </article>
                </div>

                <h3>
                    Telemetry levels
                </h3>

                <div className="content-grid">
                    <article>
                        <h4>
                            INFO
                        </h4>

                        <p>
                            Normal operational events.
                        </p>
                    </article>

                    <article>
                        <h4>
                            WARN
                        </h4>

                        <p>
                            Recoverable or unusual
                            conditions.
                        </p>
                    </article>

                    <article>
                        <h4>
                            ERROR
                        </h4>

                        <p>
                            Conditions requiring
                            investigation.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                09. RELIABILITY
            ===================================================== */}

            <section
                id="reliability"
                className="case-study-section"
            >
                <span className="section-number">
                    09
                </span>

                <h2>
                    Reliability
                </h2>

                <p>
                    Communication failures are treated
                    as expected conditions in a
                    distributed system rather than as
                    exceptional cases that can simply be
                    ignored.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Backend reachability
                        </h3>

                        <p>
                            The device tracks whether
                            communication with the
                            backend succeeds.
                        </p>
                    </article>

                    <article>
                        <h3>
                            HTTP status handling
                        </h3>

                        <p>
                            Authentication errors,
                            missing devices and server
                            errors are distinguished
                            through HTTP responses.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Telemetry isolation
                        </h3>

                        <p>
                            Telemetry delivery should
                            not prevent the primary
                            device workflow from
                            continuing when observability
                            infrastructure is unavailable.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Persistent credentials
                        </h3>

                        <p>
                            Reader credentials are
                            persisted so the device can
                            recover its identity across
                            restarts.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                10. SCALING
            ===================================================== */}

            <section
                id="scaling"
                className="case-study-section"
            >
                <span className="section-number">
                    10
                </span>

                <h2>
                    Scaling
                </h2>

                <p>
                    Horizontal scaling is intentionally
                    not implemented prematurely.
                    The current deployment can operate
                    with a single API instance while
                    the system boundaries are kept
                    sufficiently explicit to support
                    future expansion.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Current
                        </h3>

                        <p>
                            Client → API → PostgreSQL
                        </p>
                    </article>

                    <article>
                        <h3>
                            Future
                        </h3>

                        <p>
                            Load Balancer → API × N
                            → PostgreSQL
                        </p>
                    </article>

                    <article>
                        <h3>
                            Vertical scaling
                        </h3>

                        <p>
                            Increase resources of the
                            existing deployment when
                            additional capacity is
                            required.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Horizontal scaling
                        </h3>

                        <p>
                            Introduce multiple stateless
                            API instances behind a load
                            balancer when actual capacity
                            requirements justify it.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                11. PROGRESS
            ===================================================== */}

            <section
                id="progress"
                className="case-study-section progress"
            >
                <span className="section-number">
                    11
                </span>

                <h2>
                    Progress
                </h2>

                <p>
                    Development progress is calculated
                    dynamically from the project's
                    requirements and associated
                    todos.
                </p>

                <ProgressOverview
                    requirements={requirements}
                    requirementLabels={
                        requirementLabels
                    }
                />
            </section>

            {/* =====================================================
                12. CURRENT STATE
            ===================================================== */}

            <section
                id="current"
                className="case-study-section current"
            >
                <span className="section-number">
                    12
                </span>

                <h2>
                    Current State
                </h2>

                <p>
                    Union is being developed
                    incrementally. The system
                    foundation is now accompanied
                    by device integration and
                    operational monitoring.
                </p>

                <div className="current-state">
                    <article>
                        <span>
                            Completed
                        </span>

                        <h3>
                            System Foundation
                        </h3>

                        <p>
                            Backend foundation,
                            database, frontend
                            structure and initial
                            authentication.
                        </p>
                    </article>

                    <article>
                        <span>
                            Implemented
                        </span>

                        <h3>
                            Device Integration
                        </h3>

                        <p>
                            Reader registration,
                            persistent credentials,
                            reader authentication,
                            backend configuration
                            retrieval and heartbeat
                            communication.
                        </p>
                    </article>

                    <article>
                        <span>
                            Implemented
                        </span>

                        <h3>
                            Observability Foundation
                        </h3>

                        <p>
                            Structured backend logs,
                            device telemetry events,
                            request correlation and
                            Grafana-based monitoring
                            infrastructure.
                        </p>
                    </article>

                    <article>
                        <span>
                            In Progress
                        </span>

                        <h3>
                            Full Product Flow
                        </h3>

                        <p>
                            Attendance,
                            responsibilities,
                            penalties, points and
                            progression continue to
                            evolve.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                13. TESTING & CI/CD
            ===================================================== */}

            <section
                id="testing"
                className="case-study-section testing"
            >
                <span className="section-number">
                    13
                </span>

                <h2>
                    Testing & CI/CD
                </h2>

                <p>
                    Automated validation and
                    deployment are part of the
                    development process so that
                    changes can be introduced without
                    relying entirely on manual checks.
                </p>

                <div className="content-grid">
                    <article>
                        <h3>
                            Unit Testing
                        </h3>

                        <p>
                            Individual components and
                            business logic can be
                            validated independently.
                        </p>
                    </article>

                    <article>
                        <h3>
                            Integration Testing
                        </h3>

                        <p>
                            Service boundaries and
                            database interactions are
                            verified together.
                        </p>
                    </article>

                    <article>
                        <h3>
                            End-to-End Testing
                        </h3>

                        <p>
                            Critical product flows
                            cross multiple system
                            components.
                        </p>
                    </article>

                    <article>
                        <h3>
                            CI/CD
                        </h3>

                        <p>
                            GitHub Actions is used to
                            automate validation and
                            deployment workflows.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                14. ENGINEERING DECISIONS
            ===================================================== */}

            <section
                id="decisions"
                className="case-study-section decisions"
            >
                <span className="section-number">
                    14
                </span>

                <h2>
                    Engineering Decisions
                </h2>

                <article>
                    <h3>
                        Backend-centered
                        business logic
                    </h3>

                    <p>
                        Business rules are kept
                        centrally in the backend so
                        that the frontend and physical
                        device do not maintain competing
                        implementations of the same
                        rules.
                    </p>
                </article>

                <article>
                    <h3>
                        Explicit system boundaries
                    </h3>

                    <p>
                        Frontend, backend, database and
                        device have distinct
                        responsibilities and communicate
                        through defined interfaces.
                    </p>
                </article>

                <article>
                    <h3>
                        Device identity
                    </h3>

                    <p>
                        The reader has its own identity
                        and authentication mechanism
                        instead of being treated as an
                        anonymous HTTP client.
                    </p>
                </article>

                <article>
                    <h3>
                        Heartbeat instead of
                        continuous connection
                    </h3>

                    <p>
                        The device periodically reports
                        its presence to the backend.
                        This provides a simple
                        availability signal without
                        requiring a permanent application
                        connection.
                    </p>
                </article>

                <article>
                    <h3>
                        Structured telemetry
                    </h3>

                    <p>
                        Device errors are represented
                        using predefined levels,
                        modules and event names so that
                        operational data can be filtered
                        and analyzed rather than being
                        treated as unstructured text.
                    </p>
                </article>

                <article>
                    <h3>
                        Observability as architecture
                    </h3>

                    <p>
                        Logging and monitoring are
                        treated as part of the system
                        rather than something added only
                        after deployment.
                    </p>
                </article>

                <article>
                    <h3>
                        Scale when justified
                    </h3>

                    <p>
                        The architecture considers
                        future horizontal scaling, but
                        additional infrastructure is not
                        introduced until there is a
                        concrete requirement for it.
                    </p>
                </article>
            </section>

            {/* =====================================================
                15. LEARNINGS
            ===================================================== */}

            <section
                id="learnings"
                className="case-study-section learnings"
            >
                <span className="section-number">
                    15
                </span>

                <h2>
                    Learnings
                </h2>

                <p>
                    The most important part of Union
                    has not been a particular
                    technology. It has been learning
                    how to turn an everyday problem
                    into a product and then into a
                    reliable system.
                </p>

                <p>
                    The project requires moving between
                    different levels of abstraction:
                    understanding users, defining
                    requirements, designing system
                    boundaries, implementing APIs,
                    integrating hardware and operating
                    the resulting system.
                </p>

                <p>
                    Adding the physical device changed
                    the engineering problem significantly.
                    The system must now handle device
                    identity, intermittent communication,
                    state synchronization, heartbeats,
                    telemetry and operational failures.
                </p>

                <p>
                    Observability also changed from an
                    optional debugging tool into an
                    architectural concern. Once multiple
                    components communicate with each
                    other, understanding where a failure
                    occurred becomes part of building the
                    system itself.
                </p>

                <p>
                    Union is therefore an ongoing
                    engineering exercise: build something,
                    observe how it behaves, identify what
                    does not work, refine the architecture
                    and continue iterating toward a
                    system that is actually useful.
                </p>
            </section>
            <a href="#nav-start" className="back-to-nav">
                ↑ Back to navigation
            </a>
        </main>
    );
};

export default Union;




// "I am designing an observable distributed IoT system."



// ┌──────────────────────────────────────────────────────────┐
// │ UNION                                                    │
// │ Football coordination, attendance & gamification        │
// │                                                          │
// │ Java · Spring Boot · React · PostgreSQL · Bluetooth      │
// │ Personal project · In development                        │
// └──────────────────────────────────────────────────────────┘
//
//                         ↓
//
// 1. OVERVIEW
//
//    What is Union?
//
//    A system for organizing recurring football games,
//    coordinating responsibilities, tracking attendance
//    and making participation more reliable and fair.
//
//                         ↓
//
// 2. MOTIVATION
//
//    The real-world problem
//
//    We play football every Friday and Sunday.
//
//    Originally:
//      → People were assumed to attend
//      → Some people cancelled late
//      → Others assumed enough players would come
//      → Sometimes only 3–5 people showed up
//      → Winter made this particularly problematic
//
//    There were also organizational problems:
//
//      → Who brings the goals?
//      → Who takes them back?
//      → Who washes the clothes?
//      → Who is actually available?
//      → Who arrives late?
//
//                         ↓
//
// 3. FROM PROBLEM TO SOLUTION
//
//    How the product idea evolved
//
//    Problem
//       ↓
//    Identify constraints
//       ↓
//    Define responsibilities
//       ↓
//    Define system requirements
//       ↓
//    Build the product
//       ↓
//    Iterate
//
//    Core principles:
//
//      Commitment
//      Fairness
//      Transparency
//      Shared responsibility
//
//                         ↓
//
// 4. REQUIREMENTS
//
//    What must the system actually solve?
//
//    Identity
//      └── Users and credentials
//
//    Events
//      ├── Define recurring games
//      ├── Date / time
//      └── Participation
//
//    Attendance
//      ├── Expected attendance
//      ├── Cancellation deadline
//      └── Arrival tracking
//
//    Responsibilities
//      ├── Tasks
//      ├── Assignment
//      └── Rotation
//
//    Gamification
//      ├── Points
//      ├── Penalties
//      └── Progression
//
//                         ↓
//
// 5. ARCHITECTURE
//
//    How does the solution work?
//
//             ┌──────────────┐
//             │   Frontend   │
//             │    React     │
//             └──────┬───────┘
//                    │
//                   HTTPS
//                    │
//             ┌──────▼───────┐
//             │    Backend   │
//             │ Spring Boot  │
//             └──────┬───────┘
//                    │
//             ┌──────▼───────┐
//             │  PostgreSQL  │
//             └──────────────┘
//
//             Physical Device
//                    │
//              Bluetooth / HTTP
//                    │
//                    └────────→ Backend
//
//                         ↓
//
// 6. TECHNOLOGY STACK
//
//    What technologies were chosen?
//
//    Backend
//      Java · Spring Boot · PostgreSQL
//
//    Frontend
//      React · TypeScript
//
//    Device
//      Bluetooth · Hardware / Reader
//
//    Infrastructure
//      Docker · GitHub Actions
//
//    And importantly:
//
//    Why these technologies?
//
//                         ↓
//
// 7. PROGRESS
//
//    How much of the product is implemented?
//
//    Overall          67%
//
//    Backend          80%
//    Frontend         60%
//    Device           50%
//
//    Requirements
//
//    Architecture     ██████████ 100%
//    Backend          ████████░░  80%
//    NFC / Device     █████░░░░░  50%
//    Production       ░░░░░░░░░░   0%
//
//    Gantt / timeline
//
//    Repository filters
//    Requirement progress
//    Todo progress
//
//                         ↓
//
// 8. CURRENT STATE
//
//    What can Union do today?
//
//    ✓ Implemented
//      → ...
//
//    ◐ In progress
//      → ...
//
//    ○ Planned
//      → ...
//
//    This section answers:
//    “If I used Union today, what would actually work?”
//
//                         ↓
//
// 9. IMPLEMENTATION
//
//    How was the solution built?
//
//    9.1 Backend
//        API
//        Authentication
//        Database
//        Events
//        Attendance
//        Tasks
//
//    9.2 Frontend
//        React application
//        State management
//        Event management
//        Dashboard
//        Progress
//
//    9.3 Device
//        Reader
//        Arrival detection
//        Credential handling
//        Backend communication
//
//                         ↓
//
// 10. GAMIFICATION
//
//     How does Union encourage fairness?
//
//     Attendance
//        ↓
//     Arrival
//        ↓
//     Points / penalties
//        ↓
//     Progression
//
//     Example:
//
//       On time       → normal points
//       Late          → penalty
//       Responsibility completed → points
//
//     The purpose isn't “gamification for fun”.
//
//     It creates visible consequences and rewards
//     for participation and shared responsibility.
//
//                         ↓
//
// 11. TESTING & CI/CD
//
//     How do I keep the system reliable?
//
//     Unit tests
//     Integration tests
//     E2E tests
//     GitHub Actions
//     Docker
//
//                         ↓
//
// 12. ENGINEERING DECISIONS
//
//     Why Spring Boot?
//     Why PostgreSQL?
//     Why separate frontend/backend/device?
//     Why HTTPS?
//     Why Bluetooth for arrival detection?
//     Why task rotation?
//     Why this data model?
//
//                         ↓
//
// 13. LEARNINGS
//
//     What did I learn?
//
//     Product development
//     Requirements discovery
//     Designing around real constraints
//     Full-stack development
//     Hardware/software integration
//     System architecture
//     Iteration


