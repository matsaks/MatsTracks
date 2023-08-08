import axios from "axios";
import { IActivity } from "../types/types";
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from "../config";

const auth_link = "https://www.strava.com/oauth/token"
const getActivitiesURL = "https://www.strava.com/api/v3/athlete/activities?per_page=150&access_token=";
const getOneActivityURLPart1 = "https://www.strava.com/api/v3/activities/";
const getOneActivityURLPart2 = "?include_all_efforts&access_token=";

//GET the 150 last activities from strava
export async function getActivities(access_token: string){
    return fetch(getActivitiesURL + access_token)
        .then((res) => res.json())
        .then(function (data){
            return data
        })
}


export async function reAuthorize(){
    try {
        const activities: IActivity[] = [];
        const res = await axios.post(auth_link,{
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'    
        })
        const data = await getActivities(res.data.access_token);
        data.forEach((e: { id: number; name: string; distance: number; moving_time: number; elev_high: number; elev_low: number; end_latlng: number[]; map: { summary_polyline: string; }; sport_type: string; start_date: string; start_latlng: number[]; total_elevation_gain: number; }) => {
            const newActivity: IActivity = {
                id: e.id,
                name: e.name,
                distance: e.distance,
                movingTime: e.moving_time,
                elevHigh: e.elev_high,
                elevLow: e.elev_low,
                endLatlng: e.end_latlng,
                summaryPolyline: e.map.summary_polyline,
                sportType: e.sport_type,
                startDate: e.start_date,
                startLatlng: e.start_latlng,
                totalElevGained: e.total_elevation_gain
            }
            activities.push(newActivity);
        });
        
        return activities;
    } catch (error) {
        console.error(error)
    }
}

export async function getOneActivity(access_token: string, trackID: string){
    return fetch(getOneActivityURLPart1 + trackID + getOneActivityURLPart2 + access_token)
        .then((res) => res.json())
        .then(function (data){
            return data
    })
}

export async function reAuthorizeForOneActivity(trackID: string){
    try {
        const res = await axios.post(auth_link,{
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'    
        })
        const data = await getOneActivity(res.data.access_token, trackID);
    
        const newActivity: IActivity = {
            id: data.id,
            name: data.name,
            distance: data.distance,
            movingTime: data.moving_time,
            elevHigh: data.elev_high,
            elevLow: data.elev_low,
            endLatlng: data.end_latlng,
            summaryPolyline: data.map.summary_polyline,
            sportType: data.sport_type,
            startDate: data.start_date,
            startLatlng: data.start_latlng,
            totalElevGained: data.total_elevation_gain
        };
        return newActivity;
                
    } catch (error) {
        console.error(error)
    }
}