import { useState, useEffect } from 'react';

const useFormattedData = (data: any[]): {formatted: any[]; 
                                         search: (q: string) => void; 
                                         filter: (c: ({}: any) => boolean) => void; 
                                         sortBy: (p: string | ((a: any, b: any) => any)) => void} => {

    const [formatted, setFormatted] = useState(data);

    const search = (query: string) : void => {
        setFormatted([...formatted].filter((data) => {
            for (const property in data){
                const value: string = data[property].toString();
                if (value.includes(query)) return true;
            }
            return false;
        }));
    };

    const filter = (callback: ({}: any) => boolean ) : void => {
        setFormatted([...formatted].filter(callback));
    };

    const sortBy = (param: string | ((a: any, b: any) => any)) : void => {
        if (typeof param === "string"){
            setFormatted([...formatted].sort((a, b) => {return a[param] > b[param] ? 1 : -1}));
        }else if (typeof param === "function"){
            setFormatted([...formatted].sort(param));
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