import Requirement from "../requirement/requirement.model";
import Todo from "../todo/todo.model";
import Project from "./Project.model";


type GithubMilestone = {
    number: number;
    title: string;
    description: string | null;
    state: "OPEN" | "CLOSED";
    dueOn: string | null;
    url: string;
};

type GithubRepository = {
    name: string;
    nameWithOwner: string;
};


type GithubLabel = {
    name: string;
    color: string;
    description: string | null;
};

type GithubSubIssue = {
    id: string;
    number: number;
    title: string;
    url: string;
    state: "OPEN" | "CLOSED";

    repository: GithubRepository;

    milestone: GithubMilestone | null;

    labels: {
        nodes: GithubLabel[];
    };
};


type GithubProjectItem = {
    id: string;

    content: {
        id: string;
        number: number;
        title: string;
        url: string;
        state: "OPEN" | "CLOSED";

        repository: GithubRepository;

        milestone: GithubMilestone | null;

        labels: {
            nodes: GithubLabel[];
        };

        parent?: {
            number: number;
            title: string;
            url: string;
        } | null;

        subIssues?: {
            nodes: GithubSubIssue[];
        };

        subIssuesSummary?: {
            total: number;
            completed: number;
        };
    } | null;

    fieldValueByName: {
        name: string;
    } | null;
};


type GithubProject = {
    number: number;
    title: string;
    url: string;

    items: {
        nodes: GithubProjectItem[];
    };
};

// async function getGithubProjects() {
//     const token = process.env.GITHUB_PROJECT_TOKEN;

//     if (!token) {
//         throw new Error("GITHUB_PROJECT_TOKEN is not configured");
//     }

//     const query = `
// query {
//     user(login: "yannickChoupo") {
//         projectsV2(first: 10) {
//             nodes {
//                 number
//                 title
//                 url

//                 items(first: 50) {
//                     nodes {
//                         id

//                         content {
//                             ... on Issue {
//                                 id
//                                 number
//                                 title
//                                 url
//                                 state

//                                 labels(first: 5) {
//                                     nodes {
//                                         name
//                                         color
//                                         description
//                                     }
//                                 }

//                                 parent {
//                                     number
//                                     title
//                                     url
//                                 }

//                                 subIssues(first: 20) {
//                                     nodes {
//                                         number
//                                         title
//                                         url
//                                         state

//                                         labels(first: 5) {
//                                             nodes {
//                                                 name
//                                                 color
//                                                 description
//                                             }
//                                         }
//                                     }
//                                 }

//                                 subIssuesSummary {
//                                     total
//                                     completed
//                                 }
//                             }

//                             ... on PullRequest {
//                                 number
//                                 title
//                                 url
//                                 state
//                             }

//                             ... on DraftIssue {
//                                 title
//                                 body
//                             }
//                         }

//                         fieldValueByName(name: "Status") {
//                             ... on ProjectV2ItemFieldSingleSelectValue {
//                                 name
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
// `;

//     const response = await fetch(
//         "https://api.github.com/graphql",
//         {
//             method: "POST",

//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/vnd.github+json",
//                 "Content-Type": "application/json",
//                 "X-GitHub-Api-Version": "2022-11-28",
//             },

//             body: JSON.stringify({ query }),
//         }
//     );

//     if (!response.ok) {
//         const error = await response.text();

//         throw new Error(
//             `GitHub API error ${response.status}: ${error}`
//         );
//     }

//     const data = await response.json();

//     if (data.errors) {
//         console.error(data.errors);

//         throw new Error(
//             JSON.stringify(data.errors)
//         );
//     }

//     return data.data.user.projectsV2.nodes;
// }
let githubProjectsCache: GithubProject[] | null = null;
let githubProjectsCacheExpiresAt = 0;
let githubProjectsRequest: Promise<GithubProject[]> | null = null;

const DEFAULT_GITHUB_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

