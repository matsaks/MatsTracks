import { useEffect, useRef, useState } from "react";
import Stats from "../Components/Stats";
import { MapboxMap } from "react-map-gl";
import { IActivity } from "../types/types";
import { getRuns } from "../lib/controller";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { decodePolyline } from "../functions/polylineFunctions";
import { ProgressBar } from "react-loader-spinner";
import LocationBar from "../Components/LocationsBar";
import Grid from "@mui/material/Grid";

export default function Running(){
    const heatMapContainerRef = useRef<HTMLDivElement | null>(null);
    const heatMapRef = useRef<MapboxMap | null>(null);
    const [runs, setRuns] = useState<IActivity[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState("Ålesund");
    const [wideEnoughWindow, setWideEnoughWindow] = useState(false);
    const [numberOfLocations, setNumberOfLocations] = useState(5);

    useEffect(() => {
        async function getTracks(){
            const res = await getRuns();
            if (res){
                setRuns(res);
                setLoading(false);
            }
        }
        getTracks();
    },[]);

    const handleResize = () => {
        window.innerWidth >= 800 ? setWideEnoughWindow(true) : setWideEnoughWindow(false);
        setNumberOfLocations(Math.floor(window.innerWidth / 160));
    };

    useEffect(() => {
        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!heatMapContainerRef.current) return;

        let center: LngLatLike = [6.327062, 62.463208];
        switch (location) {
            case "Ålesund":
                center = [6.327062, 62.463208];
                break;
            case "Trondheim":
                center = [10.408688753978664, 63.425038501632145];
                break;
            case "Larvik":
                center = [10.060883454630677, 59.03444602681835];
                break;
            case "Nordfjord":
                center = [6.147719364574782, 61.80861153569357];
                break;
            case "Porsanger":
                center = [24.999946385676303, 69.90256006446188]
                break;
        }

        const map = new mapboxgl.Map({
            container: heatMapContainerRef.current,
            style: "mapbox://styles/matsaks/clk09621d00ac01pf9lpj6mj6",
            center: center,
            zoom: 12
        })
        heatMapRef.current = map;

        map.on('load', () => {
            runs.map((run) => {
            
                map.addSource(run.id.toString(), {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: decodePolyline(run.summaryPolyline),
                        }
                    }
                });
                map.addLayer({
                    id: run.id.toString(),
                    type: 'line',
                    source: run.id.toString(),
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': "#EC890B",
                        'line-width': 5,
                        'line-opacity': 0.7
                    }
                });
            })
        });
        return () => {
            if (heatMapRef.current){
                heatMapRef.current.remove();
            }
        }
    }, [isLoading, runs, location]); 
    
    function handleLoactionChange(location: string){
        setLocation(location);
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={wideEnoughWindow ? 10 : 12}>
                    {isLoading ? (
                        <div>
                            <ProgressBar
                                height="80"
                                width="80"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor = '#F4442E'
                                barColor = '#51E5FF'
                                />
                        </div>
                    ):(<div style={{display: 'flex'}}>
                        <div ref={heatMapContainerRef} style={{ width: '100%', height: '75vh'}}/>
                    </div>
                    )}
                </Grid>
                {wideEnoughWindow && (
                    <Grid item xs={2}>
                        <div style={{ width: '100%', maxHeight: '75vh'}}>
                            <Stats activities={runs} type="run" />
                        </div>
                    </Grid>
                )}
            </Grid>
            {!isLoading &&
                <LocationBar handleLocationChange={handleLoactionChange} map="Run" numberOfLocations={numberOfLocations}/>
            }
        </div>
    )
}