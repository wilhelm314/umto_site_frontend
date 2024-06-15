import React, { useState } from "react";


const api_adress = 'http://localhost:1337'

// all URLs are with full populates

export function getCcEntryUrl(id: number) {
    return new URL(`api/culture-contributers${"/" + id}?populate[0]=MapPoint&populate[1]=Profile&populate[2]=contactInformation&populate[3]=contactInformation.contactPerson`, api_adress)
}

export const collections: { [key: string]: URL } = {
    blogposts: new URL("api/blogposts", api_adress),
    culture_contributers: new URL("api/culture-contributers?populate[0]=MapPoint&populate[1]=Profile&populate[2]=contactInformation&populate[3]=contactInformation.contactPerson", api_adress),
    tests: new URL("api/tests", api_adress)

};

