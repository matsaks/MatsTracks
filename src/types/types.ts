export interface IActivity {
    id: number,
    name: string,
    distance: number,
    movingTime: number,
    elevHigh: number,
    elevLow: number,
    endLatlng: number[],
    summaryPolyline: string,
    sportType: string,
    startDate: string,
    startLatlng: number[],
    totalElevGained: number,

}