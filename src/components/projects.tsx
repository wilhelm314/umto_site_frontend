import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BEARER, getMemberProject, getProject, getPublicProject, getProjects, getImageURL } from "./strapi/strapi_interface";
import { project_entry } from "./strapi/strapi_entries";
import { useAuthContext } from "../context/authContext";
import { JsxElement } from "typescript";
import { parseRichText } from "./strapi/strapi_rich_text";


export const RenderProject = () => {
    const { id } = useParams()
    const { token, user, isLoading } = useAuthContext()
    const [project, setProject] = useState<ReactElement<any>>()

    useEffect(() => {
        if (isLoading) {
            setProject(
                <div>loading...</div>
            )
        } else {
            if (id) {
                fetch(getProject(id))
                    .then(x => x.json())
                    .then(x => (x.data as project_entry))
                    .then(x => {
                        if (user?.projects?.map(xx => xx.id).includes(x.id)) {
                            fetch((getMemberProject(id)), {
                                headers: { Authorization: `${BEARER} ${token}` }
                            })
                                .then(x => x.json())
                                .then(x => (x.data as project_entry))
                                .then(x => {
                                    const p = x.attributes.memberProject.data.attributes

                                    setProject(
                                        <div>
                                            <div>{x.attributes.title}</div>
                                            <div className="container">
                                                <div className="container">
                                                    <div>{p.description.title}</div>
                                                    <div>{p.description.description.map(x => parseRichText(x))}</div>
                                                </div>
                                                <div className="container">
                                                    {p.torveholdere.map(x => {
                                                        return (
                                                            <div className="container">
                                                                <div>{x.user.data.attributes.username}</div>
                                                                <div>{x.roleDescription.map(x => parseRichText(x))}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                        } else {
                            fetch(getPublicProject(id))
                                .then(x => x.json())
                                .then(x => (x.data as project_entry))
                                .then(x => {
                                    const p = x.attributes.publicProject.data.attributes;
                                    setProject(
                                        <div>
                                            <div>{x.attributes.title}</div>
                                            <div className="container">
                                                <div>{p.description.title}</div>
                                                <div>{p.description.description.map(x => parseRichText(x))}</div>
                                            </div>
                                            <div className="container">
                                                {p.leaders.map(x => {
                                                    return (
                                                        <div className="container">
                                                            <div>{x.user.data.attributes.username}</div>
                                                            <div>{x.roleDescription.map(x => parseRichText(x))}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    })
            }
        }


    }, [isLoading])


    return (
        <div>
            {project}
        </div>
    )
}

export const UpcomingProjectsProjectspage = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<ReactElement<any>>()

    useEffect(() => {
        fetch(getProjects())
            .then(x => x.json())
            .then(x => x.data as project_entry[])
            .then(x => x.filter(x => x.attributes.isUpcoming))
            .then(x => {
                setProjects(
                    <div className="w-full bg-white m-2">
                        <div className="text-6xl font-bold text-red text-center">Eventkalender</div>
                        <div className={`m-4 p-4 mx-auto grid grid-cols-${window.screen.width > 1400 ? '3' : '1'} gap-4 w-10/12 justify-top items-top`}>
                            {x.map(xx => {
                                return (
                                    <div className="p-2">
                                        <div className="container rounded drop-shadow-2xl">
                                            <div className="flex justify-center items-center">
                                                <img className="w-fit" src={getImageURL(xx.attributes.thumbnail.data.attributes.url ?? "").toString()} alt="" />
                                            </div>
                                            <div className="p-4">
                                                <div className="tracking-wider font-light text-red text-md">{xx.attributes.subtitle}</div>
                                                <div className="font-bold text-xl text-red">{xx.attributes.title}</div>
                                                <div>{xx.attributes.shortHook}</div>
                                                <div className="flex justify-center items-center my-5">
                                                    <div className="align-center text-sm text-center w-1/4 text-red font-light rounded-lg outline-red outline outline-1 hover:text-red cursor-pointer" onClick={() => navigate('/projects/' + xx.id)}>INFO</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div >

                )
            })
    }, [])

    return (
        <div>
            {projects}
        </div>
    )
}

export const UpcomingProjectsFrontpage = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<ReactElement<any>>()

    useEffect(() => {
        fetch(getProjects())
            .then(x => x.json())
            .then(x => x.data as project_entry[])
            .then(x => x.filter(x => x.attributes.isUpcoming))
            .then(x => {
                setProjects(
                    <div className="w-full bg-white py-20 z-0">
                        <div className="text-xl my-3 font text-red text-center">EVENTS</div>
                        <div className="text-3xl font-bold text-red text-center">Coming up..</div>
                        <div className={`m-4 p-4 mx-auto grid grid-cols-${window.screen.width > 1400 ? '3' : '1'} gap-4 w-10/12 justify-top items-top`}>
                            {x.map(xx => {
                                return (
                                    <div className="p-2">
                                        <div className="container rounded shadow-2xl">
                                            <div className="flex justify-center items-center">
                                                <img className="w-fit" src={getImageURL(xx.attributes.thumbnail.data.attributes.url ?? "").toString()} alt="" />
                                            </div>
                                            <div className="p-4">
                                                <div className="tracking-wider font-light text-red text-md">{xx.attributes.subtitle}</div>
                                                <div className="font-bold text-xl text-red">{xx.attributes.title}</div>
                                                <div className="text-black">{xx.attributes.shortHook}</div>
                                                <div className="flex justify-center items-center my-5">
                                                    <div className="align-center text-2xl text-center text-red hover:text-black cursor-pointer" onClick={() => navigate('/projects/' + xx.id)}>INFO</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>

                        <div className="flex justify-center item-center text-center mt-20">
                            <Link className="text-6xl font-light text-red text-center hover:cursor-pointer hover:text-black" to='/projects'>SE FLERE EVENTS</Link>
                        </div>


                    </div >

                )
            })
    }, [])

    return (
        <div>
            {projects}
        </div>
    )
}