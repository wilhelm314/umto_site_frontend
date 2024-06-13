import React from "react";
import { collections } from "../strapi/strapi_interface";
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { OGCMapTile, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';





export function map_points_layer() {
    const vectorSource = new VectorSource({
        features:
            [new Feature({
                geometry: new Point(fromLonLat([-3.683333, 40.4])),
            }),]
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    return vectorLayer;
}


