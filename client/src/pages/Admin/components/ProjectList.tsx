// import React from "react";
// import type { GithubProject } from "../../../Projects/union/Union";

// interface ProjectListProps {
//     projects: GithubProject[];
//     selectedProject: GithubProject | null;

//     onManage: (project: GithubProject) => void;
//     onEdit: (project: GithubProject) => void;
//     onDelete: (id: string) => void;
// }

// const ProjectList: React.FC<ProjectListProps> = ({
//     projects,
//     selectedProject,
//     onManage,
//     onEdit,
//     onDelete,
// }) => {
//     if (projects.length === 0) {
//         return (
//             <div className="admin-empty-state">
//                 <p>No projects found.</p>
//             </div>
//         );
//     }

//     // return (
//     //     <div className="project-list">
//     //         {projects.map((project) => (
//     //             <article
//     //                 key={project.number}
//     //                 className={`project-admin-card ${
//     //                     selectedProject?.number === project.number
//     //                         ? "active"
//     //                         : ""
//     //                 }`}
//     //             >
//     //                 <div className="project-admin-info">
//     //                     <h3>{project.name}</h3>

//     //                     {project. && (
//     //                         <p>{project.description}</p>
//     //                     )}

//     //                     <div className="project-meta">
//     //                         {project.type && (
//     //                             <span>{project.type}</span>
//     //                         )}

//     //                         {project.status && (
//     //                             <span>{project.status}</span>
//     //                         )}

//     //                         {/* {project.featured && (
//     //                             <span>Featured</span>
//     //                         )} */}
//     //                     </div>

//     //                     {project.techUsed?.length > 0 && (
//     //                         <div className="project-tech">
//     //                             {project.techUsed.map(
//     //                                 (technology) => (
//     //                                     <span
//     //                                         key={technology}
//     //                                     >
//     //                                         {technology}
//     //                                     </span>
//     //                                 )
//     //                             )}
//     //                         </div>
//     //                     )}
//     //                 </div>

//     //                 <div className="project-admin-actions">
//     //                     <button
//     //                         type="button"
//     //                         onClick={() =>
//     //                             onManage(project)
//     //                         }
//     //                     >
//     //                         Manage
//     //                     </button>

//     //                     <button
//     //                         type="button"
//     //                         onClick={() =>
//     //                             onEdit(project)
//     //                         }
//     //                     >
//     //                         Edit
//     //                     </button>

//     //                     <button
//     //                         type="button"
//     //                         onClick={() => {
//     //                             if (project.number) {
//     //                                 onDelete(project.number);
//     //                             }
//     //                         }}
//     //                     >
//     //                         Delete
//     //                     </button>
//     //                 </div>
//     //             </article>
//     //         ))}
//     //     </div>
//     // );
// };

// export default ProjectList;