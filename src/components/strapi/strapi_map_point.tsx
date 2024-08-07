import React from "react";
import { rich_text_element, parseRichText } from "./strapi_rich_text";

export type MapPoint = {
    ref?: URL,
    id: number,
    title: string,
    lattitude: number,
    longitude: number,
    shortHook: string
}

export function MPTooltip(p: MapPoint) {
    return (
        <div key="t1" className="container mx-auto bg-white rounded-md p-2 h-30 w-40 outline-secondcolor outline-8">
            <h1 key="t2" className="text-l font-sans font-semibold text-center underline">{p.title}</h1>
            <div key="t3" className="text-xs font-mono text-pretty break-words text-center">{p.shortHook}</div>
        </div>
    )
}


