import type { Todo } from "../types/admin.types";

export const calculateProgress = (todos: Todo[]): number => {
    if (todos.length === 0) {
        return 0;
    }

    const completed = todos.filter(
        (todo) => todo.status === "DONE"
    ).length;

    return Math.round(
        (completed / todos.length) * 100
    );
};