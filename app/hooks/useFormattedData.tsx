import { type } from 'os';
import { useState, useEffect } from 'react';

const useFormattedData = (data: any[]): {formatted: any[]; 
                                         search: (q: string) => void; 
                                         filter: (c : ({}: any) => void) => void; 
                                         sortBy: (p: string) => void} => {

    const [formatted, setFormatted] = useState(data);

    const search = (query: string) : void => {

    };

    const filter = (callback: ({}: any) => void ) : void => {

    };

    const sortBy = (method: string | ((a: any, b: any) => any)) : void => {
        if (typeof method === "string"){
            setFormatted([...formatted].sort((a, b) => {return a[method] > b[method] ? 1 : -1}));
        }else if (typeof method === "function"){
            setFormatted([...formatted].sort(method));
        }
    };

    return {
        formatted,
        search,
        filter,
        sortBy
    };
};

export default useFormattedData;