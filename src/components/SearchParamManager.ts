import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function paramArrayParser(param: string | null) {
    return param?.split(',') ?? [];
}
export function paramArrayToString(params: Array<string>) {
    return params?.join(',');
}


export function useSearchParam(key: string): [string | null, (val: string) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    //string value output of a param of SEARCHPARAMDS
    const [param, setParam] = useState(searchParams.get(key));


    const setValue = (value: string) => {
        setSearchParams((sold) => {
            //console.log('before', sold.get('filters'));
            sold.set(key, value?.toString())

            return sold;
        });
    };

    useEffect(() => {
        setParam(searchParams.get(key));
    }, [searchParams]);

    return [param, setValue]
}