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
    title: string,
    subtitle: string,
    shortHook: string,
    thumbnail: image,
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
        row: row_component,
        description: {
            title: string,
            description: rich_text_element[],
            gallery: gallery,
            image: image
        }
        leaders: {
            id: number,
            user: {
                data: user_relation
            }
            roleDescription: string
        }[]
    }
}

export type member_project_entry = {
    id: number,
    attributes: {
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        row: row_component,
        torveholdere: {
            user: {
                data: user_relation
            },
            roleDescription: string
        }[]
        externalLinks: {
            title: string,
            link: string,
            shortHook: string
        }
        description: {
            title: string,
            description: rich_text_element[],
            gallery: gallery,
            image: image
        }
    }
}

export type project_entry = {
    id: number,
    attributes: {
        isUpcoming: boolean,
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        title: string,
        subtitle: string,
        shortHook: string,
        thumbnail: image,
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

export type culture_contributer_type = "venue" | "youthHouse" | 'smukBus';

export type column_component = {
    id: number,
    richtext: rich_text_element[],
    title: string,
    image: image
}

export type row_component = {
    id: number,
    column: column_component[]
    image: image,
    title: string
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

export type footer_entry = {
    id: number,

    attributes: {
        title: string,
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        row: row_component[]
    }
}

export type navbar_entry = {
    id: number,
    attributes: {
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        logo: image,
        navburger: image
    }
}

export type smukbus_entry = {
    id: number,
    attributes: {
        type: culture_contributer_type,
        createdAt: string,
        updateAt: string,
        publishedAt: string,
        mapPoint: MapPoint
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
            shortHook: string,
            address: string,
            image: image
        },

        contactPeople: { id: number, name: string, role: string, email: string, phone: string }[]

    }
}

