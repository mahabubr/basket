import { useContext } from "react";
import { AUTH_CONTEXT } from "../context/AuthProvider";

const useAuth = () => {
    const context = useContext(AUTH_CONTEXT)
    return context
};

export default useAuth;