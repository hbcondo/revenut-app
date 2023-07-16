import { RevenutData, RevenutDates } from '../types/revenut';
import { displayCurrency } from '../utils/formatters';

import {useWindowDimensions} from 'react-native';

import { VictoryPie, VictoryLabel, VictoryContainer } from "victory-native"

export function RevenutChart({rData: data}:{rData:RevenutData}) {
    let {height, width} = useWindowDimensions();

    // attempt to allocate width so chart + labels render within viewport on desktop and mobile without getting cut off
    width = Math.min(width, 1000);

    return (
        <VictoryContainer width={width} height={height/2.5}>
            <VictoryPie
                standalone={false}
                width={width} height={height/2.5}
                data={[
                    { x: `Open ${'\n'}${displayCurrency(data.VolumePending)}`, y: data.VolumePendingPercent },
                    { x: `Paid ${'\n'}${displayCurrency(data.VolumeGrossMonthCurrent)}`, y: data.VolumeGrossMonthCurrentPercent },
                    { x: `Trials ${'\n'}${displayCurrency(data.VolumeTrialing)}`, y: data.VolumeTrialingPercent }
                ]}
                innerRadius={Math.min(120, width/3.7)}
                padAngle={1} 
                colorScale={["#6ee7b7", "#059669", "#d1fae5"]}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 18, fill: "#059669", fontWeight: "bold" }}
                x={width/2} y={height/5}
                text={`${(!data.IsAuthorized) ? 0 : data.VolumeGrossMonthCurrentPercent.toFixed(0)}%${'\n'} Gross Volume${'\n'}MTD`}
            />
        </VictoryContainer>        
    )
}