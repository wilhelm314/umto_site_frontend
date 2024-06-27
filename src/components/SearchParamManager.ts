import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchParam(key: string): [string | null, (val: string | number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const [param, setParam] = useState(searchParams.get(key));
    const setValue = (value: string | number) => {
        setSearchParams((sold) => {
            sold.set(key, value.toString())
            return sold;
        });
    };

    useEffect(() => {
        setParam(searchParams.get(key));
    }, [searchParams]);

    return [param, setValue]
}