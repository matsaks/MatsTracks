import { averageElevation, averageSpeedNordic, getAverageKm, getAverageKmTrail, getAveragePaceRuns, getDurationsThisYear, getNumberOfBC, getNumberOfNordic, getNumberOfRunsThisYear, getTotalKmNordic, getTotalKmThisYear, totalElevation } from "../functions/statCalculations";
import { IActivity } from "../types/types";
import StatBox from "./StatBox";


interface StatProps {
    type: string,
    activities: IActivity[];
}

export default function Stats(props: StatProps){

    const renderStats = () => {
        if (props.type === "run"){
            const data = [
                {info: "Antall løpeturer i år", stat: getNumberOfRunsThisYear(props.activities)},
                {info: "Antall kilometer i år", stat: getTotalKmThisYear(props.activities).toFixed(2) + " km"},
                {info: "Antall timer løpt i år", stat: getDurationsThisYear(props.activities).hours + ':' + getDurationsThisYear(props.activities).minutes},
                {info: "Antall kilometer i snitt per løpetur (flatt)", stat: getAverageKm(props.activities) + " km"},
                {info: "Snittfart per løpetur (flatt)", stat: getAveragePaceRuns(props.activities)},
                {info: "Snitt antall kilometer terrengløp", stat: getAverageKmTrail(props.activities) + " km"}
            ];
            return (
                <div>
                    {data.map((item, index ) => (
                        <StatBox key={index} info={item.info} stat={item.stat} />
                    ))}
                </div>
            )
        } else {
            const data = [
                {info: "Antall toppturer i år", stat: getNumberOfBC(props.activities)},
                {info: "Antall langrennsturer i år", stat: getNumberOfNordic(props.activities)},
                {info: "Antall høydemeter for sesongen (topptur)", stat: totalElevation(props.activities) + " m"},
                {info: "Snitt høydemeter (topptur)", stat: averageElevation(props.activities) + "  m"},
                {info: "Antall kilometer langrenn", stat: getTotalKmNordic(props.activities).toFixed(1) + " km"},
                {info: "Gjennomsnittsfart langrenn", stat: averageSpeedNordic(props.activities) + " km/h"}
            ];
            return (
                <div>
                    {data.map((item, index ) => (
                        <StatBox key={index} info={item.info} stat={item.stat} />
                    ))}
                </div>
            )
        }
    }

    return (
        <div>
            <div style={styles.dataContainer}>
                {renderStats()}
            </div>
        </div>
    )
}

const styles = {
    dataContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
    }
}