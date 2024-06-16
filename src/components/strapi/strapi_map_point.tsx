import React from "react";
import { rich_text_element, parseRichText } from "./strapi_rich_text";

export type MapPoint = {
    ref?: URL,
    id: number,
    title: string,
    lattitude: number,
    longitude: number,
    address: string,
    shortHook: string
    image: {
        name: string,
        alternativeText: string,
        url: string,
        caption: string,
        width: number,
        height: number,
        formats: any
    }
}

export function MPTooltip(p: MapPoint) {
    console.log(p.address);
    return (
        <div className="container mx-auto bg-white rounded-md p-5 h-40 w-80">
            {p.image ? <img src={p.image.url} alt={p.image.alternativeText} /> : ""}
            <h1 className="text-l font-sans font-semibold text-center underline">{p.title}</h1>
            <div className="text-xs font-mono text-balance break-words text-center">{p.shortHook}</div>
            <div className="container">
                <a className="text-xs font-sans text-left max-w[60%] mx-2">adresse: {p.address}</a>
                <a href="" className="text-xs font-sans text-right font-bold mx-2">læs mere</a>
            </div>
        </div>
    )
}


