import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import AXIOS from "../redux/services/axios";
import Todo from "../Components/todo";

interface TodoItem {
    id: string;
    name: string;
    description: string;
}

interface AdminProps {
    user?: any;
}

interface Message {
    _id: string;
    text: string;
    createdAt?: string;
}

interface Project {
    _id: string;
    name: string;
    slug: string;
    type: "frontend" | "backend" | "fullstack" | "visualization";
    status: "available" | "unavailable" | "draft";
    description: string;
    techUsed: string[];
    featured: boolean;
    order: number;
}

const emptyProject = {
    name: "",
    slug: "",
    type: "frontend" as Project["type"],
    status: "draft" as Project["status"],
    description: "",
    techUsed: "",
    featured: false,
    order: 0
};

const Admin: React.FC<AdminProps> = () => {
    const [_messages, setMessages] = useState<Message[]>([]);
    const [visitors, setVisitors] = useState<any[]>([]);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    const [isEditingTodo, setEditingTodo] = useState<boolean>(false);
    const [isEditingProject, setEditingProject] = useState<boolean>(false);

    const [newTodoName, setNewTodoName] = useState<string>("");
    const [newTodoDescription, setNewTodoDescription] = useState<string>("");

    const [projectForm, setProjectForm] = useState(emptyProject);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

    const getTodos = async (): Promise<void> => {
        try {
            const response = await AXIOS.get("/todo/getTodos");

            setTodos(response.data.todos || []);
        } catch (error) {
            console.error("Failed to load todos:", error);
        }
    };

    const getMessages = async (): Promise<void> => {
        try {
            const response = await AXIOS.get("/contact/all");
            
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error("Failed to load messages:", error);
        }
    };

    const getVisitorsCount = async (): Promise<void> => {
        try {
            const response = await AXIOS.get("/visitor/stats");
            setVisitors(response.data.uniqueVisitors || []);
        } catch (error) {
            console.error("Failed to load visitor stats:", error);
        }
    };

    const getProjects = async (): Promise<void> => {
        try {
            const response = await AXIOS.get("/projects");

            setProjects(response.data.projects || []);
        } catch (error) {
            console.error("Failed to load projects:", error);
        }
    };

    useEffect(() => {
        getTodos();
        getMessages();
        getVisitorsCount();
        getProjects();
    }, []);

    const activeTodoEditView = (): void => {
        setEditingTodo(true);
    };

    const desactiveTodoEditView = (): void => {
        setEditingTodo(false);
    };

    const handleTodoSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!newTodoName || !newTodoDescription) {
            return;
        }

        try {
            await AXIOS.post("/todo/storeTodo", {
                name: newTodoName,
                description: newTodoDescription
            });

            await getTodos();

            setNewTodoName("");
            setNewTodoDescription("");
            desactiveTodoEditView();

        } catch (error) {
            console.error("Failed to create todo:", error);
        }
    };

    const deleteTask = async (id: string): Promise<void> => {
        try {
            await AXIOS.post("/todo/removeTodo", {
                id
            });

            await getTodos();

        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    /*
     * Project actions
     */

    const handleProjectChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {

        const { name, value } = e.target;

        setProjectForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const openCreateProject = (): void => {
        setEditingProjectId(null);
        setProjectForm(emptyProject);
        setEditingProject(true);
    };

    const openEditProject = (project: Project): void => {
        setEditingProjectId(project._id);

        setProjectForm({
            name: project.name,
            slug: project.slug,
            type: project.type,
            status: project.status,
            description: project.description,
            techUsed: project.techUsed.join(", "),
            featured: project.featured,
            order: project.order
        });

        setEditingProject(true);
    };

    const cancelProjectEdit = (): void => {
        setEditingProject(false);
        setEditingProjectId(null);
        setProjectForm(emptyProject);
    };

    const handleProjectSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {

        e.preventDefault();

        const payload = {
            name: projectForm.name,
            slug: projectForm.slug,
            type: projectForm.type,
            status: projectForm.status,
            description: projectForm.description,

            techUsed: projectForm.techUsed
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean),

            featured: projectForm.featured,
            order: Number(projectForm.order)
        };

        try {

            if (editingProjectId) {

                await AXIOS.put(
                    `/projects/${editingProjectId}`,
                    payload
                );

            } else {

                await AXIOS.post(
                    "/projects",
                    payload
                );
            }

            await getProjects();

            cancelProjectEdit();

        } catch (error) {
            console.error("Failed to save project:", error);
        }
    };

    const deleteProject = async (
        id: string
    ): Promise<void> => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await AXIOS.delete(`/projects/${id}`);

            await getProjects();

        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div id="admin" className="page">

            <div className="page-container">

                <header className="admin-header">
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage your portfolio content and monitor
                        application activity.
                    </p>
                </header>

                {/* Summary */}

                <section id="summary">
                    <h2>Overview</h2>
                    <div className="admin-summary">
                        <div className="summary-card">
                            <strong>{projects.length}</strong>
                            <span>Projects</span>
                        </div>

                        <div className="summary-card">
                            <strong>{visitors}</strong>
                            <span>Visits</span>
                        </div>
                        <div className="summary-card">
                            <strong>{todos.length}</strong>
                            <span>Todos</span>
                        </div>

                    </div>

                </section>

                {/* Projects */}

                <section id="projects-admin">

                    <div className="admin-section-header">

                        <div>
                            <h2>Projects</h2>

                            <p>
                                Manage the projects displayed on
                                your portfolio.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openCreateProject}
                        >
                            Add Project
                        </button>

                    </div>

                    <CSSTransition
                        timeout={300}
                        classNames="edit"
                        in={isEditingProject}
                        unmountOnExit
                    >
                        <form
                            className="project-form"
                            onSubmit={handleProjectSubmit}
                        >

                            <h3>
                                {editingProjectId
                                    ? "Edit Project"
                                    : "Create Project"}
                            </h3>

                            <div className="form-group">

                                <label htmlFor="projectName">
                                    Name
                                </label>

                                <input
                                    id="projectName"
                                    name="name"
                                    type="text"
                                    value={projectForm.name}
                                    onChange={handleProjectChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectSlug">
                                    Slug
                                </label>

                                <input
                                    id="projectSlug"
                                    name="slug"
                                    type="text"
                                    value={projectForm.slug}
                                    onChange={handleProjectChange}
                                    placeholder="my-project"
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectType">
                                    Type
                                </label>

                                <select
                                    id="projectType"
                                    name="type"
                                    value={projectForm.type}
                                    onChange={handleProjectChange}
                                >
                                    <option value="frontend">
                                        Frontend
                                    </option>

                                    <option value="backend">
                                        Backend
                                    </option>

                                    <option value="fullstack">
                                        Full Stack
                                    </option>

                                    <option value="visualization">
                                        Visualization
                                    </option>
                                </select>

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectStatus">
                                    Status
                                </label>

                                <select
                                    id="projectStatus"
                                    name="status"
                                    value={projectForm.status}
                                    onChange={handleProjectChange}
                                >
                                    <option value="draft">
                                        Draft
                                    </option>

                                    <option value="available">
                                        Available
                                    </option>

                                    <option value="unavailable">
                                        Unavailable
                                    </option>
                                </select>

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectDescription">
                                    Description
                                </label>

                                <textarea
                                    id="projectDescription"
                                    name="description"
                                    value={projectForm.description}
                                    onChange={handleProjectChange}
                                    rows={4}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectTech">
                                    Technologies
                                </label>

                                <input
                                    id="projectTech"
                                    name="techUsed"
                                    type="text"
                                    value={projectForm.techUsed}
                                    onChange={handleProjectChange}
                                    placeholder="React, TypeScript, Express, MongoDB"
                                />

                                <small>
                                    Separate technologies with commas.
                                </small>

                            </div>

                            <div className="form-group">

                                <label htmlFor="projectOrder">
                                    Display order
                                </label>

                                <input
                                    id="projectOrder"
                                    name="order"
                                    type="number"
                                    value={projectForm.order}
                                    onChange={handleProjectChange}
                                />

                            </div>

                            <div className="form-group checkbox">

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={projectForm.featured}
                                        onChange={(e) =>
                                            setProjectForm(
                                                (previous) => ({
                                                    ...previous,
                                                    featured:
                                                        e.target.checked
                                                })
                                            )
                                        }
                                    />

                                    Featured project
                                </label>

                            </div>

                            <div className="btn-group">

                                <button
                                    type="button"
                                    onClick={cancelProjectEdit}
                                >
                                    Cancel
                                </button>

                                <button type="submit">
                                    {editingProjectId
                                        ? "Update Project"
                                        : "Create Project"}
                                </button>

                            </div>

                        </form>
                    </CSSTransition>

                    {/* Project list */}

                    <div className="project-list">

                        {projects.length === 0 ? (

                            <p>
                                No projects found.
                            </p>

                        ) : (

                            projects.map((project) => (

                                <article
                                    className="project-admin-card"
                                    key={project._id}
                                >

                                    <div className="project-admin-info">

                                        <h3>
                                            {project.name}
                                        </h3>

                                        <p>
                                            {project.description}
                                        </p>

                                        <div className="project-meta">

                                            <span>
                                                {project.type}
                                            </span>

                                            <span>
                                                {project.status}
                                            </span>

                                            {project.featured && (
                                                <span>
                                                    Featured
                                                </span>
                                            )}

                                        </div>

                                        <div className="project-tech">

                                            {project.techUsed.map(
                                                (technology) => (
                                                    <span
                                                        key={technology}
                                                    >
                                                        {technology}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    </div>

                                    <div className="project-admin-actions">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditProject(project)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteProject(
                                                    project._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </article>

                            ))
                        )}

                    </div>

                </section>

                {/* Todos */}

                <section id="todos">
                    <div className="admin-section-header">
                        <h2>Todos</h2>
                        <button
                            type="button"
                            onClick={activeTodoEditView}
                        >
                            Add
                        </button>

                    </div>

                    <CSSTransition
                        timeout={500}
                        classNames="edit"
                        in={isEditingTodo}
                        unmountOnExit
                    >
                        <form
                            className="form"
                            onSubmit={handleTodoSubmit}
                        >

                            <div className="form-group">

                                <label htmlFor="taskName">
                                    Name
                                </label>

                                <input
                                    id="taskName"
                                    type="text"
                                    value={newTodoName}
                                    onChange={(e) =>
                                        setNewTodoName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="taskDescription">
                                    Description
                                </label>

                                <input
                                    id="taskDescription"
                                    type="text"
                                    value={newTodoDescription}
                                    onChange={(e) =>
                                        setNewTodoDescription(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="btn-group">

                                <button
                                    type="button"
                                    onClick={desactiveTodoEditView}
                                >
                                    Cancel
                                </button>

                                <button type="submit">
                                    Save
                                </button>

                            </div>

                        </form>
                    </CSSTransition>

                    <div className="todoList">

                        <ul>

                            {todos.map((todo) => (
                                <Todo
                                    todo={todo}
                                    key={todo.id}
                                    deleteTask={deleteTask}
                                />
                            ))}

                        </ul>

                    </div>

                </section>

            </div>

        </div>
    );
};

export default Admin;
