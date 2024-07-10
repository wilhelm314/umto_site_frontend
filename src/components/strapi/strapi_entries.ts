import React from "react";
import { rich_text_element } from "./strapi_rich_text";
import { EnumType } from "typescript";
import { MapPoint } from "./strapi_map_point";

export type image = {
    data: image_data
}

export type user_entry = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
    description: rich_text_element[],
    phone: string,
    profilePicture: image,
    trophies: user_trophy_relation[]
    projects: user_project_relation[]
}

type user_project_relation = {
    id: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    title: string
}

type user_trophy_relation = {
    id: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    title: string,
    description: rich_text_element[]
}

export type trophy_entry = {
    id: number,
    attributes: {
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        title: string,
        description: rich_text_element[]
    }
}

type user_relation = {

    id: number,
    attributes: {
        username: string,
        email: string,
        provider: string,
        confirmed: boolean,
        blocked: boolean,
        createdAt: string,
        updatedAt: string
        description: rich_text_element[],
        phone: string,
        profilePicture: image,
        trophies: {
            data: trophy_entry
        },
        projects: {
            data: project_entry
        }
    }


}

export type public_project_entry = {
    id: number,
    attributes: {
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        description: {
            id: number,
            title: string,
            description: rich_text_element[]
        }
        leaders: {
            id: number,
            user: {
                data: user_relation
            }
            roleDescription: rich_text_element[]
        }[]
    }
}

export type member_project_entry = {
    id: number,
    attributes: {
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        torveholdere: {
            user: {
                data: user_relation
            },
            roleDescription: rich_text_element[]
        }[]
        externalLinks: {
            title: string,
            link: string,
            shortHook: string
        }
        description: {
            title: string,
            description: rich_text_element[]
        }
    }
}

export type project_entry = {
    id: number,
    attributes: {
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        title: string,
        users: user_relation[],
        publicProject: {
            data: public_project_entry
        }
        memberProject: {
            data: member_project_entry
        }
    }

}

type torveholder = {
    id: number,
    roleDescription: rich_text_element[],
    user: {
        data: user_relation
    }
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