function getGithubCacheTtlMs() {
    const configuredTtl = Number(
        process.env.GITHUB_PROJECT_CACHE_TTL_MS
    );

    return Number.isFinite(configuredTtl) && configuredTtl > 0
        ? configuredTtl
        : DEFAULT_GITHUB_CACHE_TTL_MS;
}

function transformMilestone(
    milestone: GithubMilestone | null
) {
    if (!milestone) {
        return null;
    }

    return {
        number: milestone.number,
        title: milestone.title,
        description: milestone.description,
        state: milestone.state,
        dueOn: milestone.dueOn,
        url: milestone.url,
    };
}

async function fetchGithubProjects(): Promise<GithubProject[]> {
    const token = process.env.GITHUB_PROJECT_TOKEN;

    if (!token) {
        throw new Error("GITHUB_PROJECT_TOKEN is not configured");
    }

    const query = `
        query {
        user(login: "yannickChoupo") {
            projectsV2(first: 10) {
            nodes {
                number
                title
                url

                items(first: 50) {
                nodes {
                    id

                    content {
                    ... on Issue {
                        id
                        number
                        title
                        url
                        state

                        repository {
                        name
                        nameWithOwner
                        }

                        milestone {
                        number
                        title
                        description
                        state
                        dueOn
                        url
                        }

                        labels(first: 5) {
                        nodes {
                            name
                            color
                            description
                        }
                        }

                        parent {
                        number
                        title
                        url
                        }

                        subIssues(first: 50) {
                        nodes {
                            id
                            number
                            title
                            url
                            state

                            repository {
                            name
                            nameWithOwner
                            }

                            milestone {
                            number
                            title
                            description
                            state
                            dueOn
                            url
                            }

                            labels(first: 5) {
                            nodes {
                                name
                                color
                                description
                            }
                            }
                        }
                        }

                        subIssuesSummary {
                        total
                        completed
                        }
                    }

                    ... on PullRequest {
                        number
                        title
                        url
                        state
                    }

                    ... on DraftIssue {
                        title
                        body
                    }
                    }

                    fieldValueByName(name: "Status") {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                    }
                    }
                }
                }
            }
            }
        }
    }`;

    const response = await fetch(
        "https://api.github.com/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({ query }),
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `GitHub API error ${response.status}: ${error}`
        );
    }

    const data = await response.json();

    if (data.errors) {
        console.error(data.errors);

        throw new Error(
            JSON.stringify(data.errors)
        );
    }

    return data.data.user.projectsV2.nodes;
}

async function getGithubProjects(
    forceRefresh = false
): Promise<GithubProject[]> {
    const now = Date.now();

    if (
        githubProjectsCache &&
        !forceRefresh &&
        now < githubProjectsCacheExpiresAt
    ) {
        return githubProjectsCache;
    }

    // Reuse the same request when several clients arrive while refreshing.
    if (!githubProjectsRequest) {
        githubProjectsRequest = fetchGithubProjects()
            .then((projects) => {
                githubProjectsCache = projects;
                githubProjectsCacheExpiresAt =
                    Date.now() + getGithubCacheTtlMs();

                return projects;
            })
            .finally(() => {
                githubProjectsRequest = null;
            });
    }

    try {
        return await githubProjectsRequest;
    } catch (error) {
        // An expired cache is still safer and fresher than static fallback data.
        if (githubProjectsCache && !forceRefresh) {
            console.warn(
                "GitHub refresh failed; serving stale cached projects:",
                error
            );
            return githubProjectsCache;
        }

        throw error;
    }
}

// function transformProjects(
//     githubProjects: GithubProject[]
// ) {
//     return githubProjects.map((project: GithubProject) => {
//         const items: GithubProjectItem[] =
//             project.items.nodes;

//         const itemByIssueNumber =
//             new Map<number, GithubProjectItem>();

//         for (const item of items) {
//             if (item.content?.number) {
//                 itemByIssueNumber.set(
//                     item.content.number,
//                     item
//                 );
//             }
//         }

