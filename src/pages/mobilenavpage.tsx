import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export function Navpage() {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    return (
        <div className="bg-white text-center w-full text-6xl p-2 h-fit">
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/projects')
            }>Events</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/community')
            }>Community</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/organisation')
            }>Organisation</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/backstage')
            }>{user ? 'Backstage' : 'Log Ind'}</div>
            <div className="my-40 text-black hover:text-red" onClick={() => navigate('/contact')}>Kontakt</div>
        </div>
    )
}