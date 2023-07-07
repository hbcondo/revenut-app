import { RevenutData, RevenutDates } from '../types/revenut';
import { VictoryPie, VictoryLabel, VictoryContainer } from "victory-native"
import { displayCurrency } from '../utils/formatters';

export function RevenutChart({rData: data}:{rData:RevenutData}) {
    return (
        <VictoryContainer width={400} height={400}>
            <VictoryPie
                standalone={false}
                width={400} height={400}
                data={[
                    { x: `Pending ${'\n'}${displayCurrency(data.VolumePending)}`, y: data.VolumePendingPercent },
                    { x: `MTD ${'\n'}${displayCurrency(data.VolumeGrossMonthCurrent)}`, y: data.VolumeGrossMonthCurrentPercent },
                    { x: `Trialing ${'\n'}${displayCurrency(data.VolumeTrialing)}`, y: data.VolumeTrialingPercent }
                ]}
                innerRadius={120}
                padAngle={1} 
                colorScale={["#6ee7b7", "#059669", "#d1fae5"]}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 18, fill: "#059669", fontWeight: "bold" }}
                x={200} y={200}
                text={`${(!data.IsAuthorized) ? 0 : data.VolumeGrossMonthCurrentPercent.toFixed(0)}%${'\n'} Gross Volume`}
            />
        </VictoryContainer>        
    )
}