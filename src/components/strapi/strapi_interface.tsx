import React, { useState } from "react";

export const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
export const api_address = 'http://localhost:1337'


// all URLs are with full populates

export function getCcProfile(id: number | string) {
    return new URL(`api/culture-contributers/${id}?populate[0]=Profile.image`, api_address)
}

export function getCcMapPoints() {
    return new URL('api/culture-contributers?populate[0]=MapPoint', api_address)
}

export function getCcMapPoint(id: number) {
    return new URL(`api/culture-contributers/${id}?populate[0]=MapPoint`, api_address)
}

export function getImageURL(path: string) {
    return new URL(path, api_address)
}

export function getProject(id: number | string) {
    return new URL(`api/projects/${id}?populate[0]=thumbnail`, api_address)
}

export function getProjects() {
    return new URL(`api/projects?populate[0]=thumbnail`, api_address)
}

export function getPublicProject(id: number | string) {
    return new URL(`api/projects/${id}?populate[0]=publicProject.leaders.user.profilePicture&populate[1]=publicProject.description.gallery&populate[2]=users&populate[3]=row.column.image&populate[4]=row.image&populate[5]=publicProject.description.image`, api_address)
}

export function getMemberProject(id: number | string) {
    return new URL(`api/projects/${id}?populate[0]=memberProject.torveholdere.user.profilePicture&populate[1]=memberProject.description.gallery&populate[2]=memberProject.externalLinks&populate[3]=row.column.image&populate[4]=row.image&populate[5]=memberProject.description.image`, api_address)
}

export function getTrophy(id: number | string) {
    return new URL(`api/trophies/${id}`, api_address)
}

export function getTrophies() {
    return new URL(`api/trophies`, api_address)
}

export function getAboutPage() {
    return new URL('api/about-page?populate[0]=row.column.image&populate[1]=row.image', api_address)
}

export function getFrontPage() {
    return new URL('api/frontpage?populate[0]=row.column.image&populate[1]=row.image', api_address)
}

export function getFooter() {
    return new URL('api/footer?populate[0]=row.column.image&populate[1]=row.image', api_address)
}

export function getSmukfestBuses() {
    return new URL('api/smukfest-buses?populate=*', api_address)
}

export function getSmukfestBus(id: number | string) {
    return new URL(`api/smukfest-buses/${id}?populate=*`, api_address)
}


export function getUserTrophies(id: number) {
    return new URL(`api/users/${id}?populate[0]=trophies`, api_address)
}

export function getUser(id: number) {
    return new URL(`api/users/${id}?populate[0]=profilePicture&populate[1]=projects&populate[2]=trophies`, api_address)
}

export function getNavbar() {
    return new URL('api/navbar?populate[0]=logo&populate[1]=navburger', api_address)
}

export const collections: { [key: string]: URL } = {
    cultureContributers: new URL("api/culture-contributers?populate[0]=MapPoint&populate[1]=Profile.gallery&populate[2]=contactPeople", api_address),
    users: new URL('api/users?populate[0]=profilePicture&populate[1]=projects&populate[2]=trophies', api_address),
    trophies: new URL('api/trophies', api_address),
    projects: new URL('api/projects?populate[0]=torveholdere.user&populate[1]=publicDescription&populate[2]=externalLinks&populate[3]=memberDescription', api_address)
};

