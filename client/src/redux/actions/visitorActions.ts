import type { AppDispatch } from "../store";
import AXIOS from "../services/axios";

import {
    setVisitorStats,
    setLoading,
    setError,
} from "../reducers/visitorReducer";

export const fetchVisitorStats =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const response =
                await AXIOS.get(
                    "/visitor/stats"
                );

            dispatch(
                setVisitorStats({
                    visits:
                        response.data.visits ??
                        0,

                    uniqueVisitors:
                        response.data
                            .uniqueVisitors ??
                        0,
                })
            );
        } catch (error) {
            console.error(
                "Failed to fetch visitor stats:",
                error
            );

            dispatch(
                setError(
                    "Failed to load visitor statistics"
                )
            );
        } finally {
            dispatch(setLoading(false));
        }
    };