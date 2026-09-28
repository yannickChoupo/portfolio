import React from "react";
import type { ProjectRequirement } from "../../../Projects/union/Union";

interface RequirementListProps {
    requirements: ProjectRequirement[];

    expandedRequirementIds: string[];

    onToggleRequirement: (
        requirementId: string
    ) => void;
}

const RequirementList: React.FC<
    RequirementListProps
> = ({
    requirements,
    expandedRequirementIds,
    onToggleRequirement,
}) => {
    return (
        <div className="requirement-list">
            {requirements.map((requirement) => {
                const requirementId =
                    String(requirement.number);

                const expanded =
                    expandedRequirementIds.includes(
                        requirementId
                    );

                return (
                    <div
                        key={requirementId}
                        className="requirement-card"
                    >
                        {/* Requirement header */}
                        <button
                            type="button"
                            className="requirement-header"
                            onClick={() =>
                                onToggleRequirement(
                                    requirementId
                                )
                            }
                        >
                            <div>
                                <span className="requirement-number">
                                    #{requirement.number}
                                </span>

                                <h3>
                                    {requirement.title}
                                </h3>
                            </div>

                            <div className="requirement-meta">
                                <span>
                                    {
                                        requirement.status
                                    }
                                </span>

                                <span>
                                    {
                                        requirement.progress
                                    }%
                                </span>

                                <span>
                                    {expanded
                                        ? "−"
                                        : "+"}
                                </span>
                            </div>
                        </button>

                        {/* Progress */}
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

                        {/* Labels */}
                        {/* {requirement.labels &&
                            requirement.labels.length > 0 && (
                                <div className="requirement-labels">
                                    {requirement.labels.map(
                                        (label: any) => (
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

                        {/* Todos */}
                        {expanded && (
                            <div className="requirement-todos">
                                {(
                                    requirement.todos ??
                                    []
                                ).length ===
                                0 ? (
                                    <p>
                                        No todos
                                        yet.
                                    </p>
                                ) : (
                                    requirement.todos?.map(
                                        (todo: any) => (
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
                                                    {todo.labels &&
                                                        todo
                                                            .labels
                                                            .map(
                                                                (
                                                                    label: any
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
                                                                /_/g,
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
            })}
        </div>
    );
};

export default RequirementList;