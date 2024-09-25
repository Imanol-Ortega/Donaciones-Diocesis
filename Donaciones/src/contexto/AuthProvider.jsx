/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState("");

    return (
        <AuthContext.Provider value={{ user, setuser }}>
            {children}
        </AuthContext.Provider>
    );
};
