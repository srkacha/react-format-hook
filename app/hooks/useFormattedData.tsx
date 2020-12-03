import { useState, useReducer } from 'react';

type ActionType = {
    type: string,
    payload: any
}

// Hook is based on a reducer that manages data 
// Reducer has 3 options and is modular engouh to easily add other options
const useFormattedData = (data: any[]): {formatted: any[];
                                         search: (q: string) => void;
                                         filter: (c: ({}: any) => boolean) => void;
                                         sortBy: (p: string | ((a: any, b: any) => any)) => void} => {
    
    // Reducer function that manages the state
    const formatReducer = (currentState: any, action: ActionType): any => {
        switch (action.type){
            case 'SEARCH':
                return [...currentState].filter((data) => {
                    for (const property in data){
                        const value: string = data[property].toString();
                        if (value.includes(action.payload)) return true;
                    }
                    return false;
                });
            case 'FILTER':
                return [...currentState].filter(action.payload);
            case 'SORT':
                if (typeof action.payload === "string"){
                    const paramName = action.payload;
                    return [...currentState].sort((a, b) => {
                        // Typechecking for some basic prop types
                        if (typeof a[paramName] === "string"){
                            return a[paramName] > b[paramName] ? 1 : -1;
                        }else if (typeof a[paramName] === "number"){
                            return a[paramName] - b[paramName];
                        }
                    });
                }else if (typeof action.payload === "function"){
                    return [...currentState].sort(action.payload);
                }
            default:
                return currentState;
        }
    };

    const [formatted, dispatch] = useReducer(formatReducer, data);


    const search = (query: string) : void => {
        dispatch({
            type: 'SEARCH',
            payload: query
        });
    };

    const filter = (callback: ({}: any) => boolean ) : void => {
        dispatch({
            type: 'FILTER',
            payload: callback
        });
    };

    const sortBy = (param: string | ((a: any, b: any) => any)) : void => {
        dispatch({
            type: 'SORT',
            payload: param
        });
    };

    return {
        formatted,
        search,
        filter,
        sortBy
    };
};

export default useFormattedData;