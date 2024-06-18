import React, { useState, useEffect, useContext, useRef, ReactElement } from 'react';
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
import { cursorTo } from 'readline';
import { createIncrementalCompilerHost } from 'typescript';
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';





export function MapRowComponent() {
    const source = useRef(new VectorSource());
    const [get_active_culture_contributer, set_active_culture_contributer] = useState<culture_contributer_entry>()
    const [get_active_profile_display, set_active_profile_display] = useState<ReactElement>()
    const [get_contributer_types, set_contributer_types] = useState<culture_contributer_type[]>([])
    const [get_tooltip, set_tooltip] = useState<React.ReactElement>();
    const [get_cPixel, set_cPixel] = useState({ x: 0, y: 0 })


    // generates map and listens for input
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

        map.on('pointermove', function (evt) {
            const pixel = map.getEventPixel(evt.originalEvent);
            pointsLayer.getFeatures(pixel).then(x => {

                if (x.length == 1) {
                    map.getTargetElement().style.cursor = 'pointer';
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
                    // this doesnt work when u get the mouse on top of the tooltip quickly
                    set_tooltip(undefined);
                    map.getTargetElement().style.cursor = 'auto';
                }
            });
        });

        map.on('click', function (evt) {
            const pixel = map.getEventPixel(evt.originalEvent);
            pointsLayer.getFeatures(pixel).then(x => {
                if (x.length == 1) {
                    fetch(getCcEntryUrl(x[0].getId() as number))
                        .then(x => x.json())
                        .then((x) => {
                            set_active_culture_contributer(x.data as culture_contributer_entry)
                        });
                }
            });
        });

        map.on('movestart', function (evt) {
            set_tooltip(undefined);
            map.getTargetElement().style.cursor = 'auto';
        })

        // TODO: unsubscibe map eventhandlers
        return () => { if (map) map.setTarget(undefined) }
    }, []);


    // generates map features
    useEffect(() => {
        fetch(collections.culture_contributers)
            .then(x => x.json())
            .then(x => {
                source.current.clear();
                source.current.addFeatures(x.data
                    .filter((x: culture_contributer_entry) => get_contributer_types.includes(x.attributes.tag))
                    .map((x: culture_contributer_entry) => {
                        console.log(get_contributer_types);

                        const feature = new Feature({
                            geometry: new Point(fromLonLat([x.attributes.MapPoint.longitude, x.attributes.MapPoint.lattitude])),
                        });
                        // bounding box doesnt match shape
                        feature.setId(x.id);
                        feature.setStyle(new Style({
                            image: new CircleStyle({
                                radius: 7,
                                fill: new Fill({
                                    color: '#FFFFFF'
                                }),
                                stroke: new Stroke({
                                    color: '#FF4747',
                                    width: 2
                                }),
                            })
                        }))
                        return feature
                    }

                    ));
            });
    }, [get_contributer_types])

    // generates colture contrubter profile
    useEffect(() => {
        const p = get_active_culture_contributer?.Profile
        set_active_profile_display(() => {
            return (
                <div id='pp'>
                    <h1>{p?.title}</h1>

                </div>
            )
        });


    }, [get_active_culture_contributer])


    return (
        <div key="m1" className='container flex flex-row p-10 mx-auto max-w-full'>
            <div id='filter' className='container basis-1/12 p-2'>

                <div>
                    <input type="checkbox" id="ch1" name='test' onChange={(e) => {
                        e.target.checked
                            ? set_contributer_types((p) => [...get_contributer_types, 'venue'])
                            : set_contributer_types(() => {
                                var x = get_contributer_types;
                                return x.filter(xx => xx !== 'venue');
                            })
                    }} />
                    <label htmlFor="ch1">venues</label>
                </div>

                <div>
                    <input type="checkbox" id="ch2" onChange={(e) => {
                        e.target.checked
                            ? set_contributer_types((p) => [...get_contributer_types, 'youthHouse'])
                            : set_contributer_types(() => {
                                var x = get_contributer_types;
                                return x.filter(xx => xx !== 'youthHouse');
                            })
                    }} />
                    <label htmlFor="ch2">youth houses</label>
                </div>

            </div>

            <div style={{ height: '600px', width: '800px' }} id="map" className="map-container relative basis-5/12">
                <div id='tooltip' style={{ top: `${get_cPixel.y}px`, left: `${get_cPixel.x}px` }} className={'absolute z-50 -translate-y-[120%] -translate-x-1/2 pointer-events-none'}>{get_tooltip}</div>
            </div>

            <div id='profile_display' className='basis 6/12'>
                {get_active_profile_display}
            </div>

        </div>
    );
}
