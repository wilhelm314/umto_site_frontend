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
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { click } from '@testing-library/user-event/dist/click';
import { getCcEntryUrl } from '../strapi/strapi_interface';

export function MapComponent() {
    const source = useRef(new VectorSource());
    const [get_contributer_type, set_contributer_type] = useState<culture_contributer_type>()

    useEffect(() => {
        const mapLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })
        const pointsLayer = new VectorLayer({
            source: source.current,
        });
        const map = new Map({
            target: "map",
            layers: [mapLayer, pointsLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });

        map.on('click', function (evt) {
            const pixel = map.getEventPixel(evt.originalEvent);
            pointsLayer.getFeatures(pixel).then(x => {

                if (x.length > 0) {
                    const id = x[0].getId() as number
                    fetch(getCcEntryUrl(id))
                        .then(x => x.json())
                        .then((x: culture_contributer_entry) => {
                            console.log(x);

                        });
                }
                else {

                }


            });

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
                    .map((x: culture_contributer_entry) => {
                        const feature = new Feature({
                            geometry: new Point(fromLonLat([x.attributes.MapPoint.longitude, x.attributes.MapPoint.lattitude])),
                        });
                        feature.setId(x.id);
                        feature.setStyle(new Style({
                            image: new CircleStyle({
                                radius: 8,
                                fill: new Fill({
                                    color: 'rgba(255, 153, 0, 0.4)'
                                }),
                                stroke: new Stroke({
                                    color: 'rgba(255, 153, 0, 0.4)',
                                    width: 2
                                }),
                            })
                        }))
                        return feature
                    }

                    ));
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

function tooltip() {
    return (
        <div id='tooltip' className='absolute'>tooltip</div>

    )
}