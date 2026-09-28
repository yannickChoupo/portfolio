import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type ExperienceType = "Professional" | "Academic" | "Personal";

interface Experience {
    id: string;
    name: string;
    type: ExperienceType;
    description: string;
    techStack: string[];
    status: string;
    link?: string;
}

interface Category {
    name: ExperienceType;
    active: boolean;
}

interface TechStack {
    tech: string;
    active: boolean;
}

const Categories: Category[] = [
    {
        name: "Professional",
        active: true
    },
    {
        name: "Academic",
        active: false
    },
    {
        name: "Personal",
        active: false
    }
];

const Experiences: Experience[] = [
    {
        id: "aonic-spfx",
        name: "SharePoint / SPFx Development",
        type: "Professional",
        description: "Development of SharePoint solutions and backend services.",
        techStack: [
            "SPFx",
            "SharePoint",
            "React",
            "TypeScript",
            "Azure"
        ],
        status: "not-available"
    },

    {
        id: "syngenio-assessment",
        name: "Software Assessment Application",
        type: "Professional",
        description: "Web application with React frontend and Java/Spring Boot backend.",
        techStack: [
            "Java",
            "Spring Boot",
            "REST APIs",
            "React",
            "SQL"
        ],
        status: "not-available"
    },

    {
        id: "vacuum-cleaner",
        name: "Vacuum Cleaner Navigation",
        type: "Academic",
        description: "University project focusing on C++ and software engineering.",
        techStack: [
            "C++",
            "OOP",
            "UML",
            "Software Engineering"
        ],
        status: "not-available"
    },

    {
        id: "iot-attendance",
        name: "IoT Attendance System",
        type: "Personal",
        description: "IoT-based attendance system using ESP32, Flutter and a REST backend.",
        techStack: [
            "Flutter",
            "Express.js",
            "ESP32",
            "REST APIs",
            "Docker",
            "NFC",
            "Bluetooth",
            "RC522",
            "RFID",
            "SD Card",
            "Prisma",
            "Authentication",
            "Authorization"
        ],
        status: "available"
    },
    {
        name: "Quote",
        type: "Personal",
        id: "Quote",
        techStack: ["Javascript", "Ajax", "React", "SCSS"],
        description: "Generate a Random Quote onclick",
        status: "available",
    },
    {
        name: "BarChart",
        id: "BarChart",
        type: "Personal",
        techStack: ["Javascript", "D3", "Ajax", "React", "HTML"],
        description: "calculate",
        link: "/dataviz/BarChart",
        status: "available",
    },
    {
        name: "Timer",
        id: "Timer",
        type: "Personal",
        techStack: ["Javascript", "React", "HTML", "SCSS", "Ajax"],
        description: "set a timer with Break Time an ring tone at the end of the time",
        status: "available",
    },
    {
        name: "ScatterPlot",
        id: "ScatterPlot",
        type: "Personal",
        techStack: ["Javascript", "D3", "HTML", "React"],
        description: "description...",
        status: "not-available",
        link: "/dataviz/ScatterPlot",
    },
    {
        name: "Timestamp",
        id: "Timestamp",
        type: "Personal",
        techStack: ["Express"],
        description: "Timestamp Microservice - Convert dates between Unix timestamp and UTC ISO-8601 formats. FreeCodeCamp API certification project.",
        status: "available",
    },
    // {
    //     name: "Heatmap",
    //     id: "Heatmap",
    //     type: "Personal",
    //     techStack: ["Javascript", "Ajax", "React"],
    //     description: "Description .....",
    //     status: "available",
    //     link: "/dataviz/Heatmap",
    // },
    {
        name: "Choroploth",
        id: "Choroploth",
        type: "Personal",
        techStack: ["Javascript", "Ajax", "D3"],
        description: "Description .....",
        status: "available",
        link: "/dataviz/Choroploth",
    },
    {
        name: "TributePage",
        id: "TributePage",
        type: "Personal",
        techStack: ["Javascript", "Ajax", "React"],
        description: "Description .....",
        status: "not available",
    },
    {
        name: "URLShortener",
        id: "URLShortener",
        type: "Personal",
        techStack: ["Express", "MongoDB"],
        description: "URL Shortener Microservice - Create short URLs that redirect to original long URLs. Includes URL validation and database storage. FreeCodeCamp API certification project.",
        status: "available",
    },
    {
        name: "FileMetadata",
        id: "FileMetadata",
        type: "Personal",
        techStack: ["Express", "Multer"],
        description: "File Metadata Microservice - Upload files and receive metadata including file name, type, and size. Uses multer for file handling. FreeCodeCamp API certification project.",
        status: "available",
    },
    {
        name: "ExerciseTracker",
        id: "ExerciseTracker",
        type: "Personal",
        techStack: ["Express", "MongoDB"],
        description: "Exercise Tracker Microservice - Create users, add exercises, and retrieve exercise logs. Full CRUD functionality with MongoDB. FreeCodeCamp API certification project.",
        status: "available",
    },
];

const DEFAULT_EXPERIENCES: ExperienceType[] = [
    "Personal",
];

