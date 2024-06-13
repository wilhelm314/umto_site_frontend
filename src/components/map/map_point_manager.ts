import React, { useState } from "react";
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { OGCMapTile, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import { MapPoint } from "../strapi/strapi_entries";
import { Geometry } from "ol/geom";


export const [get_map_displaypoints, set_map_displaypoints] = useState(Array<MapPoint>);


export function map_points_layer() {
    const [get_vector_source, set_vector_source] = useState();


    const vectorLayer = new VectorLayer({
        source: get_vector_source,
    });

    return vectorLayer;
}


