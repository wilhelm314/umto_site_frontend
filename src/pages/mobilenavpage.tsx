import React from "react";
import { useNavigate } from "react-router-dom";

export function Navpage() {
    const navigate = useNavigate()

    return (
        <div className="bg-white text-center w-full text-6xl p-2 h-screen">
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/projects')
            }>Events</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/community')
            }>Community</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/about')
            }>Organisation</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/backstage')
            }>Log Ind</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/contact')}>Kontakt</div>
        </div>
    )
}