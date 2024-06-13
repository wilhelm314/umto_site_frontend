import React from "react";
import { rich_text_element } from "./strapi_rich_text";

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
        publishedAt: string
        MapPoint: {
            id: number,
            title: string,
            lattitude: number,
            longitude: number,
            richtext: rich_text_element[],
        },
        Profile: {
            id: number,
            title: string,
            richtext: rich_text_element[]
        },
        ContactInformation: {
            id: number,
            ContactPerson: {
                id: number,
                name: string,
                role: string,
                email: string,
                phone: string
            }
        }
    }
}
