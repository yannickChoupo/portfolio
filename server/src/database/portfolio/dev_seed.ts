import Project from "../../modules/project/Project.model";
import Requirement from "../../modules/requirement/requirement.model";
import Todo from "../../modules/todo/todo.model";

export const seedUnion = async (): Promise<void> => {
    /*
     * 1. Reset existing Union data
     */

    await Todo.deleteMany({});
    await Requirement.deleteMany({});
    await Project.deleteMany({});

    // const existingProject = await Project.findOne({
    //     slug: "union"
    // });

    // if (existingProject) {
    //     const requirements = await Requirement.find({
    //         project: existingProject._id
    //     }).select("_id");

    //     const requirementIds = requirements.map(
    //         requirement => requirement._id
    //     );

    //     if (requirementIds.length > 0) {
    //         await Todo.deleteMany({
    //             requirement: {
    //                 $in: requirementIds
    //             }
    //         });
    //     }

    //     await Requirement.deleteMany({
    //         project: existingProject._id
    //     });

    //     await Project.deleteOne({
    //         _id: existingProject._id
    //     });
    // }

    /*
     * 2. Create Union project
     */

    const project = await Project.create({
        name: "Union",
        slug: "union",
        type: "fullstack",
        status: "available",

        description:
            "A system for organizing football, coordinating responsibilities and making participation more reliable and fair.",

        longDescription:
            "Union combines event management, attendance, responsibilities, NFC/Bluetooth identification and gamification into one system for reliable football organization.",

        techUsed: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "NFC",
            "Bluetooth",
            "ESP32"
        ],

        features: [
            "Event management",
            "Attendance tracking",
            "Responsibility management",
            "NFC identification",
            "Bluetooth detection",
            "Arrival tracking",
            "Gamification"
        ],

        githubUrl: "",
        liveUrl: "",

        featured: true,
        order: 1
    });

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
                "Enforce ownership, authorization, uniqueness and credential security rules.",
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
                "Test the backend implementation and verify CI.",
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
                "Connect the ESP32 to the backend securely.",
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
                "Handle reader behaviour such as duplicate scans and cooldowns.",
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
                "Persist credentials, events and offline arrival data.",
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
                "Handle authentication and authorization in Flutter.",
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

    const requirement = (name: string) => {
        const found = requirements.find(
            item => item.name === name
        );

        if (!found) {
            throw new Error(
                `Requirement "${name}" not found`
            );
        }

        return found;
    };

    const todo = (
        requirementName: string,
        repositoryId: "backend" | "frontend" | "device",
        name: string,
        title: string,
        status: "TODO" | "IN_PROGRESS" | "DONE" = "TODO"
    ) => ({
        requirement: requirement(requirementName)._id,
        name,
        title,
        status,
        repositoryId,
    });

    const todos = await Todo.create([
        todo(
            "Credential Management",
            "backend",
            "Feature Requirements",
            "Define credential feature requirements",
            "DONE"
        ),

        todo(
            "Credential Management",
            "backend",
            "API Contract",
            "Define credential API contract"
        ),

        todo(
            "Credential Management",
            "backend",
            "Request DTO",
            "Define credential request DTO"
        ),

        todo(
            "Credential Management",
            "backend",
            "Response DTO",
            "Define credential response DTO"
        ),

        todo(
            "Credential Management",
            "backend",
            "Validation",
            "Implement credential validation"
        ),

        todo(
            "Credential Management",
            "backend",
            "Database",
            "Design credential database model"
        ),

        todo(
            "Credential Management",
            "backend",
            "Service",
            "Implement credential service"
        ),

        todo(
            "Credential Management",
            "backend",
            "Controller",
            "Implement credential controller"
        ),

        todo(
            "Credential Management",
            "backend",
            "Routes",
            "Implement credential routes"
        ),

        todo(
            "Credential Security",
            "backend",
            "Create Own Credential",
            "Allow users to create credentials for themselves"
        ),

        todo(
            "Credential Security",
            "backend",
            "Prevent Cross User Creation",
            "Prevent users from creating credentials for another user"
        ),

        todo(
            "Credential Security",
            "backend",
            "List Own Credentials",
            "Allow users to list only their own credentials"
        ),

        todo(
            "Credential Security",
            "backend",
            "Revoke Own Credential",
            "Allow users to revoke only their own credentials"
        ),

        todo(
            "Credential Security",
            "backend",
            "Replace Own Credential",
            "Allow users to replace only their own credentials"
        ),

        todo(
            "Credential Security",
            "backend",
            "Prevent Reactivation",
            "Prevent revoked credentials from being reactivated"
        ),

        todo(
            "Credential Security",
            "backend",
            "Global Uniqueness",
            "Enforce globally unique credential values"
        ),

        todo(
            "Credential Security",
            "backend",
            "Device Restrictions",
            "Prevent IoT devices from managing credentials"
        ),

        todo(
            "Credential Security",
            "backend",
            "Device Validation",
            "Allow IoT devices to validate credentials"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Lifecycle Definition",
            "Define credential lifecycle"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Provision",
            "Implement credential provisioning"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Authentication",
            "Implement credential authentication"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Rotation",
            "Implement credential rotation"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Revocation",
            "Implement credential revocation"
        ),

        todo(
            "Credential Lifecycle",
            "backend",
            "Retirement",
            "Implement credential retirement"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Unit Tests",
            "Add credential service unit tests"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Integration Tests",
            "Add credential API integration tests"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Error Tests",
            "Add credential error-case tests"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Authentication Tests",
            "Add credential authentication tests"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Authorization Tests",
            "Add credential authorization tests"
        ),

        todo(
            "Testing & CI",
            "backend",
            "Build",
            "Run npm run build"
        ),

        todo(
            "Testing & CI",
            "backend",
            "CI",
            "Verify GitHub CI"
        ),

        // =========================
        // DEVICE
        // =========================

        todo(
            "Hardware",
            "device",
            "ESP32 Boot",
            "Verify ESP32 boots"
        ),

        todo(
            "Hardware",
            "device",
            "SPI2",
            "Initialize SPI2"
        ),

        todo(
            "Hardware",
            "device",
            "RC522",
            "Initialize RC522"
        ),

        todo(
            "NFC",
            "device",
            "Detect Card",
            "Detect physical NFC card"
        ),

        todo(
            "NFC",
            "device",
            "Read UID",
            "Read NFC UID"
        ),

        todo(
            "NFC",
            "device",
            "Normalize Credential",
            "Normalize credential format"
        ),

        todo(
            "NFC",
            "device",
            "Credential Event",
            "Publish credential event"
        ),

        todo(
            "Device Network",
            "device",
            "WiFi",
            "Connect ESP32 to Wi-Fi"
        ),

        todo(
            "Device Network",
            "device",
            "HTTPS",
            "Make HTTPS request"
        ),

        todo(
            "Device Network",
            "device",
            "Certificate",
            "Validate backend certificate"
        ),

        todo(
            "Device Network",
            "device",
            "Device Authentication",
            "Authenticate ESP32 as IoT device"
        ),

        todo(
            "Credential Validation",
            "device",
            "Send Credential",
            "Send NFC credential to backend"
        ),

        todo(
            "Credential Validation",
            "device",
            "Authentication Result",
            "Process backend authentication result"
        ),

        todo(
            "Credential Validation",
            "device",
            "Arrival",
            "Confirm player arrival"
        ),

        todo(
            "Reader",
            "device",
            "Duplicate Prevention",
            "Prevent repeated scans"
        ),

        todo(
            "Reader",
            "device",
            "Cooldown",
            "Implement local scan cooldown"
        ),

        todo(
            "BLE",
            "device",
            "GATT",
            "Implement BLE GATT service"
        ),

        todo(
            "BLE",
            "device",
            "Discovery",
            "Support Flutter reader discovery"
        ),

        todo(
            "BLE",
            "device",
            "Connection",
            "Allow Flutter to connect to reader"
        ),

        todo(
            "BLE",
            "device",
            "Challenge Response",
            "Implement BLE challenge response"
        ),

        todo(
            "Device Persistence",
            "device",
            "Credential Cache",
            "Implement local credential cache"
        ),

        todo(
            "Device Persistence",
            "device",
            "Offline Queue",
            "Implement offline arrival queue"
        ),

        todo(
            "Device Persistence",
            "device",
            "Retry",
            "Retry queued events"
        ),

        todo(
            "Device Persistence",
            "device",
            "Event Logging",
            "Implement device event logging"
        ),

        // =========================
        // FRONTEND
        // =========================

        todo(
            "Flutter Credential Management",
            "frontend",
            "API Contract",
            "Review backend API contract"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Datasource",
            "Implement remote datasource"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "API Request",
            "Implement API request"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Response Parsing",
            "Implement API response parsing"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Repository",
            "Update repository implementation"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Use Case",
            "Implement credential use case"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "UI",
            "Implement credential management UI"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Loading",
            "Add loading state"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Error",
            "Add error state"
        ),

        todo(
            "Flutter Credential Management",
            "frontend",
            "Empty",
            "Add empty state"
        ),

        todo(
            "Flutter Authentication",
            "frontend",
            "Authentication",
            "Handle authentication"
        ),

        todo(
            "Flutter Authentication",
            "frontend",
            "Authorization",
            "Handle authorization errors"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "Unit Tests",
            "Add Flutter unit tests"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "Widget Tests",
            "Add Flutter widget tests"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "Integration Tests",
            "Add Flutter integration tests"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "Analyze",
            "Run flutter analyze"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "Tests",
            "Run flutter test"
        ),

        todo(
            "Flutter Testing & CI",
            "frontend",
            "CI",
            "Verify GitHub CI"
        ),
    ]);

    console.log(
        `Union seed complete: ${requirements.length} requirements, ${todos.length} todos`
    );
};

