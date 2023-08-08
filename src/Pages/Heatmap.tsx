
import mapboxgl, { LngLatLike } from "mapbox-gl"
import { useEffect, useRef, useState } from "react";
import { MapboxMap } from "react-map-gl";
import { IActivity } from "../types/types";
import { decodePolyline } from "../functions/polylineFunctions";
import { getActivities } from "../lib/controller";
import { ProgressBar } from "react-loader-spinner";
import LocationBar from "../Components/LocationsBar";

mapboxgl.accessToken = "pk.eyJ1IjoibWF0c2FrcyIsImEiOiJjbGp6a3Q5d3EwMGoyM3BuM3h2c3lwM3RoIn0.16VvTvPT5Fb9IVsT8Z38Hg";

export default function Map(){
    const heatMapContainerRef = useRef<HTMLDivElement | null>(null);
    const heatMapRef = useRef<MapboxMap | null>(null);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [location, setLocation] = useState("Ålesund");

    useEffect(() => {
        async function getTracks(){
            const res = await getActivities();
            if (res){
                setActivities(res);
                setLoading(false);
            }
        }
        getTracks();
    },[]);

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
            activities.map((activity) => {
                let trackColor = "#EC890B";
                if (activity.sportType === "BackcountrySki" || activity.sportType === "NordicSki"){
                    trackColor = "#0B89EC";
                }
                if (activity.sportType === "Ride"){
                    trackColor = "#277348";
                }
                if (activity.sportType === "Kayaking" || activity.sportType === "Kitesurf"){
                    trackColor = "#1BEBD8";
                }

                map.addSource(activity.id.toString(), {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: decodePolyline(activity.summaryPolyline),
                        }
                    }
                });
                map.addLayer({
                    id: activity.id.toString(),
                    type: 'line',
                    source: activity.id.toString(),
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': trackColor,
                        'line-width': 5,
                        'line-opacity': 0.7
                    }
                });
            })
        });
        map.addControl(new mapboxgl.NavigationControl());
        return () => {
            if (heatMapRef.current){
                heatMapRef.current.remove();
            }
        }
    }, [activities, isLoading, location]); 

    function handleLoactionChange(location: string){
        setLocation(location);
    }

    return (
        <div>
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
                <div ref={heatMapContainerRef} style={{ width: '100%', height: '900px'}}/>
            </div>
            )}
            {!isLoading &&
                <LocationBar handleLocationChange={handleLoactionChange} map="Heatmap"/>
            }
        </div>
    )
}