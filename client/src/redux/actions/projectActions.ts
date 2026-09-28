import AXIOS from "../services/axios";


import {
  setProjects,
  setLoading,
  setError,
} from "../reducers/projectReducer";
import type { AppDispatch } from "../store";

export const fetchProjects = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const response = await AXIOS.get("/projects/github");

    dispatch(setProjects(response.data.projects));
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    dispatch(setError("Failed to load projects"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshGithubProjects =
  (adminKey: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await AXIOS.post(
        "/projects/github/refresh",
        {},
        {
          headers: {
            "X-Admin-Refresh-Key": adminKey,
          },
        }
      );

      dispatch(setProjects(response.data.projects));
    } catch (error) {
      console.error("Failed to refresh GitHub projects:", error);
      dispatch(setError("Failed to refresh GitHub projects"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

// export const createProject = (project: Project) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setError(null));

//       const response = await AXIOS.post("/projects", project);

//       dispatch(addProject(response.data));

//       return response.data;
//     } catch (error) {
//       console.error("Failed to create project:", error);

//       dispatch(setError("Failed to create project"));

//       throw error;
//     }
//   };

// export const updateProject =
//   (id: string, project: Project) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setError(null));

//       const response = await AXIOS.put(`/projects/${id}`, project);

//       dispatch(updateProjectState(response.data));

//       return response.data;
//     } catch (error) {
//       console.error("Failed to update project:", error);

//       dispatch(setError("Failed to update project"));

//       throw error;
//     }
//   };

// export const deleteProject =
//   (id: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setError(null));

//       await AXIOS.delete(`/projects/${id}`);

//       dispatch(removeProject(id));
//     } catch (error) {
//       console.error("Failed to delete project:", error);

//       dispatch(setError("Failed to delete project"));

//       throw error;
//     }
//   };