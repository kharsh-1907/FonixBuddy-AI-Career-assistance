import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth_api";



export const authContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, Setuser] = useState(null)
    const [loading, Setloading] = useState(true)


    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                // console.log("GET ME RESPONSE:", data);
                Setuser(data.user);
            } catch (error) {
                // console.log("GET ME ERROR:", error);
                Setuser(null);
            } finally {
                Setloading(false);
            }
        }

        getAndSetUser();
    }, [])

    return (
        <authContext.Provider value={{ user, Setuser, loading, Setloading }}>{children}</authContext.Provider>

    )
} 