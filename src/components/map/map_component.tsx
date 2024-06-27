import React, { useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { culture_contributer_entry, culture_contributer_type } from '../strapi/strapi_entries';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { collections, getCcMapPoint, getCcMapPoints, getImageURL } from '../strapi/strapi_interface';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { getCcProfile } from '../strapi/strapi_interface';
import { MPTooltip, MapPoint } from '../strapi/strapi_map_point';
import { ImageSlider } from '../ImageSlider';
import { parseRichText } from '../strapi/strapi_rich_text';
import { Link, Route, Routes } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { hover } from '@testing-library/user-event/dist/hover';


function useSearchParam(key: string): [string | null, (val: string | number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const [param, setParam] = useState(searchParams.get(key));
    const setValue = (value: string | number) => {
        setSearchParams((sold) => {
            sold.set(key, value.toString())
            return sold;
        });
    };

    useEffect(() => {
        setParam(searchParams.get(key));
    }, [searchParams]);

    return [param, setValue]
}






export function MapRowComponent() {
    const source = useRef(new VectorSource<Feature<Point>>());
    const [ActiveProfileDisplay, setActiveProfileDisplay] = useState<ReactElement>()
    const [ContributerTypes, setContributerTypes] = useState<culture_contributer_type[]>([])
    const [tooltipMapPoint, setTooltipMapPoint] = useState<{ id: number, mapPoint: MapPoint }>();
    const [cPixel, setCPixel] = useState({ x: 0, y: 0 })
    const [ttVisible, setTtVisible] = useState(false);
    const [cc, setValue] = useSearchParam("cc");
    const map = useRef<Map>(new Map)


    useEffect(() => {
        fetch(getCcProfile(cc ? cc : ""))
            .then(x => x.json())
            .then((x) => {
                const p = (x.data as culture_contributer_entry)?.attributes.Profile;
                setActiveProfileDisplay(() => {
                    const imgURLs = p?.gallery.data.map(x => getImageURL(x.attributes.url))
                    return (
                        <div id='pp' className='container'>
                            <h1>{p?.title}</h1>
                            <p>{p?.address}</p>
                            <div className=''>{imgURLs ? <ImageSlider src={imgURLs} /> : ""}</div>
                            <div>{p?.richtext.map(x => parseRichText(x))}</div>
                        </div>
                    )
                })
            });
    }, [cc]);





    useEffect(() => {

        const mapLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })
        const pointsLayer = new VectorLayer({
            source: source.current,
        });
        map.current = new Map({
            target: "map",
            layers: [mapLayer, pointsLayer],
            view: new View({
                center: [0, 0],
                zoom: 0,
            }),
        });

        map.current.on('click', function (evt) {
            const pixel = map.current.getEventPixel(evt.originalEvent);
            pointsLayer.getFeatures(pixel).then(x => {
                if (x.length == 1) {
                    setValue(x[0].getId() ?? "");
                }

                return;
            });
        });

        map.current.on('movestart', function (evt) {
            setTtVisible(false);
            map.current.getTargetElement().style.cursor = 'auto';
        })

        // TODO: unsubscibe map eventhandlers
        return () => { if (map.current) map.current.setTarget(undefined) }
    }, []);



    useEffect(() => {

        function ttfunq(evt: MapBrowserEvent<any>) {
            const pixel = map.current.getEventPixel(evt.originalEvent);
            const x = map.current.getFeaturesAtPixel(pixel);

            if (x.length == 1) {
                map.current.getTargetElement().style.cursor = 'pointer';
                const _id = x[0].getId() as number
                const pcoord = (x[0].getGeometry() as Point).getCoordinates();
                const cpixel = map.current.getPixelFromCoordinate(pcoord);
                setCPixel({ x: cpixel[0], y: cpixel[1] });


                console.log(tooltipMapPoint?.id, _id)
                if (!tooltipMapPoint || _id !== tooltipMapPoint.id) {
                    fetch(getCcMapPoint(_id))
                        .then(x => x.json())
                        .then((x) => {
                            const xx = x.data as culture_contributer_entry;
                            setTooltipMapPoint({ id: _id, mapPoint: xx.attributes.MapPoint });
                        }).then(() => setTtVisible(true))

                } else {
                    setTtVisible(true);
                }





            } else {
                setTtVisible(false);
                map.current.getTargetElement().style.cursor = 'auto';
            }


        }
        map.current.on('pointermove', ttfunq);

        return () => {
            map.current.un('pointermove', ttfunq);
        }

    }, [tooltipMapPoint])

    useEffect(() => {
        fetch(getCcMapPoints())
            .then(x => x.json())
            .then(x => {
                source.current.clear();
                source.current.addFeatures(x.data
                    .filter((x: culture_contributer_entry) => ContributerTypes.includes(x.attributes.tag))
                    .map((x: culture_contributer_entry) => {

                        const feature = new Feature({
                            geometry: new Point(fromLonLat([x.attributes.MapPoint.longitude, x.attributes.MapPoint.lattitude])),
                        });
                        feature.addEventListener('pointerleave', e => console.log(e));
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
    }, [ContributerTypes])


    return (
        <div key="m1" className='container p-10 mx-auto max-w-full flex flex-row'>
            <div className='basis-1/2 p-2 m-4'>

                <div id='filter' className='container p-2'>

                    <div>
                        <input type="checkbox" id="ch1" name='test' onChange={(e) => {
                            e.target.checked
                                ? setContributerTypes((p) => [...ContributerTypes, 'venue'])
                                : setContributerTypes(() => {
                                    var x = ContributerTypes;
                                    return x.filter(xx => xx !== 'venue');
                                })
                        }} />
                        <label htmlFor="ch1">venues</label>
                    </div>

                    <div>
                        <input type="checkbox" id="ch2" onChange={(e) => {
                            e.target.checked
                                ? setContributerTypes((p) => [...ContributerTypes, 'youthHouse'])
                                : setContributerTypes(() => {
                                    var x = ContributerTypes;
                                    return x.filter(xx => xx !== 'youthHouse');
                                })
                        }} />
                        <label htmlFor="ch2">youth houses</label>
                    </div>

                </div>

                <div style={{ height: '600px', width: '100%' }} id="map" className="map-container relative">
                    <div id='tooltip' style={{ top: `${cPixel.y}px`, left: `${cPixel.x}px`, visibility: ttVisible ? 'visible' : 'hidden' }} className={'absolute z-50 -translate-y-[120%] h-30 w-40 -translate-x-1/2 pointer-events-none'}>{tooltipMapPoint ? MPTooltip(tooltipMapPoint.mapPoint) : ""}</div>
                </div>

            </div>


            <div id='profile_display' className='basis-1/2 p-2 bg-grey m-4'>
                {ActiveProfileDisplay}
            </div>

        </div>
    );
}