//         const issues = items.filter(
//             (item: GithubProjectItem) =>
//                 item.content?.number
//         );

//         const requirements = issues
//             .filter(
//                 (item: GithubProjectItem) =>
//                     !item.content?.parent
//             )
//             .map((item: GithubProjectItem) => {
//                 const issue = item.content!;

//                 const status =
//                     item.fieldValueByName?.name ??
//                     "No Status";

//                 const subIssues =
//                     issue.subIssues?.nodes ?? [];

//                 const summary =
//                     issue.subIssuesSummary;

//                 const total =
//                     summary?.total ??
//                     subIssues.length;

//                 const completed =
//                     summary?.completed ??
//                     subIssues.filter(
//                         (subIssue: GithubSubIssue) =>
//                             subIssue.state === "CLOSED"
//                     ).length;

//                 const progress =
//                     total > 0
//                         ? Math.round(
//                             (completed / total) * 100
//                         )
//                         : 0;

//                 const todos = subIssues.map(
//                     (subIssue: GithubSubIssue) => {
//                         const projectItem =
//                             itemByIssueNumber.get(
//                                 subIssue.number
//                             );

//                         return {
//                             number: subIssue.number,

//                             title: subIssue.title,

//                             url: subIssue.url,

//                             state: subIssue.state,

//                             labels:
//                                 subIssue.labels?.nodes ?? [],

//                             status:
//                                 projectItem
//                                     ?.fieldValueByName
//                                     ?.name ??
//                                 "Not in project",

//                             completed:
//                                 subIssue.state === "CLOSED",
//                         };
//                     }
//                 );

//                 return {
//                     number: issue.number,

//                     title: issue.title,

//                     url: issue.url,

//                     state: issue.state,

//                     status,

//                     labels:
//                         issue.labels?.nodes ?? [],

//                     progress,

//                     completed,

//                     total,

//                     todos,
//                 };
//             });

