import React, { useEffect, useState } from "react";
import { page_entry } from "../components/strapi/strapi_entries";
import { getFrontPageURL, getImageURL } from "../components/strapi/strapi_interface";
import { parseRichText } from "../components/strapi/strapi_rich_text";
import { Link } from "react-router-dom";




export function Frontpage() {
    const [frontpage, setFrontpage] = useState<page_entry>()
    useEffect(() => {
        fetch(getFrontPageURL())
            .then(x => x.json())
            .then(x => x.data as page_entry)
            .then(x => setFrontpage(x))
    }, [])

    const HeroSection = () => {
        return (
            <div className="w-full">
                <img className="max-w-full max-h-full" src={getImageURL(frontpage?.attributes.row[0].image.data.attributes.url ?? "").toString()} alt="" />
            </div>
        )
    }

    const UMTO = () => {
        return (
            <div className="w-full bg-red text-white p-32 text-2xl flex">
                <div className="basis-1/2">
                    <div className="text-4xl font-light my-10">{frontpage?.attributes.row[1].column[0].title}</div>
                    <div>{frontpage?.attributes.row[1].column[0].richtext.map(x => parseRichText(x))}</div>
                    <div className="font-bold my-10 "><Link className="hover:text-black" to='/about'>Læs mere</Link></div>

                </div>
            </div>
        )
    }

    return (
        <div>
            {HeroSection()}
            {UMTO()}

        </div>
    )
}