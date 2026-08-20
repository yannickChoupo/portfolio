import Project from "../../models/Project.model";

export const getProjects = async () => {
    return Project.find().sort({ order: 1 });
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