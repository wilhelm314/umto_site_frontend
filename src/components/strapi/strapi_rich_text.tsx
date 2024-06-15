import React from "react";


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

// recursive function that determines atomic type for rich text element and outputs appropriate HTML

let key_counter = 0;
export function parseRichText(r: rich_text_element) {
    switch (r.type) {
        case "heading":
            switch (r.level) {
                case 1: return (<h1 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h1>);
                case 2: return (<h2 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h2>);
                case 3: return (<h3 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h3>);
                case 4: return (<h4 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h4>);
                case 5: return (<h5 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h5>);
                case 6: return (<h6 key={key_counter++}>{r.children.map(x => parseRichText(x))}</h6>);
                default: throw new Error();
            };
        case "paragraph":
            return (<p key={key_counter++}>{r.children.map(x => parseRichText(x))}</p>);
        case "list":
            switch (r.format) {
                case "ordered":
                    return (<ol key={key_counter++}>{r.children.map(x => parseRichText(x))}</ol>);
                case "unordered":
                    return (<ul key={key_counter++}>{r.children.map(x => parseRichText(x))}</ul>);
                default: throw new Error();
            };
        case "list-item":
            return (<li key={key_counter++}>{r.children.map(x => parseRichText(x))}</li>);
        case "quote":
            return (<p key={key_counter++}>{r.children.map(x => parseRichText(x))}</p>);
        case "code":
            return (<p key={key_counter++}>{r.children.map(x => parseRichText(x))}</p>);
        case "text":
            return (r.text);
        case "image":
            return <img key={key_counter++} src={r.image.url} alt={r.image.caption} width={r.image.width} height={r.image.height} />
    }
}
