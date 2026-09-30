import type { AppDispatch } from "../store";
import AXIOS from "../services/axios";

import {
    setRequirements,
    addRequirement,
    updateRequirement as updateRequirementState,
    removeRequirement,
    setLoading,
    setError,
} from "../reducers/requirementReducer";
import type { Requirement } from "../../pages/Admin/types/admin.types";

export const fetchRequirements = (projectId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response =
            await AXIOS.get(`/projects/${projectId}/requirements`);


        dispatch(
            setRequirements(
                response.data.requirements
            )
        );
    } catch (error) {
        console.error(
            "Failed to fetch requirements:",
            error
        );

        dispatch(
            setError(
                "Failed to load requirements"
            )
        );
    } finally {
        dispatch(setLoading(false));
    }
};

export const createRequirement =
    (
        projectId: string,
        requirement: Requirement
    ) =>
        async (dispatch: AppDispatch) => {
            try {
                const response =
                    await AXIOS.post(
                        `/projects/${projectId}/requirements`,
                        requirement
                    );

                dispatch(
                    addRequirement(
                        response.data
                    )
                );

                return response.data;
            } catch (error) {
                dispatch(
                    setError(
                        "Failed to create requirement"
                    )
                );

                throw error;
            }
        };

export const updateRequirement =
    (
        id: string,
        requirement: Requirement
    ) =>
        async (dispatch: AppDispatch) => {
            try {
                const response =
                    await AXIOS.put(
                        `/requirements/${id}`,
                        requirement
                    );

                dispatch(
                    updateRequirementState(
                        response.data
                    )
                );

                return response.data;
            } catch (error) {
                dispatch(
                    setError(
                        "Failed to update requirement"
                    )
                );

                throw error;
            }
        };

export const deleteRequirement =
    (id: string) =>
        async (dispatch: AppDispatch) => {
            try {
                await AXIOS.delete(
                    `/requirements/${id}`
                );

                dispatch(
                    removeRequirement(id)
                );
            } catch (error) {
                dispatch(
                    setError(
                        "Failed to delete requirement"
                    )
                );

                throw error;
            }
        };