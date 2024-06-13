import React from "react";
import { rich_text_element } from "./strapi_rich_text";

export type MapPoint = {
    ref?: URL,
    id: number,
    title: string,
    lattitude: number,
    longitude: number,
    richtext: rich_text_element[]
    image: {
        name: string,
        alternativeText: string,
        url: string,
        caption: string,
        width: number,
        height: number,
        formats: any
    }
}

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

export type venue_entry = {
    id: number,
    attributes: {
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        MapPoint: MapPoint
    },
    Profile: {
        id: number,
        title: string,
        richtext: rich_text_element[]
    },
    ContactInformation: {
        id: number,
        Contacts: { id: number, name: string, role: string, email: string, phone: string }[]
    }
}

