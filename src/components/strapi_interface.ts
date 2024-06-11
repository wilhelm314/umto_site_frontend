import React, { useState } from "react";

export type blogpost_entry = {
    id: number,
    attributes: {
        Title: string,
        createdAt: string,
        updateAt: string,
        publishedAt: string
    }
}

const api_adress = 'http://localhost:1337'
export const collections: { [key: string]: URL } = {
    blogposts: new URL("api/blogposts", api_adress)
};

