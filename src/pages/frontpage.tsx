import React, { useEffect, useState } from "react";
import { page_entry } from "../components/strapi/strapi_entries";
import { getFrontPage, getImageURL } from "../components/strapi/strapi_interface";
import { parseRichText } from "../components/strapi/strapi_rich_text";
import { Link, useNavigate } from "react-router-dom";
import { UpcomingProjectsFrontpage } from "../components/projects";
import { MapRowComponent } from "../components/map/map_component";
import { useRowStyle } from "antd/es/grid/style";




export function Frontpage() {
    const navigate = useNavigate()
    const [frontpage, setFrontpage] = useState<page_entry>()
    useEffect(() => {
        fetch(getFrontPage())
            .then(x => x.json())
            .then(x => x.data as page_entry)
            .then(x => setFrontpage(x))
    }, [])

    const HeroSection = () => {
        return (
            <div style={{
                backgroundImage: `url(${getImageURL(frontpage?.attributes.row[0].image.data.attributes.url ?? '').toString()})`
            }} className={'w-full h-screen bg-fixed bg-cover'}>
                <img src={getImageURL(frontpage?.attributes.row[0].column[0].image.data.attributes.url ?? '').toString()} alt="" />
            </div>
        )
    }

    const UMTO = () => {
        return (
            <div className="w-full bg-red text-white p-32 text-2xl flex">
                <div className="basis-1/2">
                    <div className="text-4xl font-light my-10">{frontpage?.attributes.row[1].column[0].title}</div>
                    <div>{frontpage?.attributes.row[1].column[0].richtext.map(x => parseRichText(x))}</div>
                    <div className="font-bold my-10 "><Link className="hover:text-black" to='/organisation'>Læs mere</Link></div>

                </div>
            </div>
        )
    }

    const Team = () => {
        const x = frontpage?.attributes.row[4].column[0]
        return (
            <div className="bg-white">

                <div style={{
                    backgroundImage: `url(${getImageURL(frontpage?.attributes.row[4].image.data.attributes.url ?? "").toString()})`,
                    height: '50vh'
                }} className="bg-fixed bg-no-repeat bg-cover p-2">

                    <div className="flex justify-center items-center h-full">
                        <div className="text-6xl my-3 font-bold text-red text-center align-middle">{x?.title}</div>
                    </div>



                </div>

                <div className="bg-white h-fit py-20 px-4">
                    <div className=" h-full w-full">
                        <div className="flex flex-col h-full w-full p-2">
                            <div className="">
                                <div className="flex justify-start basis-1/2 items-left">
                                    <div className="text-6xl font-bold text-red text-center">Hvem er vi?</div>
                                </div>
                                <div className=" my-2 p-px w-1/2 bg-black"></div>
                            </div>
                            <div className={"grid gap-4 p-10 " + `${window.screen.width / window.screen.height < 2 / 3 ? 'grid-rows-2' : 'grid-cols-2'}`}>
                                <div className="bg-white w-full">
                                    <div className="text-black text-xl">{x?.richtext.map(x => parseRichText(x))}</div>
                                </div>
                                <div className="h-full w-full">
                                    <div className="flex justify-center items-center align-middle h-full">
                                        <div className="text-6xl text-red text-center align-middle hover:cursor-pointer hover:text-black" onClick={() => navigate('/organisation')} >MERE OM OS</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>

            </div>

        )
    }

    return (
        <div>
            {HeroSection()}
            {UMTO()}
            {UpcomingProjectsFrontpage()}
            <div className="bg-red py-28 px-8">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <div>
                        <div className="text-white my-5 text-lg">COMMUNITY</div>
                        <div className="text-white font-bold text-3xl">{frontpage?.attributes.row[3].column[0].title}</div>
                        <div className="my-5 text-black text-lg">{frontpage?.attributes.row[3].column[0].richtext.map(x => parseRichText(x))}</div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex justify-end mx-10">
                            <span className="drop-shadow-md text-6xl font-light text-white rounded-lg text-center align-middle hover:cursor-pointer hover:text-black " onClick={() => navigate('/community')}>MERE OM COMMUNITY</span>
                        </div>
                    </div>

                </div>

            </div>
            <div className="bg-white py-28 px-8">
                <div className="flex my-10 justify-center items-center">
                    <div className="bg-red p-0.5 w-2/3"></div>
                </div>
                <div className="p-2 ">
                    {MapRowComponent()}
                </div>
                <div className="flex my-10 justify-center items-center">
                    <div className="bg-red p-0.5 w-2/3"></div>
                </div>
            </div>



            {Team()}

        </div>
    )
}