const Works: React.FC = () => {
    const [curCategories, setCurCategories] =
        useState<Category[]>(
            Categories.map(category => ({
                ...category,
                active: DEFAULT_EXPERIENCES.includes(
                    category.name
                )
            }))
        );

    const [curStack, setCurStack] =
        useState<TechStack[]>([]);

    useEffect(() => {
        const allTechnologies = Array.from(
            new Set(
                Experiences.flatMap(
                    experience => experience.techStack
                )
            )
        );

        setCurStack(
            allTechnologies.map(tech => ({
                tech,
                active: Experiences.some(
                    experience =>
                        DEFAULT_EXPERIENCES.includes(
                            experience.type
                        ) &&
                        experience.techStack.includes(tech)
                )
            }))
        );
    }, []);

    /*
     * Category selection
     */
    const handleCategoryChange = (
        e: React.MouseEvent<HTMLLIElement>
    ): void => {
        const categoryName =
            e.currentTarget.id as ExperienceType;

        const category = curCategories.find(
            category => category.name === categoryName
        );

        if (!category) return;

        const newActive = !category.active;

        // Update Experience
        setCurCategories(current =>
            current.map(category => ({
                ...category,
                active:
                    category.name === categoryName
                        ? newActive
                        : category.active
            }))
        );

        // If Experience is activated,
        // activate all technologies belonging to it.
        if (newActive) {
            const matchingTechs = new Set(
                Experiences
                    .filter(
                        experience =>
                            experience.type === categoryName
                    )
                    .flatMap(
                        experience => experience.techStack
                    )
            );

            setCurStack(current =>
                current.map(stack => ({
                    ...stack,
                    active:
                        matchingTechs.has(stack.tech)
                            ? true
                            : stack.active
                }))
            );
        } else {
            const activeCategories = curCategories
                .filter(
                    category =>
                        category.active &&
                        category.name !== categoryName
                )
                .map(category => category.name);

            const remainingTechs = new Set(
                Experiences
                    .filter(experience =>
                        activeCategories.includes(
                            experience.type
                        )
                    )
                    .flatMap(
                        experience => experience.techStack
                    )
            );

            setCurStack(current =>
                current.map(stack => ({
                    ...stack,
                    active: remainingTechs.has(stack.tech)
                }))
            );
        }
    };

    const handleTechStackChange = (
        e: React.MouseEvent<HTMLLIElement>
    ): void => {
        const techName = e.currentTarget.id;

        const stack = curStack.find(
            stack => stack.tech === techName
        );

        if (!stack) return;

        const newActive = !stack.active;

        // Update TechStack
        const newStack = curStack.map(stack => ({
            ...stack,
            active:
                stack.tech === techName
                    ? newActive
                    : stack.active
        }));

        setCurStack(newStack);

        /*
         * Find all Experiences that contain
         * any currently selected technology.
         */
        const activeTechs = newStack
            .filter(stack => stack.active)
            .map(stack => stack.tech);

        /*
         * No technology selected:
         * reset all Experience filters.
         */
        if (activeTechs.length === 0) {
            setCurCategories(current =>
                current.map(category => ({
                    ...category,
                    active: false
                }))
            );

            return;
        }

        /*
         * Activate Experiences that contain
         * at least one selected technology.
         */
        setCurCategories(current =>
            current.map(category => {
                const hasMatchingExperience =
                    Experiences.some(
                        experience =>
                            experience.type ===
                            category.name &&
                            experience.techStack.some(
                                tech =>
                                    activeTechs.includes(tech)
                            )
                    );

                return {
                    ...category,
                    active: hasMatchingExperience
                };
            })
        );
    };
    /*
     * Currently selected filters
     */
    const activeCategories = curCategories
        .filter(category => category.active)
        .map(category => category.name);

    const activeStacks = curStack
        .filter(stack => stack.active)
        .map(stack => stack.tech);

    /*
     * Filter Experiences
     */
    const filteredExperiences = Experiences.filter(
        experience => {
            const categoryMatch =
                activeCategories.length === 0 ||
                activeCategories.includes(experience.type);

            const techMatch =
                activeStacks.length === 0 ||
                activeStacks.some(tech =>
                    experience.techStack.includes(tech)
                );

            return (
                categoryMatch &&
                techMatch &&
                experience.status === "available"
            );
        }
    );

    return (
        <section id="work" className="page">
            <h2>Work</h2>

            <div className="filters">

                {/* Experience */}
                <div id="experience">
                    <h4>Experience</h4>

                    <ul className="filter-list">
                        {curCategories.map(category => (
                            <li
                                id={category.name}
                                className={
                                    category.active
                                        ? "active"
                                        : ""
                                }
                                onClick={
                                    handleCategoryChange
                                }
                                key={category.name}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack */}
                <div id="techStack">
                    <h4>Tech Stack</h4>

                    <ul className="filter-list">
                        {curStack.map(stack => (
                            <li
                                id={stack.tech}
                                className={
                                    stack.active
                                        ? "active"
                                        : ""
                                }
                                onClick={
                                    handleTechStackChange
                                }
                                key={stack.tech}
                            >
                                {stack.tech}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Experiences */}
            <div className="work-list">
                {filteredExperiences.map(experience => (
                    <NavLink
                        to={
                            experience.link ??
                            `/works/${experience.id}`
                        }
                        className="list-item project-card"
                        key={experience.id}
                    >
                        {experience.name}
                    </NavLink>
                ))}
            </div>
        </section>
    );
};

export default Works;