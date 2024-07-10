import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BEARER, getMemberProject, getProject, getPublicProject } from "../components/strapi/strapi_interface";
import { project_entry } from "../components/strapi/strapi_entries";
import { useAuthContext } from "../context/authContext";
import { JsxElement } from "typescript";


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
                                    setProject(
                                        <div>authorised</div>
                                    )

                                })
                        } else {
                            fetch(getPublicProject(id))
                                .then(x => x.json())
                                .then(x => (x.data as project_entry))
                                .then(x => {
                                    setProject(
                                        <div>not authorised</div>
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