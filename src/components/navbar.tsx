import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navbar_entry } from "./strapi/strapi_entries";
import { getImageURL, getNavbar } from "./strapi/strapi_interface";
import { useAuthContext } from "../context/authContext";


export function Navbar() {

    const [navbarData, setNavbarData] = useState<navbar_entry>()
    const { user } = useAuthContext()

    const navigate = useNavigate()
    const is_touch_device = () => {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        fetch(getNavbar())
            .then(x => x.json())
            .then(x => x.data as navbar_entry)
            .then(x => {
                setNavbarData(x);
            })
    }, [])





    return (
        window.screen.width / window.screen.height < 2 / 3 ?
            <div className="top-0 fixed w-full">
                <div key="nav1" className=" container bg-white mx-auto max-w-full h-28 p-2 font-Consolas text-2xl flex justify-center items-center	">

                    <div className="align-left basis-1/2">
                        <img src={getImageURL(navbarData?.attributes.logo.data.attributes.url ?? "").toString()} alt="" className="max-w-full max-h-full hover:cursor-pointer	" onClick={() => navigate('/')} />
                    </div>

                    <div className="flex justify-end align-right items-right basis-1/2 h-full w-full">
                        <img className="max-w-full max-h-full hover:cursor-pointer" onClick={() => navigate('/nav')} src={getImageURL(navbarData?.attributes.navburger.data.attributes.url ?? "").toString()} alt="" />
                    </div>

                </div >

            </div>

            :
            <div key="nav1" className="top-0 fixed container bg-white mx-auto max-w-full h-28 p-2 font-Consolas text-2xl flex justify-center items-center	">

                <div className="align-left basis-1/3">
                    <img src={getImageURL(navbarData?.attributes.logo.data.attributes.url ?? "").toString()} alt="" className="max-w-full max-h-full hover:cursor-pointer	" onClick={() => navigate('/')} />
                </div>

                <div className="text-center mx-auto h-full flex justify-center items-center  basis-1/3">
                    <Link to='/projects' className="mx-4 text-black hover:text-red">Events</Link>
                    <Link to='/community' className="mx-4 text-black hover:text-red">Community</Link>
                    <Link to='/organisation' className="mx-4 text-black hover:text-red">Organisation</Link>
                </div>

                <div className="text-right mx-auto h-full flex justify-end items-center  basis-1/3">
                    <Link to='/backstage' className="mx-4 text-black hover:text-red">{user ? 'Backstage' : 'Log ind'}</Link>
                    <Link to='/contact' className=" mx-4 text-black hover:text-red">Kontakt</Link>
                </div>

            </div>

    )

}

