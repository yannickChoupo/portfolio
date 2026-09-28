// import React from "react";

// import type {
//     Requirement,
//     Todo,
// } from "../types/admin.types";
// import RequirementList from "./RequirementList";

// interface ProjectManagerProps {
//     project: Project;
//     requirements: Requirement[];
//     todos: Todo[];
//     completedTodos: number;
//     completedRequirements: number;
//     progress: number;
//     expandedRequirementIds: string[];
//     onToggleRequirement: (
//         requirementId: string
//     ) => void;
// }

// const ProjectManager: React.FC<
//     ProjectManagerProps
// > = ({
//     project,
//     requirements,
//     todos,
//     completedTodos,
//     completedRequirements,
//     progress,
//     expandedRequirementIds,
//     onToggleRequirement,
// }) => {
//     return (
//         <div className="project-manager-content">
//             {/* Project information */}

//             <div className="project-manager-header">
//                 <div>
//                     <span className="admin-eyebrow">
//                         Project
//                     </span>

//                     <h3>
//                         {project.title}
//                     </h3>

//                     {project.description && (
//                         <p>
//                             {
//                                 project.description
//                             }
//                         </p>
//                     )}
//                 </div>

//                 <div className="project-manager-status">
//                     <span>
//                         {project.status}
//                     </span>
//                 </div>
//             </div>

//             {/* Progress */}

//             <div className="project-progress">
//                 <div className="project-progress-header">
//                     <div>
//                         <strong>
//                             Project Progress
//                         </strong>

//                         <span>
//                             {completedTodos}{" "}
//                             / {todos.length}{" "}
//                             tasks completed
//                         </span>
//                     </div>

//                     <strong>
//                         {progress}%
//                     </strong>
//                 </div>

//                 <div
//                     className="progress-bar"
//                     role="progressbar"
//                     aria-valuenow={
//                         progress
//                     }
//                     aria-valuemin={0}
//                     aria-valuemax={100}
//                 >
//                     <div
//                         className="progress-bar-fill"
//                         style={{
//                             width: `${progress}%`,
//                         }}
//                     />
//                 </div>
//             </div>

//             {/* Requirement statistics */}

//             <div className="requirement-summary">
//                 <div>
//                     <strong>
//                         {
//                             requirements.length
//                         }
//                     </strong>

//                     <span>
//                         Requirements
//                     </span>
//                 </div>

//                 <div>
//                     <strong>
//                         {
//                             completedRequirements
//                         }
//                     </strong>

//                     <span>
//                         Completed
//                     </span>
//                 </div>

//                 <div>
//                     <strong>
//                         {todos.length}
//                     </strong>

//                     <span>
//                         Tasks
//                     </span>
//                 </div>
//             </div>

//             {/* Requirements */}

//             <div className="project-requirements">
//                 <div className="admin-section-header">
//                     <div>
//                         <span className="admin-eyebrow">
//                             Development
//                         </span>

//                         <h3>
//                             Requirements
//                         </h3>

//                         <p>
//                             Organize the
//                             development
//                             requirements and
//                             tasks for this
//                             project.
//                         </p>
//                     </div>
//                 </div>

//                 {requirements.length ===
//                 0 ? (
//                     <div className="admin-empty-state">
//                         <h4>
//                             No requirements
//                         </h4>

//                         <p>
//                             This project
//                             doesn't have
//                             any requirements
//                             yet.
//                         </p>
//                     </div>
//                 ) : (
//                     <RequirementList
//                         requirements={
//                             requirements
//                         }
//                         expandedRequirementIds={
//                             expandedRequirementIds
//                         }
//                         onToggleRequirement={
//                             onToggleRequirement
//                         }
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProjectManager;