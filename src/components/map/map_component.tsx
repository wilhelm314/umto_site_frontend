import { useState, useEffect, useRef, ReactElement, useCallback } from 'react';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { culture_contributer_entry, culture_contributer_type } from '../strapi/strapi_entries';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { getCcMapPoint, getCcMapPoints, getImageURL } from '../strapi/strapi_interface';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { getCcProfile } from '../strapi/strapi_interface';
import { MPTooltip, MapPoint } from '../strapi/strapi_map_point';
import { ImageSlider } from '../ImageSlider';
import { parseRichText } from '../strapi/strapi_rich_text';
import { paramArrayParser, paramArrayToString, useSearchParam } from '../SearchParamManager';
import { networkInterfaces } from 'os';
import { useNavigate } from 'react-router-dom';









export function MapRowComponent() {
    const source = useRef(new VectorSource<Feature<Point>>());
    const [ActiveProfileDisplay, setActiveProfileDisplay] = useState<ReactElement>();
    const [tooltipMapPoint, setTooltipMapPoint] = useState<{ id: number, mapPoint: MapPoint }>();
    const [cPixel, setCPixel] = useState({ x: 0, y: 0 });
    const [ttVisible, setTtVisible] = useState(false);
    const [filters, setFilters] = useSearchParam('ccFilters');
    const [cc, setCc] = useSearchParam("cc");
    const map = useRef<Map>(new Map);
    const navigate = useNavigate()






    useEffect(() => {

        function clickFunq(evt: MapBrowserEvent<any>) {
            const pixel = map.current.getEventPixel(evt.originalEvent);
            const x = map.current.getFeaturesAtPixel(pixel);
            if (x.length == 1) {
                var xx = x[0].getId()?.toString();
                if (xx) {
                    setCc(xx)
                }
            }
        }
        map.current.on('click', clickFunq);

        return () => {
            map.current.un('click', clickFunq);
        }
    }, [filters, map.current])


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
                center: fromLonLat([10.211792, 56.157788]),
                zoom: 8,
            }),
        });


        map.current.on('movestart', function (evt) {
            setTtVisible(false);
            map.current.getTargetElement().style.cursor = 'auto';
        })

        // TODO: unsubscibe map eventhandlers
        return () => { if (map.current) map.current.setTarget(undefined) }
    }, []);


    // mounts the on pointermove on the map components, listens for whether its own output (in the active tooltip) changes.
    const [ttId, setTtId] = useState<number>()
    useEffect(() => {
        if (ttId) {
            fetch(getCcMapPoint(ttId))
                .then(x => x.json())
                .then(x => x.data as culture_contributer_entry)
                .then(x => { setTooltipMapPoint({ id: ttId, mapPoint: x.attributes.MapPoint }) })
                .finally(() => setTtVisible(true))
        }
    }, [ttId])


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

                if (!tooltipMapPoint || _id != tooltipMapPoint.id) {
                    setTtId(_id)
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


    //generates the features on the map(mapPoints) listents for changes in the filters
    useEffect(() => {
        //console.log('in features getter', 'filters:', paramArrayParser(filters), 'cctypes:', ContributerTypes);

        fetch(getCcMapPoints())
            .then(x => x.json())
            .then(x => {
                source.current.clear();
                source.current.addFeatures(x.data.filter((x: culture_contributer_entry) => {
                    return paramArrayParser(filters)?.includes(x.attributes.type);
                })
                    .map((x: culture_contributer_entry) => {

                        const feature = new Feature({
                            geometry: new Point(fromLonLat([x.attributes.MapPoint.longitude, x.attributes.MapPoint.lattitude])),
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
            });
    }, [filters])

    // updates displayed profile based on URL, listens for URL changes
    useEffect(() => {
        if (cc) {
            fetch(getCcProfile(cc))
                .then(x => x.json())
                .then(x => x.data as culture_contributer_entry)
                .then((x) => {
                    const p = x?.attributes.Profile;
                    setActiveProfileDisplay(() => {
                        return (
                            <div id='pp' className='container overflow-hidden w-full h-full shadow-xl'>

                                <div style={{ height: '50%' }} className='flex justify-center items-center '>
                                    <img className='w-full h-full object-cover' src={getImageURL(p.image.data.attributes.url).toString()} alt="" />
                                </div>



                                <div className='p-4 h-fit w-fit '>
                                    <div className="tracking-wider font-light text-red text-md">{p.address}</div>
                                    <div className='flex flex row justify-center items-center'>
                                        <div className='flex justify-start basis-1/2'>
                                            <div className="my-2 font-bold text-3xl text-red">{p.title}</div>
                                        </div>
                                        <div className='flex justify-end basis-1/2'>
                                            <div onClick={() => navigate(`/community/cc/${x.id}`)} className="my-2 font-light text-3xl text-red hover:cursor-pointer hover:text-black">SE MERE</div>
                                        </div>
                                    </div>
                                    <div className='text-black text-ellipsis'>{p?.shortHook}</div>
                                </div>

                            </div>
                        )
                    })
                });
        }

    }, [cc]);


    return (
        window.screen.width / window.screen.height < 2 / 3 ?
            <div style={{ minHeight: '100vh' }} className='flex flex-col justify-center align-center'>
                <div key="m1" style={{ boxShadow: '0 0 25px -5px rgb(0 0 0 / 0.1)' }} className='bg-white container p-10 mx-auto h-fit w-fit grid grid-rows-2 gap-5 p-8'>
                    <div className='p-2 m-4 h-full w-full flex flex-row p-2'>

                        <div id='filter' className='container p-2 basis-1/6'>
                            <div>
                                {Checkbox('venue')}
                            </div>

                            <div>
                                {Checkbox('youthHouse')}
                            </div>
                        </div>

                        <div id="map" className="map-container relative h-full w-full basis-5/6">
                            <div id='tooltip' style={{ top: `${cPixel.y}px`, left: `${cPixel.x}px`, visibility: ttVisible ? 'visible' : 'hidden' }} className={'absolute z-50 -translate-y-[120%] h-30 w-40 -translate-x-1/2 pointer-events-none'}>{tooltipMapPoint ? MPTooltip(tooltipMapPoint.mapPoint) : ""}</div>
                        </div>

                    </div>

                    <div id='profile_display' className='h-full w-full p-2 bg-grey m-4'>
                        {ActiveProfileDisplay}
                    </div>

                </div>
            </div>

            :

            <div style={{ height: '75vh' }} className='flex flex-col justify-center align-center'>
                <div key="m1" style={{ boxShadow: '0 0 25px -5px rgb(0 0 0 / 0.1)' }} className='bg-white container p-10 mx-auto h-full w-full flex flex-row gap-5 p-2'>

                    <div id='profile_display' className='basis-1/2 max-h-full max-w-full p-2 bg-grey m-4 max-w-full'>
                        {ActiveProfileDisplay}
                    </div>



                    <div className='basis-1/2 p-2 m-4 flex flex-col p-2'>
                        <div id='filter' className='container p-2'>
                            <div>
                                {Checkbox('venue')}
                            </div>

                            <div>
                                {Checkbox('youthHouse')}
                            </div>
                        </div>

                        <div id="map" className="map-container relative h-full w-full">
                            <div id='tooltip' style={{ top: `${cPixel.y}px`, left: `${cPixel.x}px`, visibility: ttVisible ? 'visible' : 'hidden' }} className={'absolute z-50 -translate-y-[120%] h-30 w-40 -translate-x-1/2 pointer-events-none'}>{tooltipMapPoint ? MPTooltip(tooltipMapPoint.mapPoint) : ""}</div>
                        </div>

                    </div>

                </div>
            </div>

    );

    function Checkbox(ccType: culture_contributer_type) {
        const [checked, setChecked] = useState<boolean>(paramArrayParser(filters)?.includes(ccType) ?? false);

        useEffect(() => {
            if (checked) {
                var x = paramArrayParser(filters) ?? [];
                if (!x?.includes(ccType)) {
                    setFilters(paramArrayToString([...x, ccType]))
                }
            }
            else {
                var x = paramArrayParser(filters) ?? [];
                setFilters(paramArrayToString(x.filter(xx => xx !== ccType)))
            }

        }, [checked])

        return (
            <label>
                <input type="checkbox"
                    defaultChecked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                {ccType}
            </label>
        );
    }

}

