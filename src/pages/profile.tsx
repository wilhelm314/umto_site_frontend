import React, { ReactElement, useEffect, useState } from "react";
import { user_entry } from "../components/strapi/strapi_entries";
import { useAuthContext } from "../context/authContext";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";


const projects = (user: user_entry) => {
    return (
        <div className="container p-2 mx-auto max-w-full grid grid-cols-3 m-2">
            {user?.projects?.map(x => {
                return (
                    <div className='p-1 m-2' key={x.id}>
                        <a className="m-1 hover:text-maincolor" key={'3'} href={'/projects/' + x.id}>{x.title}</a>
                    </div>
                )
            })}
        </div>
    )
}

const trophies = (user: user_entry) => {
    return (
        <div className="container p-2 mx-auto max-w-full grid grid-cols-3 m-2">
            {user?.trophies?.map(x => {
                return (
                    <div className='p-1 m-2' key={x.id}>
                        <a className="m-1 hover:text-maincolor" key={'3'} href={'/trophies/' + x.id}>{x.title}</a>
                    </div>
                )
            })}
        </div>
    )
}


export const Profile = () => {
    const navigate = useNavigate()
    const { user, isLoading } = useAuthContext()

    return (
        <div className="text-center">
            {
                isLoading ?
                    <div>loading...</div>
                    :
                    (
                        user ?
                            <div className="container mx-auto max-w-full p-5">
                                <div key={1} className="text-4xl font-light">DIN PROFIL</div>
                                <div key={2} className="container p-4">
                                    <div className="container max-w-xl">
                                        <div key={1} className="text-xl font-semibold">PROJEKTER</div>
                                        <div key={2}> {projects(user)}</div>
                                    </div>
                                    <div key={3} className="container max-w-xl">
                                        <div className="text-xl font-semibold">TROFÆER</div>
                                        <div>{trophies(user)}</div>
                                    </div>

                                </div>

                            </div>
                            :
                            <div>
                                <div>du er ikke logget ind!</div>
                            </div>
                    )
            }
        </div>

    )

}