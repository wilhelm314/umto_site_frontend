import React, { useState } from "react";


const api_adress = 'http://localhost:1337'
export const collections: { [key: string]: URL } = {
    blogposts: new URL("api/blogposts", api_adress),
    tests: new URL("api/tests", api_adress)
};

