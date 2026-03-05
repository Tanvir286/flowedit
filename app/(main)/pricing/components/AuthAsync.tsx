"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

export default function AuthSync() {
    const { token } = useAppSelector((state) => state.auth);
    const { data } = useGetMeQuery(undefined, { skip: !token });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(
                setCredentials({
                    role: data.data.type,
                    isTrial: data.data.isTrial,
                    isSubscribed: data.data.isSubscribed,
                })
            );
        }
    }, [data, dispatch]);

    return null;
}