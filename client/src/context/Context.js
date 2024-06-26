import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const init = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(init);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, init);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
            {children}
        </Context.Provider>
    );
};