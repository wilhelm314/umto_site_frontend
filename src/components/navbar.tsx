import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navbar_entry } from "./strapi/strapi_entries";
import { getImageURL, getNavbar } from "./strapi/strapi_interface";

export function Navbar() {

    const [navbarData, setNavbarData] = useState<navbar_entry>()
    const navigate = useNavigate()


    useEffect(() => {
        fetch(getNavbar())
            .then(x => x.json())
            .then(x => x.data as navbar_entry)
            .then(x => {
                setNavbarData(x);
            })
    }, [])





    return (
        <div key="nav1" className="container bg-white mx-auto max-w-full h-28 p-2 font-Consolas text-2xl flex justify-center items-center	">

            <div className="text-left mx-auto ">
                <img src={getImageURL(navbarData?.attributes.logo.data.attributes.url ?? "").toString()} alt="" className="max-w-full max-h-full hover:cursor-pointer	" onClick={() => navigate('/')} />
            </div>

            <div className="text-center mx-auto h-full flex items-center">
                <Link to='/projects' className="mx-4 text-black hover:text-red">Events</Link>
                <Link to='/map' className="mx-4 text-black hover:text-red">Community</Link>
                <Link to='/about' className="mx-4 text-black hover:text-red">Organisation</Link>
            </div>

            <div className="text-right mx-auto h-full flex items-center">
                <Link to='/backstage' className="mx-4 text-black hover:text-red">Log Ind</Link>
                <Link to='/contact' className=" mx-4 text-black hover:text-red">Kontakt</Link>
            </div>

        </div>

    )

}

