import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BEARER, getMemberProject, getProject, getPublicProject, getProjects } from "./strapi/strapi_interface";
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

export const Projects = () => {

    const [projects, setProjects] = useState<ReactElement<any>>()

    useEffect(() => {
        fetch(getProjects())
            .then(x => x.json())
            .then(x => x.data as project_entry[])
            .then(x => {
                setProjects(
                    <div>
                        {x.map(xx => {
                            return (
                                <a key={xx.id} className="m-1 hover:text-red" href={'/projects/' + xx.id}>{xx.attributes.title}</a>
                            )
                        })}
                    </div>
                )
            })
    }, [])

    return (
        <div>
            {projects}
        </div>
    )
}