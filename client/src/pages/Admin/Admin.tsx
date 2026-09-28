import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOverview from "./components/AdminOverview";
import type { AppDispatch, RootState } from "../../redux/store";
import {
    fetchProjects,
    refreshGithubProjects
} from "../../redux/actions/projectActions";
import { calculateProgress } from "./utils/progess";
import type { GithubProject } from "../../Projects/union/Union";

const Admin: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const projects: GithubProject[] = useSelector(
        (state: RootState) => state.projects.projects
    );

    const projectsLoading = useSelector(
        (state: RootState) => state.projects.loading
    );

    const requirements = useSelector(
        (state: RootState) => state.requirements.requirements
    );

    const requirementsLoading = useSelector(
        (state: RootState) => state.requirements.loading
    );

    const visitors = useSelector(
        (state: RootState) => state.visitors
    );

    const [selectedProject, setSelectedProject] =
        useState<GithubProject | null>(null);

    const [isEditingProject, setIsEditingProject] =
        useState(false);

    const [isCreatingProject, setIsCreatingProject] =
        useState(false);
    const [githubRefreshMessage, setGithubRefreshMessage] =
        useState<string | null>(null);


    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const projectTodos = useMemo(
        () =>
            requirements.flatMap(
                (requirement) =>
                    requirement.todos ?? []
            ),
        [requirements]
    );

    const projectProgress = calculateProgress(projectTodos);

    const handleGithubRefresh = async () => {
        const adminKey = window.prompt(
            "Enter the admin refresh key"
        );

        if (!adminKey) {
            return;
        }

        setGithubRefreshMessage(null);

        try {
            await dispatch(refreshGithubProjects(adminKey));
            setGithubRefreshMessage(
                "GitHub projects refreshed successfully."
            );
        } catch {
            setGithubRefreshMessage(
                "Refresh failed. Check the admin key and server logs."
            );
        }
    };

    const handleCreateProject = () => {
        setIsCreatingProject(true);
        setIsEditingProject(false);
    };

    const closeProjectForm = () => {
        setIsCreatingProject(false);
        setIsEditingProject(false);
    };

    const isLoading =
        projectsLoading ||
        requirementsLoading;

        return (
        <main
            id="admin"
            className="page admin-page">
            <header className="admin-header">
                <div>
                    <span className="admin-eyebrow">
                        Portfolio Management
                    </span>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage your portfolio
                        projects, requirements
                        and development tasks.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-primary-button"
                    onClick={
                        handleCreateProject
                    }
                >
                    + Add Project
                </button>
            </header>

            {isLoading && (
                <div className="admin-loading">
                    Loading dashboard...
                </div>
            )}

            {/* =========================================
                OVERVIEW
            ========================================= */}

            <AdminOverview
                projects={projects.length}
                requirements={requirements.length}
                todos={projectTodos.length}
                progress={
                    projectProgress
                }
                visits={
                    visitors.visits ?? 0
                }
                uniqueVisitors={
                    visitors.uniqueVisitors ?? 0
                }
            />

            {/* =========================================
                PROJECTS
            ========================================= */}

            <section
                id="projects-admin"
                className="admin-section"
            >
                <div className="admin-section-header">
                    <div>
                        <span className="admin-eyebrow">
                            Portfolio
                        </span>

                        <h2>
                            Projects
                        </h2>

                        <p>
                            Manage your portfolio
                            projects and their
                            development structure.
                        </p>
                    </div>

                    <div>
                        <button
                            type="button"
                            className="admin-secondary-button"
                            onClick={handleGithubRefresh}
                            disabled={projectsLoading}
                        >
                            {projectsLoading
                                ? "Refreshing..."
                                : "Refresh GitHub"}
                        </button>

                        <button
                            type="button"
                            className="admin-secondary-button"
                            onClick={handleCreateProject}
                        >
                            Add Project
                        </button>
                    </div>
                </div>

                {githubRefreshMessage && (
                    <p role="status">
                        {githubRefreshMessage}
                    </p>
                )}

                {/* {projects.length === 0 &&
                    !projectsLoading ? (
                    <div className="admin-empty-state">
                        <h3>
                            No projects yet
                        </h3>

                        <p>
                            Create your first
                            portfolio project
                            to get started.
                        </p>

                        <button
                            type="button"
                            onClick={
                                handleCreateProject
                            }
                        >
                            Create Project
                        </button>
                    </div>
                ) : (
                    <ProjectList
                        projects={projects}
                        selectedProject={
                            selectedProject
                        }
                        onManage={
                            openProjectManager
                        }
                        onEdit={
                            handleEditProject
                        }
                        onDelete={
                            handleDeleteProject
                        }
                    />
                )} */}
            </section>

            {/* =========================================
                PROJECT FORM
            ========================================= */}

            {(isCreatingProject ||
                isEditingProject) && (
                    <section
                        id="project-form"
                        className="admin-section project-form-section"
                    >
                        <div className="admin-section-header">
                            <div>
                                <span className="admin-eyebrow">
                                    {isEditingProject
                                        ? "Edit"
                                        : "Create"}
                                </span>

                                <h2>
                                    {isEditingProject
                                        ? "Edit Project"
                                        : "New Project"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeProjectForm
                                }
                            >
                                Cancel
                            </button>
                        </div>

                        {/* 
                     * ProjectForm can be placed here.
                     *
                     * Example:
                     *
                     * <ProjectForm
                     *     project={projectForm}
                     *     isEditing={
                     *         isEditingProject
                     *     }
                     *     onChange={
                     *         setProjectForm
                     *     }
                     *     onClose={
                     *         closeProjectForm
                     *     }
                     * />
                     */}
                    </section>
                )}

            {/* =========================================
                PROJECT MANAGER
            ========================================= */}

            {selectedProject && (
                <section
                    id="project-manager"
                    className="project-manager admin-section"
                >
                    <div className="admin-section-header">
                        <div>
                            <span className="admin-eyebrow">
                                Project Manager
                            </span>

                            <h2>
                                {
                                    selectedProject.title
                                }
                            </h2>

                            <p>
                                Requirements and
                                development
                                tasks for this
                                project.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setSelectedProject(
                                    null
                                )
                            }
                        >
                            Close
                        </button>
                    </div>

                    {/* <ProjectManager
                        project={
                            selectedProject
                        }
                        requirements={
                            requirements
                        }
                        todos={
                            projectTodos
                        }
                        completedTodos={
                            completedTodos
                        }
                        completedRequirements={
                            completedRequirements
                        }
                        progress={
                            projectProgress
                        }
                        expandedRequirementIds={
                            expandedRequirementIds
                        }
                        onToggleRequirement={
                            toggleRequirement
                        }
                    /> */}
                </section>
            )}
        </main>
    );
};

export default Admin;