import React, { useState, useEffect, useContext, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { culture_contributer_entry, culture_contributer_type } from '../strapi/strapi_entries';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { collections } from '../strapi/strapi_interface';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';

export function MapComponent() {
    const source = useRef(new VectorSource());
    const [get_contributer_type, set_contributer_type] = useState<culture_contributer_type>()

    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })
        const pointsLayer = new VectorLayer({ source: source.current });
        const map = new Map({
            target: "map",
            layers: [osmLayer, pointsLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });



        return () => { if (map) map.setTarget(undefined) }
    }, []);

    useEffect(() => {
        fetch(collections.culture_contributers)
            .then(x => x.json())
            .then(x => {
                source.current.clear();
                source.current.addFeatures(x.data
                    .filter((x: culture_contributer_entry) => x.attributes.tag == get_contributer_type)
                    .map((x: culture_contributer_entry) => new Feature({
                        geometry: new Point(fromLonLat([x.attributes.MapPoint.longitude, x.attributes.MapPoint.lattitude])),

                    })));
            });
    }, [get_contributer_type])
    return (
        <div key="m1">
            <div style={{ height: '600px', width: '800px' }} id="map" className="map-container" />
            <button key="bv" onClick={() => set_contributer_type("venue")}>venue</button>
            <button key="by" onClick={() => set_contributer_type("youthHouse")}>youthHouse</button>
        </div>
    );
}

