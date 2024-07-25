import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrophies, getTrophy } from "./strapi/strapi_interface";
import { trophy_entry } from "./strapi/strapi_entries";
import { parseRichText } from "./strapi/strapi_rich_text";


export const RenderTrophy = () => {
    const { id } = useParams()
    const [trophy, setTrophy] = useState<ReactElement<any>>()

    useEffect(() => {
        if (id) {
            fetch(getTrophy(id))
                .then(x => x.json())
                .then(x => x.data as trophy_entry)
                .then(x => {
                    setTrophy(
                        <div>
                            <div>{x.attributes.title}</div>
                            <div>{x.attributes.description.map(x => parseRichText(x))}</div>
                        </div>
                    )
                })
        }

    }, [id])


    return (
        <div>
            {trophy}
        </div>
    )
}

export const Trophies = () => {

    const [trophies, setTrophies] = useState<ReactElement<any>>()

    useEffect(() => {
        fetch(getTrophies())
            .then(x => x.json())
            .then(x => x.data as trophy_entry[])
            .then(x => {
                setTrophies(
                    <div>
                        {x.map(xx => {
                            return (
                                <a key={xx.id} className="m-1 hover:text-red" href={'/trophies/' + xx.id}>{xx.attributes.title}</a>
                            )
                        })}
                    </div>
                )
            })
    }, [])

    return (
        <div>
            {trophies}
        </div>
    )
}