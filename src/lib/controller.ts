import { addDoc, collection, getDocs, getFirestore, or, query, where } from "firebase/firestore";
import { IActivity } from "../types/types";
import { app } from "./firebase";
import { reAuthorize } from "../data/strava_api";

const firestore = getFirestore(app);

//POST one activity
export const addActivity = async (activityData: IActivity) => {
    const newActivity = addDoc(collection(firestore, `activities`), {...activityData});
    console.log((await newActivity).id);
}

//POST multiple activities
export const addActivities = async (activities: IActivity[]) => {
    activities.map((activity: IActivity) => {
        addDoc(collection(firestore, `activities`), {...activity});
    })
}

export const activitiesCollection = collection(firestore, "activities");

//GET all activities
export async function getActivities(){
    const q = query(activitiesCollection);
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return;
    }
    const activities: IActivity[] = [];

    snapshot.docs.map((doc) => {
        const newActivity: IActivity = {
            id: doc.data().id,
            name: doc.data().name,
            distance: doc.data().distance,
            movingTime: doc.data().movingTime,
            elevHigh: doc.data().elevHigh,
            elevLow: doc.data().elevLow,
            endLatlng: doc.data().endLatlng,
            summaryPolyline: doc.data().summaryPolyline,
            sportType: doc.data().sportType,
            startDate: doc.data().startDate,
            startLatlng: doc.data().startLatlng,
            totalElevGained: doc.data().totalElevGained
        };
        activities.push(newActivity);       
    });
    return activities;
}

//GET all Runs
export async function getRuns(){
    const q = query(activitiesCollection, or(
        where("sportType", "==", "Run"), 
        where("sportType", "==", "TrailRun"),
        where("sportType", "==", "Hike")));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return;
    }
    const activities: IActivity[] = [];

    snapshot.docs.map((doc) => {
        const newActivity: IActivity = {
            id: doc.data().id,
            name: doc.data().name,
            distance: doc.data().distance,
            movingTime: doc.data().movingTime,
            elevHigh: doc.data().elevHigh,
            elevLow: doc.data().elevLow,
            endLatlng: doc.data().endLatlng,
            summaryPolyline: doc.data().summaryPolyline,
            sportType: doc.data().sportType,
            startDate: doc.data().startDate,
            startLatlng: doc.data().startLatlng,
            totalElevGained: doc.data().totalElevGained
        };
        activities.push(newActivity);       
    });
    return activities;
}

//GET all skiing activities
export async function getSkis(){
    const q = query(activitiesCollection, or (
        where("sportType", "==", "BackcountrySki"), 
        where("sportType", "==", "NordicSki")));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return;
    }
    const skiis: IActivity[] = [];

    snapshot.docs.map((doc) => {
        const newActivity: IActivity = {
            id: doc.data().id,
            name: doc.data().name,
            distance: doc.data().distance,
            movingTime: doc.data().movingTime,
            elevHigh: doc.data().elevHigh,
            elevLow: doc.data().elevLow,
            endLatlng: doc.data().endLatlng,
            summaryPolyline: doc.data().summaryPolyline,
            sportType: doc.data().sportType,
            startDate: doc.data().startDate,
            startLatlng: doc.data().startLatlng,
            totalElevGained: doc.data().totalElevGained
        };
        skiis.push(newActivity);       
    });
    return skiis;
}

//Syncing activities from strava-api to firebase
export async function syncActivities(){
    const activities =  await reAuthorize();
    const oldActivities = await getActivities();
    const oldActivitiesID: number[] = [];
    const newActivities:IActivity[] = [];
    oldActivities?.map((a) => {
        oldActivitiesID.push(a.id);
    });

    activities?.map((a: IActivity) => {
        if (!oldActivitiesID.includes(a.id) && a.distance !== 0){
            newActivities.push(a);
        }
    });
    return newActivities;
}