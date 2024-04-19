import {createContext, useContext, useReducer, useState} from "react";
import {TYPES} from "./types";

const globalContext = createContext()

const initialStates = {
    favorites:[],
    is_loading: false,
}
function reducer(state,action) {
    switch (action.type){
        case TYPES.TOGGLE_FAV:
            return {...state,favorites:action.payload}
        case TYPES.IS_LOADING:
            return {...state,is_loading:action.payload}
        default:
            return state
    }
}
const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialStates)

    const value = {
        state,
        dispatch,
    }
    // dispatch({type: "TOGGLE_FAV", payload:{}})
    return (
        <>
            <globalContext.Provider value={value}>
                {children}
            </globalContext.Provider>
        </>
    )
}
export default GlobalProvider

export const useGlobalStore = () => {
    const value = useContext(globalContext)
    return value
}