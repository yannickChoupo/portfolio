// import React from "react";
// import type {
//     Requirement,
//     Todo,
// } from "../../pages/Admin/types/admin.types";

// type RequirementListProps = {
//     requirements: Requirement[];
//     repository: "all" | Repository;
//     onRequirementclick: (requirementId: string) => void;
//     openRequirementId: string
// };

// const calculateProgress = (todos: Todo[]) => {
//     if (todos.length === 0) return 0;

//     const completed = todos.filter(
//         (todo) => todo.status === "DONE"
//     ).length;

//     return Math.round((completed / todos.length) * 100);
// };

// const RequirementList: React.FC<RequirementListProps> = ({
//     requirements,
//     repository,
//     onRequirementclick,
//     openRequirementId
// }) => {
//     const filteredRequirements = requirements
//         .map((requirement) => {
//             if (repository === "all") {
//                 return requirement;
//             }

//             const isRepositoryRequirement =
//                 requirement.scope === repository.name.toUpperCase();

//             const isOverallRequirement =
//                 requirement.scope === "BACKEND" || requirement.scope === "FRONTEND" || requirement.scope === "DEVICE";

//             if (!isRepositoryRequirement && !isOverallRequirement) {
//                 return null;
//             }

//             const repositoryTodos = (requirement.todos ?? []).filter(
//                 (todo) =>
//                     "repositoryId" in todo &&
//                     String(todo.repositoryId) === String(repository.id)
//             );

//             return {
//                 ...requirement,
//                 todos: repositoryTodos,
//             };
//         })
//         .filter(
//             (requirement): requirement is Requirement =>
//                 requirement !== null
//         );

//     return (
//         <div className="requirement-list">
//             {filteredRequirements.map((requirement) => {
//                 const todos = requirement.todos ?? [];
//                 const progress = calculateProgress(todos);

//                 if (!requirement._id) {
//                     return null;
//                 }

//                 const isOpen =
//                     openRequirementId === requirement._id;

//                 return (
//                     <article
//                         key={requirement._id}
//                         className="requirement-card"
//                     >
//                         <div className="requirement-header"
//                             onClick={() =>
//                                 onRequirementclick(requirement._id!)
//                             }
//                         >
//                             <div>
//                                 <span className="requirement-scope">
//                                     {requirement.scope?.toLowerCase() ||
//                                         "requirement"}
//                                 </span>

//                                 <h3>{requirement.title}</h3>

//                                 {requirement.description && (
//                                     <p>{requirement.description}</p>
//                                 )}
//                             </div>

//                             <strong>{progress}%</strong>
//                         </div>

//                         <div className="requirement-progress">
//                             <div
//                                 className="requirement-progress-fill"
//                                 style={{
//                                     width: `${progress}%`,
//                                 }}
//                             />
//                         </div>

//                         {isOpen && (
//                             <div className="requirement-todos">
//                                 {todos.length === 0 ? (
//                                     <p className="no-todos">
//                                         No todos for this repository.
//                                     </p>
//                                 ) : (
//                                     todos.map((todo) => (
//                                         <div
//                                             key={`${requirement._id}-${todo._id ?? `${todo.order}-${todo.title}`}`}
//                                             className="requirement-todo"
//                                         >
//                                             <span
//                                                 className={`todo-icon ${todo.status.toLowerCase()}`}
//                                             >
//                                                 {todo.status === "DONE"
//                                                     ? "✓"
//                                                     : todo.status ===
//                                                         "IN_PROGRESS"
//                                                         ? "•"
//                                                         : "○"}
//                                             </span>

//                                             <span>{todo.title}</span>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         )}
//                     </article>
//                 );
//             })}
//         </div>
//     );
// };

// export default RequirementList;