// import mongoose from "mongoose";

// const args = process.argv.slice(2);

// const isReset = args.includes("--reset");
// const isTestData = args.includes("--test-data");

// async function seed() {
//     if (process.env.NODE_ENV === "production") {
//         console.error("❌ Seeding is disabled in production.");
//         process.exit(1);
//     }
//     const username = encodeURIComponent(process.env.MONGO_USERNAME || "admin");
//     const password = encodeURIComponent(process.env.MONGO_PASSWORD || "admin123");

//     const host = process.env.MONGO_HOST || "localhost";
//     const port = process.env.MONGO_PORT || "27017";
//     const database = process.env.MONGO_DATABASE || "portfolio_db_dev";

//     const mongoUri =
//         process.env.NODE_ENV === "production"
//             ? `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=Cluster0`
//             : `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;


//     try {
//         await mongoose.connect(mongoUri!);

//         console.log("✅ Connected to MongoDB");

//         if (isReset) {
//             console.log("🗑️ Resetting database...");

//             // await User.deleteMany({});
//             // await Project.deleteMany({});
//             // etc.
//         }

//         console.log("🌱 Seeding database...");

//         // await User.create(...);
//         // await Project.create(...);

//         if (isTestData) {
//             console.log("🧪 Creating test data...");

//             // await User.create(testUsers);
//             // await Project.create(testProjects);
//         }

//         console.log("✅ Seeding completed");
//     } catch (error) {
//         console.error("❌ Seeding failed:", error);
//         process.exit(1);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// seed();