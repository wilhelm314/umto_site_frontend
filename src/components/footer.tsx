import React, { useEffect, useState } from "react";
import { page_entry } from "./strapi/strapi_entries";
import { getFooter } from "./strapi/strapi_interface";
import { parseRichText } from "./strapi/strapi_rich_text";
import { Link } from "react-router-dom";

export function Footer() {

    const [footer, setFooter] = useState<page_entry>()

    useEffect(() => {
        fetch(getFooter())
            .then(x => x.json())
            .then(x => x.data as page_entry)
            .then(x => setFooter(x))
    }, [])


    return (
        <div style={{ height: '60vh' }} className="bg-red py-10">
            <div className="p-10 h-full w-full flex flex-col overflow-hidden">
                <div className="basis-5/12 mb-10 text-white text-3xl font-bold tracking-wide">{footer?.attributes.row[0].column[0].richtext.map(x => parseRichText(x))}</div>

                <div className="basis-1/12 flex my-1 justify-center items-center">
                    <div className="bg-white p-px w-full"></div>
                </div>

                <div className="basis-2/12 flex justify-center items-center">

                    <div className="text-center mx-auto h-full flex justify-start items-center  basis-1/2">
                        <Link to='/projects' className="mr-4 text-white text-lg hover:text-black">Events</Link>
                        <Link to='/community' className="mx-4 text-white text-lg hover:text-black">Community</Link>
                        <Link to='/organisation' className="mx-4 text-white text-lg hover:text-black">Organisation</Link>
                        <Link to='/contact' className=" mx-4 text-white text-lg hover:text-black">Kontakt</Link>
                    </div>

                    <div className="text-right mx-auto h-full flex justify-end items-center  basis-1/2">
                        <Link to='https://www.instagram.com/ungemiljoernestakeover/' className=" mx-4 text-white text-lg hover:text-black">INSTAGRAM</Link>
                    </div>
                </div>

                <div className="basis-1/12 flex my-1 justify-center items-center">
                    <div className="bg-white p-px w-full"></div>
                </div>

                <div className="basis-3/12 flex justify-center items-center">
                    <div className="w-full text-white text-6xl tracking-widest">Ungemiljøernes Takeover</div>
                </div>

            </div>


        </div>
    )
}