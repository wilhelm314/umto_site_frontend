import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BEARER, getMemberProject, getProject, getPublicProject, getProjects, getImageURL } from "./strapi/strapi_interface";
import { project_entry } from "./strapi/strapi_entries";
import { useAuthContext } from "../context/authContext";
import { JsxElement } from "typescript";
import { parseRichText } from "./strapi/strapi_rich_text";
import { SmukBusMap } from "./map/smuk_bus_map";


const MembersProject = (x: project_entry) => {

    const p = x.attributes.memberProject.data.attributes

    return (
        <div className="bg-white">



            <div style={{
                backgroundImage: `url(${getImageURL(p.description.image.data.attributes.url ?? "").toString()})`,
                height: '50vh'
            }} className="bg-fixed bg-no-repeat bg-cover p-2">

                <div className="flex justify-center items-center h-full">
                    <div className="text-6xl my-3 font-bold text-red text-center align-middle">{x.attributes.title}</div>
                </div>


            </div>


            <div className="bg-white p-5">
                <div className="flex flex-col justify-start">
                    <div className="text-red text-6xl py-2">{p.description.title}</div>
                    <div className="flex justify-start my-2">
                        <div className="p-px bg-red w-1/2"></div>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="text-lg leading-8 p-2">{p.description.description.map(x => parseRichText(x))}</div>
                    <div className="p-4">
                        <div style={{
                            backgroundImage: `url(${getImageURL(p.description.gallery.data[0].attributes.url ?? "").toString()})`
                        }} className="bg-no-repeat bg-cover p-2 h-full w-full">
                        </div>
                    </div>


                </div>


            </div>

            <div className="flex justify-center my-2">
                <div className="p-px bg-red w-full"></div>
            </div>



            <div>
                <div className="flex flex-col bg-white h-fit py-20">
                    <div className="flex justify-center">
                        <div className="text-red font-bold text-3xl p-5">Torveholdere</div>
                    </div>
                    <div className={`grid grid-cols-3 gap-3 h-fit`}>
                        {p.torveholdere.map(x => {
                            return (

                                <div className="container flex-col shadow-lg">

                                    <div className="w-full basis-1/2">
                                        <img className="h-full w-full object-cover" src={getImageURL(x.user.data.attributes.profilePicture.data.attributes.url).toString()} alt="" />
                                    </div>
                                    <div className="p-4">

                                        <div className="flex justify-center">
                                            <div className="text-3xl tracking-wider">{x.user.data.attributes.username}</div>
                                        </div>
                                        <div className="text-lg">{x.roleDescription}</div>
                                        <div className="flex justify-start py-4">
                                            <div className="w-1/2 font-bold text-xl">{x.user.data.attributes.email}</div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>




        </div >
    )

}

const PublicProject = (x: project_entry) => {
    const p = x.attributes.publicProject.data.attributes;
    return (
        <div className="bg-white">



            <div style={{
                backgroundImage: `url(${getImageURL(p.description.image.data.attributes.url ?? "").toString()})`,
                height: '50vh'
            }} className="bg-fixed bg-no-repeat bg-cover p-2">

                <div className="flex justify-center items-center h-full">
                    <div className="text-6xl my-3 font-bold text-red text-center align-middle">{x.attributes.title}</div>
                </div>


            </div>


            <div className="bg-white p-5">
                <div className="flex flex-col justify-start">
                    <div className="text-red text-6xl py-2">{p.description.title}</div>
                    <div className="flex justify-start my-2">
                        <div className="p-px bg-red w-1/2"></div>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="text-lg leading-8 p-2">{p.description.description.map(x => parseRichText(x))}</div>
                    <div className="p-4">
                        <div style={{
                            backgroundImage: `url(${getImageURL(p.description.gallery.data[0].attributes.url ?? "").toString()})`
                        }} className="bg-no-repeat bg-cover p-2 h-full w-full">
                        </div>
                    </div>


                </div>


            </div>

            <div className="flex justify-center my-2">
                <div className="p-px bg-red w-full"></div>
            </div>



            <div>
                <div className="flex flex-col bg-white h-fit py-20">
                    <div className="flex justify-center">
                        <div className="text-red font-bold text-3xl p-5">Torveholdere</div>
                    </div>
                    <div className={`grid grid-cols-3 gap-3 h-fit`}>
                        {p.leaders.map(x => {

                            return (

                                <div className="container flex-col shadow-lg h-fit">

                                    <div className="w-full h-1/2">
                                        {
                                            x.user.data.attributes.profilePicture.data
                                                ?
                                                <img className="h-full w-full object-cover" src={getImageURL(x.user.data.attributes.profilePicture.data.attributes.url).toString()} alt="" />
                                                :
                                                ''
                                        }
                                    </div>
                                    <div className="p-4">

                                        <div className="flex justify-center">
                                            <div className="text-3xl tracking-wider">{x.user.data.attributes.username ?? ''}</div>
                                        </div>
                                        <div className="text-lg">{x.roleDescription}</div>
                                        <div className="flex justify-start py-4">
                                            <div className="w-1/2 font-bold text-xl">{x.user.data.attributes.email ?? ''}</div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>




        </div >
    )
}


export const Project = () => {
    const { id } = useParams()
    const { token, user, isLoading } = useAuthContext()
    const [project, setProject] = useState<project_entry | undefined>(undefined)

    function Render(x: project_entry | undefined) {
        if (x) {
            if (x.attributes.publicProject) {
                return (
                    PublicProject(x)
                )
            }
            else {
                return (
                    MembersProject(x)
                )
            }
        } else {
            return (
                <div>loading...</div>
            )
        }
    }

    useEffect(() => {
        if (isLoading) {
            setProject(undefined)
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
                                    setProject(x)
                                })
                        } else {
                            fetch(getPublicProject(id))
                                .then(x => x.json())
                                .then(x => (x.data as project_entry))
                                .then(x => {
                                    setProject(x)
                                })
                        }
                    })
            }
        }

    }, [isLoading])


    return (
        <div>
            {Render(project)}
            {id == '1'
                ?
                <div>{SmukBusMap()}</div>
                :
                <div></div>
            }
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
                                        <div className="container rounded shadow-2xl overflow-hidden">
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
                            <Link className="drop-shadow-md text-6xl font-light text-red text-center hover:cursor-pointer hover:text-black" to='/projects'>SE FLERE EVENTS</Link>
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