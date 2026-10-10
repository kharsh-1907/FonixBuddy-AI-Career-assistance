import { useContext } from 'react';
import { authContext } from "../auth_context";

import { login, signup, logout } from "../services/auth_api"

export const useAuth = () => {
    const context = useContext(authContext);
    const { user, Setuser, loading, Setloading } = context;

    const handelLogin = async ({ email, password }) => {
        Setloading(true);
        try {
            const data = await login({ email, password });
            Setuser(data.user);
        } catch (error) {
            // console.log(error);
            throw error;
        } finally {
            Setloading(false);
        }
    }
    const handelSignup = async ({ name, email, password }) => {
        Setloading(true);
        try {
            const data = await signup({ name, email, password });
            Setuser(data.user);
            return data;
        } catch (error) {
            // console.log(error);
            throw error;
        } finally {
            Setloading(false);
        }
    }
    const handelLogout = async () => {
        Setloading(true);
        try {
            const data = await logout();
            Setuser(null);
            return data;
        } catch (error) {
            // console.log(error);
            throw error;
        } finally {
            Setloading(false);
        }
    }
    return { user, loading, handelLogin, handelLogout, handelSignup }
}
