import Project from "../modules/project/Project.model";
import Requirement from "../modules/requirement/requirement.model";
import Todo from "../modules/todo/todo.model";

export const seedUnionRequirements = async (): Promise<void> => {
    await Todo.deleteMany({});
    await Requirement.deleteMany({});
    await Project.deleteMany({});


    // Find Union project
    const project = await Project.findOne({
        slug: "union"
    });

    if (!project) {
        throw new Error(
            "Union project not found. Seed the project first."
        );
    }

    /*
     * Reset existing Union requirements and todos
     */

    const existingRequirements = await Requirement.find({
        project: project._id
    }).select("_id");

    const requirementIds = existingRequirements.map(
        requirement => requirement._id
    );

    if (requirementIds.length > 0) {
        await Todo.deleteMany({
            requirement: {
                $in: requirementIds
            }
        });
    }

    await Requirement.deleteMany({
        project: project._id
    });

    /*
     * Create requirements
     */

    const requirements = await Requirement.create([
        {
            project: project._id,
            name: "Credential Management",
            description:
                "Manage user credentials and expose the credential management API.",
            scope: "BACKEND"
        },
        {
            project: project._id,
            name: "Credential Security",
            description:
                "Enforce ownership, authorization, uniqueness, and credential security rules.",
            scope: "BACKEND"
        },
        {
            project: project._id,
            name: "Credential Lifecycle",
            description:
                "Define and implement the complete credential lifecycle.",
            scope: "BACKEND"
        },
        {
            project: project._id,
            name: "Testing & CI",
            description:
                "Test the credential system and verify backend quality through CI.",
            scope: "BACKEND"
        },
        {
            project: project._id,
            name: "Hardware",
            description:
                "Initialize and verify the ESP32 reader hardware.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "NFC",
            description:
                "Read physical NFC credentials and publish credential events.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "Device Network",
            description:
                "Connect the ESP32 to the backend securely over the network.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "Credential Validation",
            description:
                "Validate credentials through the backend and process arrival results.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "Reader",
            description:
                "Handle reader behaviour such as cooldowns and arrival confirmation.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "BLE",
            description:
                "Implement Bluetooth communication between the reader and Flutter.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "Device Persistence",
            description:
                "Persist credentials, events, and offline arrival data.",
            scope: "DEVICE"
        },
        {
            project: project._id,
            name: "Flutter Credential Management",
            description:
                "Implement credential management in the Flutter application.",
            scope: "FRONTEND"
        },
        {
            project: project._id,
            name: "Flutter Authentication",
            description:
                "Handle authentication and authorization within the Flutter application.",
            scope: "FRONTEND"
        },
        {
            project: project._id,
            name: "Flutter Testing & CI",
            description:
                "Test the Flutter implementation and verify CI.",
            scope: "FRONTEND"
        }
    ]);

    /*
     * Helper to find a requirement by name
     */

    const requirement = (name: string) => {
        const found = requirements.find(
            item => item.name === name
        );

        if (!found) {
            throw new Error(
                `Requirement "${name}" was not created.`
            );
        }

        return found;
    };

    /*
     * Create todos
     */

    const todos = await Todo.create([

        // =========================================================
        // BACKEND — CREDENTIAL MANAGEMENT
        // =========================================================

        {
            requirement: requirement("Credential Management")._id,
            name: "Feature Requirements",
            title: "Define credential feature requirements",
            status: "DONE",
            scope: "BACKEND",
            description:
                "Define the functional and security requirements for user-managed credentials."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "API Contract",
            title: "Define credential API contract",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Define credential endpoints, requests, responses, and error responses."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Request DTO",
            title: "Define credential request DTO",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Define request types for creating, replacing, and managing credentials."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Response DTO",
            title: "Define credential response DTO",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Define response types returned by credential endpoints."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Validation",
            title: "Implement credential validation",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Validate credential format, required fields, and credential state."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Database",
            title: "Design credential database model",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Define credential ownership, value, status, timestamps, and uniqueness."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Migration",
            title: "Create credential database migration",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Apply the database changes required for credential management."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Service",
            title: "Implement credential service",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Implement credential creation, listing, replacement, revocation, and validation."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Controller",
            title: "Implement credential controller",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Expose credential operations through HTTP controllers."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Routes",
            title: "Implement credential routes",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Create authenticated API routes for credential management."
        },
        {
            requirement: requirement("Credential Management")._id,
            name: "Error Handling",
            title: "Implement credential error handling",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Handle invalid, unauthorized, revoked, and duplicate credentials."
        },

        // =========================================================
        // BACKEND — SECURITY
        // =========================================================

        {
            requirement: requirement("Credential Security")._id,
            name: "Create Own Credential",
            title: "Allow users to create credentials for themselves",
            status: "TODO",
            scope: "BACKEND",
            description:
                "A user may create a credential only for their own account."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Prevent Cross User Creation",
            title: "Prevent users from creating credentials for another user",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Reject requests attempting to create credentials owned by another user."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "List Own Credentials",
            title: "Allow users to list only their own credentials",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Credential queries must be restricted to the authenticated user."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Revoke Own Credential",
            title: "Allow users to revoke only their own credentials",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Users may revoke credentials belonging only to themselves."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Replace Own Credential",
            title: "Allow users to replace only their own credentials",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Users may replace credentials belonging only to themselves."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Prevent Reactivation",
            title: "Prevent revoked credentials from being reactivated",
            status: "TODO",
            scope: "BACKEND",
            description:
                "A revoked credential must never transition back to an active state."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Global Uniqueness",
            title: "Enforce globally unique credential values",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Credential values must be unique across the entire system."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Device Restrictions",
            title: "Prevent IoT devices from managing credentials",
            status: "TODO",
            scope: "BACKEND",
            description:
                "IoT devices must not be allowed to create, replace, or revoke credentials."
        },
        {
            requirement: requirement("Credential Security")._id,
            name: "Device Validation",
            title: "Allow IoT devices to validate credentials",
            status: "TODO",
            scope: "BACKEND",
            description:
                "IoT devices may only validate and use credentials."
        },

        // =========================================================
        // BACKEND — LIFECYCLE
        // =========================================================

        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Lifecycle Definition",
            title: "Define credential lifecycle",
            status: "TODO",
            scope: "BACKEND",
            description:
                "Define REGISTER, PROVISION, ACTIVE, AUTHENTICATE, MONITOR, ROTATE, REVOKE, and RETIRE states."
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Provision",
            title: "Implement credential provisioning",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Activation",
            title: "Implement credential activation",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Authentication",
            title: "Implement credential authentication",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Monitoring",
            title: "Implement credential monitoring",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Rotation",
            title: "Implement credential rotation",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Revocation",
            title: "Implement credential revocation",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Credential Lifecycle")._id,
            name: "Retirement",
            title: "Implement credential retirement",
            status: "TODO",
            scope: "BACKEND"
        },

        // =========================================================
        // BACKEND — TESTING
        // =========================================================

        {
            requirement: requirement("Testing & CI")._id,
            name: "Unit Tests",
            title: "Add credential service unit tests",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Integration Tests",
            title: "Add credential API integration tests",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Error Tests",
            title: "Add credential error-case tests",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Authentication Tests",
            title: "Add credential authentication tests",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Authorization Tests",
            title: "Add credential authorization tests",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Build",
            title: "Run npm run build",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Tests",
            title: "Run npm test",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "Local CI",
            title: "Run local CI with act",
            status: "TODO",
            scope: "BACKEND"
        },
        {
            requirement: requirement("Testing & CI")._id,
            name: "GitHub CI",
            title: "Verify GitHub CI",
            status: "TODO",
            scope: "BACKEND"
        },

        // =========================================================
        // DEVICE — HARDWARE
        // =========================================================

        {
            requirement: requirement("Hardware")._id,
            name: "ESP32 Boot",
            title: "Verify ESP32 boots",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Hardware")._id,
            name: "SPI2",
            title: "Initialize SPI2",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Hardware")._id,
            name: "RC522",
            title: "Initialize RC522",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Hardware")._id,
            name: "BLE Hardware",
            title: "Initialize BLE hardware",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — NFC
        // =========================================================

        {
            requirement: requirement("NFC")._id,
            name: "Detect Card",
            title: "Detect physical NFC card",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("NFC")._id,
            name: "Read UID",
            title: "Read NFC UID",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("NFC")._id,
            name: "Detect Tag",
            title: "Detect NFC tag",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("NFC")._id,
            name: "Normalize Credential",
            title: "Normalize credential format",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("NFC")._id,
            name: "Credential Event",
            title: "Publish credential event",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — NETWORK
        // =========================================================

        {
            requirement: requirement("Device Network")._id,
            name: "WiFi",
            title: "Connect ESP32 to Wi-Fi",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Network")._id,
            name: "HTTPS",
            title: "Make HTTPS request",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Network")._id,
            name: "Certificate",
            title: "Validate backend certificate",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Network")._id,
            name: "Device Authentication",
            title: "Authenticate ESP32 as IoT device",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — CREDENTIAL VALIDATION
        // =========================================================

        {
            requirement: requirement("Credential Validation")._id,
            name: "Send Credential",
            title: "Send NFC credential to backend",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Credential Validation")._id,
            name: "Authentication Result",
            title: "Process backend authentication result",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Credential Validation")._id,
            name: "Arrival",
            title: "Confirm player arrival",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Credential Validation")._id,
            name: "Display Arrival",
            title: "Display arrival confirmation",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — READER
        // =========================================================

        {
            requirement: requirement("Reader")._id,
            name: "Duplicate Prevention",
            title: "Prevent repeated scans",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Reader")._id,
            name: "Cooldown",
            title: "Implement local scan cooldown",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Reader")._id,
            name: "Arrival Confirmation",
            title: "Implement reader arrival confirmation",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — BLE
        // =========================================================

        {
            requirement: requirement("BLE")._id,
            name: "GATT",
            title: "Implement BLE GATT service",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("BLE")._id,
            name: "Discovery",
            title: "Support Flutter reader discovery",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("BLE")._id,
            name: "Connection",
            title: "Allow Flutter to connect to reader",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("BLE")._id,
            name: "Challenge Response",
            title: "Implement BLE challenge response",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("BLE")._id,
            name: "Credential Transmission",
            title: "Receive credential from Flutter",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // DEVICE — PERSISTENCE
        // =========================================================

        {
            requirement: requirement("Device Persistence")._id,
            name: "Credential Cache",
            title: "Implement local credential cache",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Persistence")._id,
            name: "Offline Queue",
            title: "Implement offline arrival queue",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Persistence")._id,
            name: "Retry",
            title: "Retry queued events",
            status: "TODO",
            scope: "DEVICE"
        },
        {
            requirement: requirement("Device Persistence")._id,
            name: "Event Logging",
            title: "Implement device event logging",
            status: "TODO",
            scope: "DEVICE"
        },

        // =========================================================
        // FRONTEND — FLUTTER CREDENTIAL MANAGEMENT
        // =========================================================

        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "API Contract",
            title: "Review backend API contract",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Requirements",
            title: "Define frontend feature requirements",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Datasource",
            title: "Implement remote datasource",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "API Request",
            title: "Implement API request",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Response Parsing",
            title: "Implement API response parsing",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Repository Interface",
            title: "Update repository interface",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Repository",
            title: "Update repository implementation",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Use Case",
            title: "Implement credential use case",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "State",
            title: "Update application state",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "UI",
            title: "Implement credential management UI",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Loading",
            title: "Add loading state",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Success",
            title: "Add success state",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Error",
            title: "Add error state",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Empty",
            title: "Add empty state",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Credential Management")._id,
            name: "Form Validation",
            title: "Add credential form validation",
            status: "TODO",
            scope: "FRONTEND"
        },

        // =========================================================
        // FRONTEND — AUTHENTICATION
        // =========================================================

        {
            requirement: requirement("Flutter Authentication")._id,
            name: "Authentication",
            title: "Handle authentication",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Authentication")._id,
            name: "Authorization Errors",
            title: "Handle authorization errors",
            status: "TODO",
            scope: "FRONTEND"
        },

        // =========================================================
        // FRONTEND — TESTING
        // =========================================================

        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Unit Tests",
            title: "Add Flutter unit tests",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Widget Tests",
            title: "Add Flutter widget tests",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Integration Tests",
            title: "Add Flutter integration tests",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Analyze",
            title: "Run flutter analyze",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Tests",
            title: "Run flutter test",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "Local CI",
            title: "Run local CI with act",
            status: "TODO",
            scope: "FRONTEND"
        },
        {
            requirement: requirement("Flutter Testing & CI")._id,
            name: "GitHub CI",
            title: "Verify GitHub CI",
            status: "TODO",
            scope: "FRONTEND"
        }
    ]);

    console.log(
        `Seeded ${requirements.length} Union requirements`
    );

    console.log(
        `Seeded ${todos.length} Union todos`
    );
};