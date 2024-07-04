import React, { useState } from "react";

const AUTH_TOKEN = "authToken";
export const BEARER = "Bearer";
export const api_adress = 'http://localhost:1337'

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
};



// all URLs are with full populates

export function getCcProfile(id: number | string) {
    return new URL(`api/culture-contributers${"/" + id}?populate[0]=Profile.gallery`, api_adress)
}

export function getCcMapPoints() {
    return new URL('api/culture-contributers?populate[0]=MapPoint', api_adress)
}

export function getCcMapPoint(id: number) {
    return new URL(`api/culture-contributers${"/" + id}?populate[0]=MapPoint`, api_adress)
}

export function getImageURL(path: string) {
    return new URL(path, api_adress)
}

export function getAboutPageURL() {
    return new URL('api/about-page?populate[0]=row.column', api_adress)
}

export const collections: { [key: string]: URL } = {
    blogposts: new URL("api/blogposts", api_adress),
    culture_contributers: new URL("api/culture-contributers?populate[0]=MapPoint&populate[1]=Profile.gallery&populate[2]=contactPeople", api_adress),
    tests: new URL("api/tests?populate=*", api_adress)

};

