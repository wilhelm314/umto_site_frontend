import React, { useState } from "react";

export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
export const api_adress = 'http://localhost:1337'


// all URLs are with full populates

export function getCcProfile(id: number | string) {
    return new URL(`api/culture-contributers/${id}?populate[0]=Profile.gallery`, api_adress)
}

export function getCcMapPoints() {
    return new URL('api/culture-contributers?populate[0]=MapPoint', api_adress)
}

export function getCcMapPoint(id: number) {
    return new URL(`api/culture-contributers/${id}?populate[0]=MapPoint`, api_adress)
}

export function getImageURL(path: string) {
    return new URL(path, api_adress)
}

export function getProject(id: number | string) {
    return new URL(`api/projects/${id}`, api_adress)
}

export function getPublicProject(id: number | string) {
    return new URL(`api/projects/${id}?populate[0]=publicProject.leaders.user&populate[1]=publicProject.description&populate[2]=users`, api_adress)
}

export function getMemberProject(id: number | string) {
    return new URL(`api/projects/?populate[0]=memberProject.torveholdere.user&populate[1]=memberProject.description&populate[2]=memberProject.externalLinks${id}`, api_adress)
}


export function getTrophy(id: number) {
    return new URL(`api/trophies/${id}`, api_adress)
}

export function getAboutPageURL() {
    return new URL('api/about-page?populate[0]=row.column', api_adress)
}

export function getUserTrophies(id: number) {
    return new URL(`api/users/${id}?populate[0]=trophies`, api_adress)
}

export function getUser(id: number) {
    return new URL(`api/users/${id}?populate[0]=profilePicture&populate[1]=projects&populate[2]=trophies`, api_adress)
}

export const collections: { [key: string]: URL } = {
    cultureContributers: new URL("api/culture-contributers?populate[0]=MapPoint&populate[1]=Profile.gallery&populate[2]=contactPeople", api_adress),
    users: new URL('api/users?populate[0]=profilePicture&populate[1]=projects&populate[2]=trophies', api_adress),
    trophies: new URL('api/trophies', api_adress),
    projects: new URL('api/projects?populate[0]=torveholdere.user&populate[1]=publicDescription&populate[2]=externalLinks&populate[3]=memberDescription', api_adress)
};

