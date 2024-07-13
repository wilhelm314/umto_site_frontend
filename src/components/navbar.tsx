import React from "react";
import { Link } from "react-router-dom";

export function navbar() {





    return (
        <div key="nav1" className="container bg-lightgrey mx-auto max-w-full p-5 font-Consolas text-2xl font-bold ">
            <div className="mx-10 max-w-full text-right	tracking-wider antialiased">

                <Link to='/' className="m-20 text-black hover:text-blue">HOME</Link>
                <Link to='/map' className="m-20 text-black hover:text-blue">MAP</Link>
                <Link to='/about' className="m-20 text-black hover:text-blue">ABOUT</Link>
                <Link to='/projects' className="m-20 text-black hover:text-blue">PROJECTS</Link>
                <Link to='/backstage' className="m-20 text-black hover:text-blue">BACKSTAGE</Link>


            </div>

        </div>
    )

}

