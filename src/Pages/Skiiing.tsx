import { useEffect, useRef, useState } from "react";
import { MapboxMap } from "react-map-gl";
import { IActivity } from "../types/types";
import { getSkis } from "../lib/controller";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { decodePolyline } from "../functions/polylineFunctions";
import { ProgressBar } from "react-loader-spinner";
import Stats from "../Components/Stats";
import LocationBar from "../Components/LocationsBar";

export default function Skiing(){
    const heatMapContainerRef = useRef<HTMLDivElement | null>(null);
    const heatMapRef = useRef<MapboxMap | null>(null);
    const [skis, setSkis] = useState<IActivity[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [location, setLocation] = useState("Hjørundfjorden")

    useEffect(() => {
        async function getTracks(){
            const res = await getSkis();
            if (res){
                setSkis(res);
                setLoading(false);
            }
        }
        getTracks();
    },[]);

    useEffect(() => {
        if (!heatMapContainerRef.current) return;

        let center: LngLatLike = [6.4833, 62.2167];
        switch (location) {
            case "Hjørundfjorden":
                center = [6.4833, 62.2167];
                break;
            case "Stordal":
                center = [7.060459993324359, 62.40906090673966];
                break;
            case "Nordmøre":
                center = [8.836200522651154, 62.8209409150031];
                break;
            case "Trondheim":
                center = [10.38012046460235, 63.36704022421766];
                break;  
            case "Nordfjord":
                center = [6.080140498658573, 61.863087358904465]
                break;
        }

        const map = new mapboxgl.Map({
            container: heatMapContainerRef.current,
            style: "mapbox://styles/matsaks/clk09621d00ac01pf9lpj6mj6",
            center: center,
            zoom: 10
        })
        heatMapRef.current = map;

        map.on('load', () => {
            skis.map((ski) => {
            
                map.addSource(ski.id.toString(), {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: decodePolyline(ski.summaryPolyline),
                        }
                    }
                });
                map.addLayer({
                    id: ski.id.toString(),
                    type: 'line',
                    source: ski.id.toString(),
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': "#0B89EC",
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
    }, [isLoading, skis, location]); 

    function handleLoactionChange(location: string){
        setLocation(location);
    }
    
    return (
        <div style={styles.screenContainer}>
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
                <div ref={heatMapContainerRef} style={{ width: '100%', height: '940px'}}/>
            </div>
            )}
            </div>
            <div style={{ width: '100%', height: '940px'}}>
                <Stats activities={skis} type="ski" />
            </div>
            {!isLoading &&
                <LocationBar handleLocationChange={handleLoactionChange} map="Ski"/>
            }
        </div>
    )
}

const styles = {
    screenContainer: {
        display: 'grid',
        gridTemplateColumns: '5fr 1fr'
    }
}