//         return {
//             number: project.number,
//             title: project.title,
//             url: project.url,
//             requirements,
//         };
//     });
// }
function transformProjects(githubProjects: GithubProject[]) {
    return githubProjects.map((project: GithubProject) => {
        const items: GithubProjectItem[] =
            project.items.nodes;

        const itemByIssueNumber =
            new Map<number, GithubProjectItem>();

        for (const item of items) {
            if (item.content?.number) {
                itemByIssueNumber.set(
                    item.content.number,
                    item
                );
            }
        }

        const issues = items.filter(
            (item: GithubProjectItem) =>
                item.content?.number
        );

        const requirements = issues
            .filter(
                (item: GithubProjectItem) =>
                    !item.content?.parent
            )
            .map((item: GithubProjectItem) => {
                const issue = item.content!;

                const status =
                    item.fieldValueByName?.name ??
                    "No Status";

                // const summary =
                //     issue.subIssuesSummary;

                // const subIssues =
                //     issue.subIssues?.nodes ?? [];

                // const total =
                //     summary?.total ??
                //     subIssues.length;

                // const completed =
                //     summary?.completed ??
                //     subIssues.filter(
                //         (subIssue: GithubSubIssue) =>
                //             subIssue.state === "CLOSED"
                //     ).length;

                // const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

                const subIssues = issue.subIssues?.nodes ?? [];

                const total = subIssues.length;

                const completed = subIssues.filter(
                    (subIssue) => subIssue.state === "CLOSED"
                ).length;

                const progress =
                    total > 0
                        ? Math.round((completed / total) * 100)
                        : 0;

                const todos = subIssues.map(
                    (subIssue: GithubSubIssue) => {
                        const projectItem =
                            itemByIssueNumber.get(
                                subIssue.number
                            );

                        return {
                            number: subIssue.number,
                            title: subIssue.title,
                            url: subIssue.url,
                            state: subIssue.state,

                            repository: subIssue.repository,

                            labels: subIssue.labels?.nodes ?? [],

                            milestone: transformMilestone(
                                subIssue.milestone
                            ),

                            status:
                                projectItem
                                    ?.fieldValueByName
                                    ?.name ??
                                "Not in project",

                            completed:
                                subIssue.state === "CLOSED",
                        };
                        // return {
                        //     number: subIssue.number,
                        //     title: subIssue.title,
                        //     url: subIssue.url,
                        //     state: subIssue.state,

                        //     labels:
                        //         subIssue.labels?.nodes ?? [],

                        //     status:
                        //         projectItem
                        //             ?.fieldValueByName
                        //             ?.name ??
                        //         "Not in project",

                        //     completed:
                        //         subIssue.state === "CLOSED",

                        //     // NEW
                        //     milestone:
                        //         subIssue.milestone
                        //             ? {
                        //                 number:
                        //                     subIssue.milestone
                        //                         .number,

                        //                 title:
                        //                     subIssue.milestone
                        //                         .title,

                        //                 description:
                        //                     subIssue.milestone
                        //                         .description,

                        //                 state:
                        //                     subIssue.milestone
                        //                         .state,

                        //                 dueOn:
                        //                     subIssue.milestone
                        //                         .dueOn,

                        //                 url:
                        //                     subIssue.milestone
                        //                         .url,
                        //             }
                        //             : null,
                        // };
                    }
                );

                return {
                    number: issue.number,
                    title: issue.title,
                    url: issue.url,
                    state: issue.state,
                    status,

                    repository: issue.repository,

                    labels: issue.labels?.nodes ?? [],

                    milestone: transformMilestone(
                        issue.milestone
                    ),

                    progress,
                    completed,
                    total,
                    todos,
                };
                // return {
                //     number: issue.number,
                //     title: issue.title,
                //     url: issue.url,
                //     state: issue.state,
                //     status,

                //     labels:
                //         issue.labels?.nodes ?? [],

                //     // NEW
                //     milestone:
                //         issue.milestone
                //             ? {
                //                 number:
                //                     issue.milestone.number,

                //                 title:
                //                     issue.milestone.title,

                //                 description:
                //                     issue.milestone.description,

                //                 state:
                //                     issue.milestone.state,

                //                 dueOn:
                //                     issue.milestone.dueOn,

                //                 url:
                //                     issue.milestone.url,
                //             }
                //             : null,

                //     progress,
                //     completed,
                //     total,
                //     todos,
                // };
            });

        return {
            number: project.number,
            title: project.title,
            url: project.url,
            requirements,
        };
    });
}

export const getProjects = async () => {
    return Project.find().sort({ order: 1 });
};

export const getGithubProjectsV2 = async () => {
    const githubProjects = await getGithubProjects();
    return transformProjects(githubProjects);
};

export const refreshGithubProjectsV2 = async () => {
    const githubProjects = await getGithubProjects(true);
    return transformProjects(githubProjects);
};

export const getProjectById = async (id: string) => {
    return Project.findById(id);
};

export const createProject = async (data: any) => {
    return Project.create(data);
};

export const updateProject = async (
    id: string,
    data: Partial<any>
) => {
    return Project.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteProject = async (id: string) => {
    return Project.findByIdAndDelete(id);
};

export const getRequirementsWithTodosByProject = async (
    projectId: string
) => {
    const requirements =
        await Requirement.find({
            project: projectId
        })
            .sort({ order: 1 })
            .lean();

    const requirementIds =
        requirements.map(
            (requirement) => requirement._id
        );

    const todos = await Todo.find({
        requirement: {
            $in: requirementIds
        }
    })
        .sort({ order: 1 })
        .lean();

    return requirements.map(
        (requirement) => ({
            ...requirement,

            todos: todos.filter(
                (todo: any) =>
                    todo.requirement.toString() ===
                    requirement._id.toString()
            )
        })
    );
};