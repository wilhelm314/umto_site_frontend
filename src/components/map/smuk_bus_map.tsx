import { useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { culture_contributer_entry, culture_contributer_type, smukbus_entry } from '../strapi/strapi_entries';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { getCcMapPoint, getCcMapPoints, getImageURL, getSmukfestBus, getSmukfestBuses } from '../strapi/strapi_interface';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { getCcProfile } from '../strapi/strapi_interface';
import { MPTooltip, MapPoint } from '../strapi/strapi_map_point';
import { parseRichText } from '../strapi/strapi_rich_text';
import { paramArrayParser, paramArrayToString, useSearchParam } from '../SearchParamManager';
import { networkInterfaces } from 'os';
import { useNavigate } from 'react-router-dom';









export function SmukBusMap() {
    const source = useRef(new VectorSource<Feature<Point>>());
    const [tooltipMapPoint, setTooltipMapPoint] = useState<{ id: number, mapPoint: MapPoint }>();
    const [cPixel, setCPixel] = useState({ x: 0, y: 0 });
    const [ttVisible, setTtVisible] = useState(false);
    const map = useRef<Map>(new Map);
    const navigate = useNavigate()

    // generates map, loads once
    useEffect(() => {

        //console.log('onLoad', 'filters:', paramArrayParser(filters), 'cctypes:', ContributerTypes);

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
                center: fromLonLat([9.917994, 56.025946]),
                zoom: 15,
            }),
        });


        map.current.on('movestart', function (evt) {
            setTtVisible(false);
        })

        function moveFunq(evt: MapBrowserEvent<any>) {

            const pixel = map.current.getEventPixel(evt.originalEvent);
            const x = map.current.getFeaturesAtPixel(pixel);

            if (x.length == 1) {
                map.current.getTargetElement().style.cursor = 'pointer';
            } else {
                map.current.getTargetElement().style.cursor = 'auto';
            }

        }

        map.current.on('pointermove', moveFunq)



        // TODO: unsubscibe map eventhandlers
        return () => { if (map.current) map.current.setTarget(undefined) }
    }, []);

    // recursive funq called on load keeps re rendering map points

    useEffect(() => {
        const x = () => {
            fetch(getSmukfestBuses())
                .then(x => x.json())
                .then(x => x.data as smukbus_entry[])
                .then(x => {
                    source.current.clear();
                    source.current.addFeatures(x.map((x: smukbus_entry) => {

                        const feature = new Feature({
                            geometry: new Point(fromLonLat([x.attributes.mapPoint?.longitude ?? 0, x.attributes.mapPoint?.lattitude ?? 0])),
                        });
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
                })
                .finally(() => setTimeout(() => x(), 5e3));
        }

        x()

    }, [])


    useEffect(() => {

    }, [])

    // mounts the on pointermove on the map components, listens for whether its own output (in the active tooltip) changes.
    const [ttId, setTtId] = useState<number>()
    useEffect(() => {
        if (ttId) {
            fetch(getSmukfestBus(ttId))
                .then(x => x.json())
                .then(x => x.data as smukbus_entry)
                .then(x => { setTooltipMapPoint({ id: ttId, mapPoint: x.attributes.mapPoint }) })
                .finally(() => setTtVisible(true))
        }
    }, [ttId])

    useEffect(() => {
        function ttfunq(evt: MapBrowserEvent<any>) {

            const pixel = map.current.getEventPixel(evt.originalEvent);
            const x = map.current.getFeaturesAtPixel(pixel);

            if (x.length == 1) {
                const _id = x[0].getId() as number
                const pcoord = (x[0].getGeometry() as Point).getCoordinates();
                const cpixel = map.current.getPixelFromCoordinate(pcoord);
                setCPixel({ x: cpixel[0], y: cpixel[1] });

                if (!tooltipMapPoint || _id != tooltipMapPoint.id) {
                    setTtVisible(false);
                    setTtId(_id)
                } else {
                    setTtVisible(true);
                }

            } else {
                setTtVisible(false);
            }

        }


        map.current.on('click', ttfunq);
        return () => {
            map.current.un('click', ttfunq);
        }

    }, [tooltipMapPoint])

    // updates displayed profile based on URL, listens for URL changes

    return (
        <div style={{ height: '50vh' }} className='flex flex-col justify-center align-center'>
            <div key="m1" style={{ boxShadow: '0 0 25px -5px rgb(0 0 0 / 0.1)' }} className='bg-white container p-10 mx-auto h-full w-full p-8'>

                <div id="map" className="map-container relative h-full w-full">
                    <div id='tooltip' style={{ top: `${cPixel.y}px`, left: `${cPixel.x}px`, visibility: ttVisible ? 'visible' : 'hidden' }} className={'absolute z-50 -translate-y-[120%] h-30 w-40 -translate-x-1/2 pointer-events-none'}>{tooltipMapPoint ? MPTooltip(tooltipMapPoint.mapPoint) : ""}</div>
                </div>

            </div>
        </div>

    );


}

