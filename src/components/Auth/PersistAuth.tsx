import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import React, {useEffect, useState} from "react";
import {sessionKey} from "../../app/Interfaces/Contracts/userAuthContracts.ts";
import {checkAuthAsync} from "../../app/storeSlices/userCredentialsSlice.ts";
import {Box, CircularProgress} from "@mui/material";

function checkCookieExists(cookieName: string): boolean {
    if (typeof document === 'undefined') return false;
    return document.cookie
        .split(';')
        .some(cookie => cookie.trim().startsWith(`${cookieName}=`));
}

function PersistAuth({ children }: {children: React.ReactNode}) {
    const dispatch = useAppDispatch();
    const { isAuthCheckLoading } = useAppSelector((state) => state.user);
    const [ initialsCheckLoading, setInitialCheckLoading ] = useState(true);

    useEffect(() => {
        const checkAuth = async() => {
            if (checkCookieExists(sessionKey)) {
                await dispatch(checkAuthAsync());
            }

            setInitialCheckLoading(false);
        }

        checkAuth().catch(console.error);
    }, [dispatch])

    if (initialsCheckLoading || isAuthCheckLoading ) {
        return (
            <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default PersistAuth;