import React from "react";
import { rich_text_element } from "./strapi_rich_text";
import { EnumType } from "typescript";
import { MapPoint } from "./strapi_map_point";

export type image = {
    data: image_data
}

export type user = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}


type image_data = {
    id: number
    attributes: {
        name: string,
        alternativeText: string,
        caption: string,
        width: number,
        height: number,
        formats: any,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: any,
        provider: string,
        provider_metadata: any,
        createdAt: string,
        updatedAt: string
    }
}

export type gallery = {
    data: image_data[]
}

export type culture_contributer_type = "venue" | "youthHouse";

export type column_component = {
    id: number,
    richtext: rich_text_element[],
    title: string,
}

export type row_component = {
    id: number,
    column: column_component[]
}

export type page_entry = {
    id: number,
    attributes: {
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        row: row_component[]
    }
}

export type culture_contributer_entry = {
    id: number,
    attributes: {
        type: culture_contributer_type,
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        MapPoint: MapPoint

        Profile: {
            id: number,
            title: string,
            richtext: rich_text_element[],
            address: string
            gallery: gallery
        },

        contactPeople: { id: number, name: string, role: string, email: string, phone: string }[]

    }
}

