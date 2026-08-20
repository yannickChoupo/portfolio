import React, { useEffect } from "react";
import {
    useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    loadPrivacyConsent,
    setPrivacyConsent,
} from "../../features/privacySlice";
import type { RootState } from "../../store";
import AXIOS from "../../redux/services/axios";
import Privacy from "../../pages/Privacy";


let visitorRegistrationPromise: Promise<any> | null = null;

export const registerVisitorOnce = () => {
    if (!visitorRegistrationPromise) {
        visitorRegistrationPromise = AXIOS.post("/visitor");
    }
    return visitorRegistrationPromise;
};



export const VisitorTracker: React.FC = () => {
    const dispatch = useDispatch();
    const privacyConsent: boolean | null = useSelector(
        (state: RootState) => state.privacy.accepted
    );

    useEffect(() => {
        dispatch(loadPrivacyConsent());
    }, [dispatch]);

    const location = useLocation();
    const onAccept = () => {
        dispatch(setPrivacyConsent(true));
    }

    const onReject = () => {
        dispatch(setPrivacyConsent(false));
    }

    useEffect(() => {
        if (privacyConsent !== true) {
            return;
        }

        if (
            location.pathname.startsWith("/admin") ||
            location.pathname.startsWith("/login") ||
            location.pathname.startsWith("/privacy")
        ) {
            return;
        }

        const visitorRegistered =
            localStorage.getItem("visitorRegistered");

        if (visitorRegistered === "true") {
            return;
        }

        registerVisitorOnce()
            .then(() => {
                localStorage.setItem("visitorRegistered", "true");
            })
            .catch((error) => {
                console.error("Visitor tracking failed:", error);
            });
    }, [privacyConsent]);

    if (privacyConsent == null) {
        return <Privacy onAccept={onAccept} onReject={onReject} />
    }

    return null;
};