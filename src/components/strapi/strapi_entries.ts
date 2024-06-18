import React from "react";
import { rich_text_element } from "./strapi_rich_text";
import { EnumType } from "typescript";
import { MapPoint } from "./strapi_map_point";


export type blogpost_entry = {
    id: number,
    attributes: {
        Title: string,
        createdAt: string,
        updateAt: string,
        publishedAt: string
    }
}

export type test_entry = {
    id: number,
    attributes: {
        richtext: rich_text_element[],
        createdAt: string,
        updateAt: string,
        publishedAt: string
    }
}

export type culture_contributer_type = "venue" | "youthHouse";

export type culture_contributer_entry = {
    id: number,
    attributes: {
        tag: culture_contributer_type,
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        MapPoint: MapPoint
    },
    Profile: {
        id: number,
        title: string,
        richtext: rich_text_element[],
        address: string
    },
    ContactInformation: {
        id: number,
        Contacts: { id: number, name: string, role: string, email: string, phone: string }[]
    }
}

