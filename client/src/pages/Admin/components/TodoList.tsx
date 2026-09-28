import React from "react";

import type { Todo } from "../types/admin.types";

interface TodoListProps {
    todos: Todo[];

    onEdit?: (todo: Todo) => void;

    onDelete?: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    onEdit,
    onDelete,
}) => {
    return (
        <ul className="requirement-todo-list">
            {todos
                .slice()
                .sort(
                    (a, b) =>
                        a.order - b.order
                )
                .map((todo) => (
                    <li
                        key={
                            todo._id ||
                            `${todo.order}-${todo.title}`
                        }
                        className={`todo-admin-item status-${todo.status.toLowerCase()}`}
                    >
                        <div className="todo-admin-info">

                            <span className="todo-status">
                                {todo.status}
                            </span>

                            <strong>
                                {todo.title}
                            </strong>

                            {todo.description && (
                                <p>
                                    {
                                        todo.description
                                    }
                                </p>
                            )}

                        </div>

                        {(onEdit || onDelete) && (
                            <div className="todo-admin-actions">

                                {onEdit && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEdit(
                                                todo
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                )}

                                {onDelete &&
                                    todo._id && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete(
                                                    todo._id!
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    )}

                            </div>
                        )}
                    </li>
                ))}
        </ul>
    );
};

export default TodoList;