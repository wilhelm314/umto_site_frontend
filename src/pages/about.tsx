import React, { useEffect, useState } from "react";
import { page_entry } from "../components/strapi/strapi_entries";
import { getAboutPageURL, getImageURL } from "../components/strapi/strapi_interface";
import { gallery } from "../components/strapi/strapi_entries";
import { ImageSlider } from "../components/ImageSlider";
import { parseRichText } from "../components/strapi/strapi_rich_text";

export function AboutPage() {
    const [get_about_page, set_about_page] = useState<page_entry>();


    useEffect(() => {
        fetch(getAboutPageURL())
            .then(x => x.json())
            .then(x => {
                console.log(x);
                return set_about_page(x.data as page_entry);
            })
    }, [])




    return (
        <div>{get_about_page?.attributes.row.map(y => {
            return (<div className="container flex flex-row w-full p-10 mx-auto">{y.column.map(x => {

                return (<div className={`basis-${'1/' + y.column.length} p-3 m-10`}>{
                    <div className='object-cover w-full h-full'>
                        <h1>{x.title}</h1>
                        <div>{x?.richtext.map(x => parseRichText(x))}</div>
                    </div>

                }</div>)
            })}</div>)
        })}</div>
    )
}

