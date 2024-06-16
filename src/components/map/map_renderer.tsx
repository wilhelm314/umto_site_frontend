import React, { useState, useEffect, useContext, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { culture_contributer_entry, culture_contributer_type } from '../strapi/strapi_entries';
import VectorSource from 'ol/source/Vector';
import { Geometry, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { collections } from '../strapi/strapi_interface';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { click } from '@testing-library/user-event/dist/click';
import { getCcEntryUrl } from '../strapi/strapi_interface';
import { Pixel } from 'ol/pixel';
import { translate } from 'ol/transform';
import { MPTooltip } from '../strapi/strapi_map_point';

export function MapComponent() {
    const source = useRef(new VectorSource());
    const [get_contributer_type, set_contributer_type] = useState<culture_contributer_type>()
    const [get_tooltip, set_tooltip] = useState<React.ReactElement>();
    const [get_cPixel, set_cPixel] = useState({ x: 0, y: 0 })

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

                if (x.length == 1) {
                    const id = x[0].getId() as number
                    const coord = (x[0].getGeometry() as Point).getCoordinates();
                    const cpixel = map.getPixelFromCoordinate(coord);
                    set_cPixel({ x: cpixel[0], y: cpixel[1] });


                    fetch(getCcEntryUrl(id))
                        .then(x => x.json())
                        .then((x) => {
                            const xx = x.data as culture_contributer_entry;
                            set_tooltip(MPTooltip(xx.attributes.MapPoint));
                        });
                } else {
                    set_tooltip(undefined);
                }
            });

            map.on(['pointerdrag', 'movestart'], function (evt) {
                set_tooltip(undefined);
            });


        });



        // TODO: unsubscibe map eventhandlers
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
            <div style={{ height: '600px', width: '800px' }} id="map" className="map-container relative">
                <div id='tooltip' style={{ top: `${get_cPixel.y}px`, left: `${get_cPixel.x}px` }} className={`absolute w-50 h-50 z-50 -translate-y-[110%] -translate-x-1/2 `}>{get_tooltip}</div>
            </div>

            <button key="bv" onClick={() => {
                set_tooltip(undefined);
                return set_contributer_type("venue");
            }}>venue</button>
            <button key="by" onClick={() => {
                set_tooltip(undefined);
                return set_contributer_type("youthHouse");
            }}>youthHouse</button>
        </div>
    );
}
