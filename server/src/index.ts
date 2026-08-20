import express, {
    Request,
    Response,
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

/* -------------------------------------------------------------------------- */
/* Middleware                                                                 */
/* -------------------------------------------------------------------------- */
const allowedOrigins = [
    "http://localhost:3000",
    "https://www.njiloportfolio.de",
    "http://localhost:8080",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/* MongoDB                                                                    */
/* -------------------------------------------------------------------------- */
const username = encodeURIComponent(process.env.MONGO_USERNAME || "admin");
const password = encodeURIComponent(process.env.MONGO_PASSWORD || "admin123");

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || "27017";
const database = process.env.MONGO_DATABASE || "portfolio_db_dev";


const mongoUri =
    process.env.MONGO_URI ||
    (
        process.env.NODE_ENV === "production"
            ? `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=Cluster0`
            : `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
    );
/* -------------------------------------------------------------------------- */
/* Routes                                                                     */
/* -------------------------------------------------------------------------- */
import timestampRouter from './modules/timestamp/timestamp.routes';
import excerciseRouter from "./modules/exercise/excercise.routes";
import whoiamRouter from "./modules/reqHeaderParser/reqHeaderParser";
import shortUrlRouter from "./modules/urlShortener/shortUrl.routes";
import todosRouter from "./modules/todo/todo";
import sessionRouter from "./modules/session/session";
import contactRouter from "./modules/contact/contact.routes";
import fileMetaRouter from "./modules/fileMetaData/fileMetaData";
import projectRoutes from "./modules/project/project.routes";
import visitorRoutes from "./modules/visitor/visitor.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/notFound";

app.use("/api/timestamp", timestampRouter);
app.use("/api/whoiam", whoiamRouter);
app.use("/api/shorturl", shortUrlRouter);
app.use("/api/excercise", excerciseRouter);
app.use("/api/todo", todosRouter);
app.use("/api/session", sessionRouter);
app.use("/api/filemeta", fileMetaRouter);
app.use("/api/contact", contactRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/visitor", visitorRoutes);

app.get("/health", (_req: Request, res: Response) => {
    const mongoState = mongoose.connection.readyState;

    const mongoStatus = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
    };

    const isHealthy = mongoState === 1;

    res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? "healthy" : "unhealthy",
        service: "portfolio-backend",
        environment: process.env.NODE_ENV || "development",
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),

        server: {
            nodeVersion: process.version,
            platform: process.platform,
            pid: process.pid,
        },

        database: {
            status: mongoStatus[mongoState as keyof typeof mongoStatus],
            connected: isHealthy,
        },
    });
});

app.get("/", (_req: Request, res: Response) => {
    res.send("Yannick Njilo Portfolio backend");
});

app.use(errorHandler);
app.use(notFound);


/* -------------------------------------------------------------------------- */
/* Start server                                                               */
/* -------------------------------------------------------------------------- */
const PORT = Number(process.env.SERVERPORT) || 5000;

const startServer = async () => {
    try {
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(mongoUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.info("MongoDB Connected");
        app.listen(PORT, "0.0.0.0", () => {
            console.info(`Server is running on port : ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

startServer();