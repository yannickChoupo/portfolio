import React, { useMemo, useState } from "react";

import type {
    RequirementLabel,
} from "../../pages/Admin/types/admin.types";

import type {
    ProjectRequirement,
    ProjectTodo,
} from "./Union";
import GanttChart from "../dataviz/GanttChart";

type ProgressOverviewProps = {
    requirements: ProjectRequirement[];
    requirementLabels: RequirementLabel[];
};

const calculateProgress = (todos: ProjectTodo[]) => {
    if (todos.length === 0) {
        return 0;
    }

    const completed = todos.filter(
        (todo) => todo.completed || todo.state === "CLOSED"
    ).length;

    return Math.round(
        (completed / todos.length) * 100
    );
};

const ProgressOverview: React.FC<
    ProgressOverviewProps
> = ({
    requirements,
    requirementLabels,
}) => {
        const [labelId, setLabelId] =
            useState<string>("all");

        const [requirementId, setRequirementId] =
            useState<string | null>(null);

        /*
         * Flatten all todos.
         */
        const allTodos = useMemo(
            () =>
                requirements.flatMap(
                    (requirement) =>
                        requirement.todos ?? []
                ),
            [requirements]
        );

        /*
         * Label filter.
         */
        const handleLabelClick = (labelName: string) => {
            setLabelId((currentLabel) =>
                currentLabel === labelName
                    ? "all"
                    : labelName
            );

            setRequirementId(null);
        };

        /*
         * Filter todos by label.
         */
        const filteredTodos = useMemo(() => {
            if (labelId === "all") {
                return allTodos;
            }

            return allTodos.filter((todo) =>
                todo.labels?.some(
                    (label) =>
                        label.name === labelId
                )
            );
        }, [allTodos, labelId]);

        /*
         * Filter requirements by label.
         */
        const filteredRequirements = useMemo(() => {
            if (labelId === "all") {
                return requirements;
            }

            return requirements
                .filter((requirement) =>
                    requirement.labels?.some(
                        (label) =>
                            label.name === labelId
                    )
                )
                .map((requirement) => ({
                    ...requirement,

                    todos: (
                        requirement.todos ?? []
                    ).filter((todo) =>
                        todo.labels?.some(
                            (label) =>
                                label.name === labelId
                        )
                    ),
                }));
        }, [requirements, labelId]);

        /*
         * Statistics.
         *
         * GitHub uses:
         * OPEN / CLOSED
         *
         * Project status uses:
         * Backlog / Planning / In Progress / Finished
         */
        const repositoryProgress =
            calculateProgress(filteredTodos);

        const completedTodos =
            filteredTodos.filter(
                (todo) =>
                    todo.completed ||
                    todo.state === "CLOSED"
            ).length;

        const inProgressTodos =
            filteredTodos.filter(
                (todo) =>
                    !todo.completed &&
                    todo.state !== "CLOSED" &&
                    todo.status === "In Progress"
            ).length;

        const remainingTodos =
            filteredTodos.filter(
                (todo) =>
                    !todo.completed &&
                    todo.state !== "CLOSED" &&
                    todo.status !== "In Progress"
            ).length;

        /*
         * Requirement click.
         */
        const handleShowTodos = (
            id: string
        ) => {
            setRequirementId(
                (currentId) =>
                    currentId === id
                        ? null
                        : id
            );
        };

        return (
            <section className="progress">

                {/* ==========================================
                HEADER
            ========================================== */}

                <div className="progress-header">
                    <div>
                        <h2>
                            Union Progress
                        </h2>
                        <p>
                            Track the progress of Union
                            across all repositories and
                            project requirements.
                        </p>
                    </div>

                    <strong className="progress-percentage">
                        {repositoryProgress}%
                    </strong>
                </div>

                {/* ==========================================
                PROGRESS BAR
            ========================================== */}

                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{
                            width: `${repositoryProgress}%`,
                        }}
                    />
                </div>

                {/* ==========================================
                LABEL FILTERS
            ========================================== */}

                <div className="repository-filters">

                    <button
                        type="button"
                        className={
                            labelId === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() => {
                            setLabelId("all");
                            setRequirementId(null);
                        }}
                    >
                        All
                    </button>

                    {requirementLabels.map(
                        (label) => (
                            <button
                                key={label.id ?? label.name}
                                type="button"
                                className={
                                    labelId ===
                                        label.name
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleLabelClick(
                                        label.name
                                    )
                                }
                            >
                                {label.name}
                            </button>
                        )
                    )}

                </div>

                {/* ==========================================
                STATISTICS
            ========================================== */}

                <div className="progress-stats">

                    <div className="progress-stat">
                        <strong>
                            {completedTodos}
                        </strong>

                        <span>
                            Completed
                        </span>
                    </div>

                    <div className="progress-stat">
                        <strong>
                            {inProgressTodos}
                        </strong>

                        <span>
                            In Progress
                        </span>
                    </div>

                    <div className="progress-stat">
                        <strong>
                            {remainingTodos}
                        </strong>

                        <span>
                            Remaining
                        </span>
                    </div>

                    <div className="progress-stat">
                        <strong>
                            {filteredTodos.length}
                        </strong>

                        <span>
                            Total Todos
                        </span>
                    </div>

                </div>

                {/* ==========================================
                REQUIREMENTS
            ========================================== */}

                <div className="requirement-list">

                    {filteredRequirements.map(
                        (requirement) => {

                            const id =
                                String(
                                    requirement.number
                                );

                            const expanded =
                                requirementId === id;

                            return (
                                <div
                                    key={id}
                                    className="requirement"
                                >

                                    {/* Requirement header */}

                                    <button
                                        type="button"
                                        className="requirement-header"
                                        onClick={() =>
                                            handleShowTodos(
                                                id
                                            )
                                        }
                                    >

                                        <div className="requirement-title">

                                            <span className="requirement-number">
                                                #
                                                {
                                                    requirement.number
                                                }
                                            </span>

                                            <h3>
                                                {
                                                    requirement.title
                                                }
                                            </h3>

                                        </div>

                                        <div className="requirement-meta">
                                            {requirement.labels?.length >
                                                0 && (
                                                    <div className="requirement-labels">

                                                        {requirement.labels.map(
                                                            (label) => (
                                                                <span
                                                                    key={
                                                                        label.name
                                                                    }
                                                                    className="requirement-label"
                                                                >
                                                                    {
                                                                        label.name
                                                                    }
                                                                </span>
                                                            )
                                                        )}

                                                    </div>
                                                )}

                                            {/* <span>
                                                {
                                                    requirement.status
                                                }
                                            </span>

                                            <span>
                                                {
                                                    requirement.progress
                                                }%
                                            </span> */}

                                            {/* <span>
                                                {
                                                    expanded
                                                        ? "−"
                                                        : "+"
                                                }
                                            </span> */}

                                        </div>

                                    </button>

                                    {/* Requirement progress */}

                                    <div className="requirement-progress">

                                        <div className="progress-bar">
                                            <div
                                                className="progress-bar-fill"
                                                style={{
                                                    width: `${requirement.progress}%`,
                                                }}
                                            />
                                        </div>

                                        <span>
                                            {
                                                requirement.completed
                                            }{" "}
                                            /{" "}
                                            {
                                                requirement.total
                                            }{" "}
                                            completed
                                        </span>

                                    </div>

                                    {/* Requirement labels */}

                                    {/* {requirement.labels?.length >
                                    0 && (
                                    <div className="requirement-labels">

                                        {requirement.labels.map(
                                            (label) => (
                                                <span
                                                    key={
                                                        label.name
                                                    }
                                                    className="requirement-label"
                                                >
                                                    {
                                                        label.name
                                                    }
                                                </span>
                                            )
                                        )}

                                    </div>
                                )} */}

                                    {/* ==================================
                                    TODO LIST
                                ================================== */}

                                    {expanded && (
                                        <div className="requirement-todos">

                                            {requirement.todos?.length ===
                                                0 ? (
                                                <p>
                                                    No todos yet.
                                                </p>
                                            ) : (
                                                requirement.todos?.map(
                                                    (todo) => (
                                                        <div
                                                            key={
                                                                todo.number
                                                            }
                                                            className="requirement-todo"
                                                        >

                                                            <div>
                                                                <span className="todo-number">
                                                                    #
                                                                    {
                                                                        todo.number
                                                                    }
                                                                </span>

                                                                <span className="todo-title">
                                                                    {
                                                                        todo.title
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="todo-meta">

                                                                {todo.labels?.map(
                                                                    (
                                                                        label
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                label.name
                                                                            }
                                                                            className="todo-label"
                                                                        >
                                                                            {
                                                                                label.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}

                                                                <span
                                                                    className={`todo-status todo-status-${todo.status
                                                                        ?.toLowerCase()
                                                                        .replace(
                                                                            /\s+/g,
                                                                            "-"
                                                                        )}`}
                                                                >
                                                                    {
                                                                        todo.status
                                                                    }
                                                                </span>

                                                            </div>

                                                        </div>
                                                    )
                                                )
                                            )}

                                        </div>
                                    )}

                                </div>
                            );
                        }
                    )}

                </div>

                {/* ==========================================
                TIMELINE
            ========================================== */}

                <div className="progress-gantt">

                    <h3>
                        Timeline
                    </h3>

                    <div className="gantt-placeholder">
                        <GanttChart requirements={requirements} />
                        {/* GanttChart can go here */}
                    </div>

                </div>

            </section>
        );
    };

export default ProgressOverview;