// export type ProjectType =
//     | "frontend"
//     | "backend"
//     | "fullstack"
//     | "visualization";

// export type ProjectStatus =
//     | "available"
//     | "unavailable"
//     | "draft";

// export type RequirementScope =
//     | "BACKEND"
//     | "FRONTEND"
//     | "DEVICE"
//     | "INFRASTRUCTURE";

// export type ItemStatus =
//     | "TODO"
//     | "IN_PROGRESS"
//     | "DONE";

// export interface Todo {
//     _id: string;
//     requirementId: string;
//     name: string;
//     description: string;
//     status: ItemStatus;
//     order: number;
// }

// export interface Requirement {
//     _id: string;
//     projectId: string;
//     name: string;
//     description: string;
//     scope: RequirementScope;
//     status: ItemStatus;
//     order: number;
//     todos: Todo[];
// }

// export interface VisitorStats {
//     uniqueVisitors: number;
//     visits: number;
// }

// export interface Message {
//     _id: string;
//     text: string;
//     createdAt?: string;
// }
export type ProjectType =
    | "frontend"
    | "backend"
    | "fullstack"
    | "visualization";

export type ProjectStatus =
    | "PLANNING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "ARCHIVED";

export type RequirementScope =
    | "FRONTEND"
    | "BACKEND"
    | "DEVICE"

export interface Todo {
    _id?: string;
    title: string;
    description?: string;
    status: ItemStatus;
    order: number;
    requirementId: string;
    repositoryId: RepositoryName;
}

export type RepositoryName =
    | "backend"
    | "frontend"
    | "device";

export interface Requirement {
    _id?: string;
    projectId: string;
    title: string;
    name: string;
    description?: string;
    scope?: RequirementScope;
    status?: ItemStatus;
    order: number;

    todos?: Todo[];
}

export type RequirementLabel = {
    id: string;
    name: string;
    description?: string;
};


// export type ProjectType =
//     | "WEB"
//     | "MOBILE"
//     | "DESKTOP"
//     | "OTHER";

// export type ProjectStatus =
//     | "PLANNING"
//     | "IN_PROGRESS"
//     | "COMPLETED"
//     | "ARCHIVED";

// export interface Project {
//     _id?: string;
//     name: string;
//     slug: string;
//     type: ProjectType;
//     title: string;
//     description: string;
//     status: ProjectStatus;
//     techUsed: string[];
//     order: number;
// }

export type ItemStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

// export interface Todo {
//     _id?: string;
//     title: string;
//     description?: string;
//     status: ItemStatus;
//     order: number;
// }


export interface Message {
    _id?: string;
    name?: string;
    email?: string;
    message?: string;
    createdAt?: string;
}

// export type ProjectTodo = {
//     number: number;
//     title: string;
//     url: string;
//     state: "OPEN" | "CLOSED";
//     status: string;
//     completed: boolean;
// };

// export type ProjectRequirement = {
//     number: number;
//     title: string;
//     url: string;
//     state: "OPEN" | "CLOSED";
//     status: string;
//     progress: number;
//     completed: number;
//     total: number;
//     todos: ProjectTodo[];
// };

// export type GithubProject = {
//     number: number;
//     title: string;
//     url: string;
//     requirements: ProjectRequirement[];
// };