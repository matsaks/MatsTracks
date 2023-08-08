import { IActivity } from "../types/types";

function isThisYear(date: string){
    const d = new Date();
    const currentYear: number = d.getFullYear();
    const year1 = parseInt(date.slice(0,4));
    return currentYear === year1;
}

function isThisSeason(date: string){
    const d = new Date();
    const currentYear: number = d.getFullYear();
    const year1 = parseInt(date.slice(0,4));
    const month = parseInt(date.slice(5,7))
    return currentYear === year1 || (currentYear - 1 === year1 && month > 8);
}

export function getTotalKmThisYear(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if (isThisYear(a.startDate)){
            total += a.distance;
        }
    })
    return total/1000;
}

export function getNumberOfRunsThisYear(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if ((a.sportType === "Run" || a.sportType === "TrailRun") && isThisYear(a.startDate)){
            total++;
        }
    })
    return total;
}

export function getDurationsThisYear(activities: IActivity[]){
    let totalSec = 0;
    activities.map((a) => {
        if ((a.sportType === "Run" || a.sportType === "TrailRun") && isThisYear(a.startDate)){
            totalSec += a.movingTime;
        }
    })
    const hours = Math.floor(totalSec / 3600);
    const remainingSeconds = totalSec % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    return { hours, minutes, totalSec};
}

export function getAveragePaceRuns(activities: IActivity[]){
    const runs: IActivity[] = [];
    activities.map((a) => {
        if (a.sportType === "Run"){
            runs.push(a);
        }
    })
    let totalSec = 0;
    let totalDistance = 0;
    runs.map((r) => {
        totalSec += r.movingTime;
        totalDistance += r.distance;
    }) 
    const min = totalSec / 60;
    const pace = min / (totalDistance / 1000);
    const paceMin = Math.floor(pace);
    const paceSec = Math.round((pace - paceMin)*60);
    
    return `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} /km`;
}

export function getAverageKm(activities: IActivity[]){
    const runs: IActivity[] = [];
    activities.map((a) => {
        if (a.sportType === "Run"){
            runs.push(a);
        }
    })
    const numberOfRuns = getNumberOfRunsThisYear(runs);
    const totalKm = getTotalKmThisYear(runs);
    return (totalKm / numberOfRuns).toFixed(2);
}

export function getAverageKmTrail(activities: IActivity[]){
    const trailRuns: IActivity[] = [];
    activities.map((a) => {
        if (a.sportType === "TrailRun"){
            trailRuns.push(a);
        }
    })
    const numberOfRuns = getNumberOfRunsThisYear(trailRuns);
    const totalKm = getTotalKmThisYear(trailRuns);
    return (totalKm / numberOfRuns).toFixed(2);
}

export function getNumberOfBC(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if (a.sportType === "BackcountrySki" && isThisSeason(a.startDate)){
            total++;
        }
    })
    return total;
}

export function getNumberOfNordic(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if (a.sportType === "NordicSki" && isThisSeason(a.startDate)){
            total++;
        }
    })
    return total;
}

export function totalElevation(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if (isThisSeason(a.startDate) && a.sportType === "BackcountrySki"){
            total += a.totalElevGained;
        }
    })
    return total;
}

export function averageElevation(activities: IActivity[]){
    const total = totalElevation(activities);
    const number = getNumberOfBC(activities);
    return (total / number).toFixed(0);
}

export function getTotalKmNordic(activities: IActivity[]){
    let total = 0;
    activities.map((a) => {
        if (a.sportType === "NordicSki" && isThisSeason(a.startDate)){
            total += a.distance;
        }
    })
    return total / 1000;
}

export function averageSpeedNordic(activities: IActivity[]){
    let time = 0;
    activities.map((a) => {
        if (a.sportType === "NordicSki" && isThisSeason(a.startDate)){
            time += a.movingTime;
        }
    })
    const totalKm = getTotalKmNordic(activities);
    return (totalKm / (time / 3600)).toFixed(1);
}