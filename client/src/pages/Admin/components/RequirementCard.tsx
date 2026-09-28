import React from "react";

import type { Requirement } from "../types/admin.types";
import TodoList from "./TodoList";

interface RequirementCardProps {
    requirement: Requirement;
    expanded: boolean;
    onToggle: () => void;

    onEdit?: (requirement: Requirement) => void;
    onDelete?: (id: string) => void;

    onAddTodo?: (
        requirement: Requirement
    ) => void;
}

const RequirementCard: React.FC<RequirementCardProps> = ({
    requirement,
    expanded,
    onToggle,
    onEdit,
    onDelete,
    onAddTodo,
}) => {
    const todos = requirement.todos ?? [];

    const completedTodos = todos.filter(
        (todo) => todo.status === "DONE"
    ).length;

    const progress =
        todos.length > 0
            ? Math.round(
                  (completedTodos / todos.length) * 100
              )
            : 0;

    return (
        <article className="requirement-card">

            <header className="requirement-header">

                <button
                    type="button"
                    className="requirement-toggle"
                    onClick={onToggle}
                    aria-expanded={expanded}
                >
                    <span>
                        {expanded ? "▾" : "▸"}
                    </span>

                    <div>
                        <strong>
                            {requirement.name}
                        </strong>

                        <small>
                            {requirement.scope}
                        </small>
                    </div>
                </button>

                <div className="requirement-actions">

                    <span>
                        {progress}%
                    </span>

                    {onEdit && (
                        <button
                            type="button"
                            onClick={() =>
                                onEdit(requirement)
                            }
                        >
                            Edit
                        </button>
                    )}

                    {onDelete && requirement._id && (
                        <button
                            type="button"
                            onClick={() =>
                                onDelete(
                                    requirement._id!
                                )
                            }
                        >
                            Delete
                        </button>
                    )}

                </div>

            </header>


            <div className="requirement-progress">
                <div
                    className="requirement-progress-bar"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>


            {requirement.description && (
                <p className="requirement-description">
                    {requirement.description}
                </p>
            )}


            {expanded && (
                <div className="requirement-todos">

                    <div className="admin-section-header">

                        <div>
                            <h4>Todos</h4>

                            <p>
                                {completedTodos} of{" "}
                                {todos.length} completed
                            </p>
                        </div>

                        {onAddTodo && (
                            <button
                                type="button"
                                onClick={() =>
                                    onAddTodo(
                                        requirement
                                    )
                                }
                            >
                                Add Todo
                            </button>
                        )}

                    </div>

                    {todos.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>
                                No todos found.
                            </p>
                        </div>
                    ) : (
                        <TodoList
                            todos={todos}
                        />
                    )}

                </div>
            )}

        </article>
    );
};

export default RequirementCard;