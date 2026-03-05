"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie"; 

export default function HydrateAuth() {
    const dispatch = useAppDispatch();

    useEffect(() => {
     
        const token = Cookies.get("token") || null;
        const role = (Cookies.get("role") as "USER" | "ADMIN") || null;
        const isTrial = Cookies.get("isTrial") === "true";
        const isSubscribed = Cookies.get("isSubscribed") === "true";
        const trialStartDate = Cookies.get("trialStartDate") || undefined;

        dispatch(
            setCredentials({
                token,
                role,
                isTrial,
                isSubscribed,
                trialStartDate,
            })
        );
    }, [dispatch]);

    return null;
}