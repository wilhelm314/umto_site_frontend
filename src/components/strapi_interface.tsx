import React, { useState } from "react";

export type blogpost_entry = {
    id: number,
    attributes: {
        Title: string,
        createdAt: string,
        updateAt: string,
        publishedAt: string
    }
}
export type test_entry = {
    id: number,
    attributes: {
        richtext: rich_text_element[],
        createdAt: string,
        updateAt: string,
        publishedAt: string
    }
}


// types for the rich_text_element type

type paragraph = { type: "paragraph", children: rich_text_element[] }
type heading = { type: "heading", children: rich_text_element[], level: number }
type list = { type: "list", children: rich_text_element[], format: "unordered" | "ordered" }
type list_item = { type: "list-item", children: rich_text_element[] }
type quote = { type: "quote", children: rich_text_element[] }
type code = { type: "code", children: rich_text_element[] }
type text = { type: "text", text: string }
type image = {
    type: "image", image: {
        name: string,
        alternativeText: string,
        url: string,
        caption: string,
        width: number,
        height: number,
        formats: any
    }
}


// rich_text_element type for the set of possible types given by strapi in the richtext api endpoint
export type rich_text_element = paragraph | heading | list | list_item | quote | code | text | image;

//recursive function that determines the atomic type of rich_text_element and turns it into HTML
export function parseRichText(r: rich_text_element) {
    switch (r.type) {
        case "heading":
            switch (r.level) {
                case 1: return (<h1>{r.children.map(x => parseRichText(x))}</h1>);
                case 2: return (<h2>{r.children.map(x => parseRichText(x))}</h2>);
                case 3: return (<h3>{r.children.map(x => parseRichText(x))}</h3>);
                case 4: return (<h4>{r.children.map(x => parseRichText(x))}</h4>);
                case 5: return (<h5>{r.children.map(x => parseRichText(x))}</h5>);
                case 6: return (<h6>{r.children.map(x => parseRichText(x))}</h6>);
                default: throw new Error();
            };
        case "paragraph":
            return (<p>{r.children.map(x => parseRichText(x))}</p>);
        case "list":
            switch (r.format) {
                case "ordered":
                    return (<ol>{r.children.map(x => parseRichText(x))}</ol>);
                case "unordered":
                    return (<ul>{r.children.map(x => parseRichText(x))}</ul>);
                default: throw new Error();
            };
        case "list-item":
            return (<li>{r.children.map(x => parseRichText(x))}</li>);
        case "quote":
            return (<p>{r.children.map(x => parseRichText(x))}</p>);
        case "code":
            return (<p>{r.children.map(x => parseRichText(x))}</p>);
        case "text":
            return (r.text);
        case "image":
            return <img src={r.image.url} alt={r.image.caption} width={r.image.width} height={r.image.height} />
    }
}



const api_adress = 'http://localhost:1337'
export const collections: { [key: string]: URL } = {
    blogposts: new URL("api/blogposts", api_adress),
    tests: new URL("api/tests", api_adress)
};

