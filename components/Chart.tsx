import { RevenutData, RevenutDates } from '../types/revenut';
import { VictoryPie, VictoryLabel, VictoryContainer } from "victory-native"

export function RevenutChart({rData}:{rData:RevenutData}) {
    return (
        <VictoryContainer width={400} height={400}>
            <VictoryPie
                standalone={false}
                width={400} height={400}
                data={[
                    { x: `Pending ${'\n'}$${rData.VolumePending.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, y: rData.VolumePendingPercent },
                    { x: `MTD ${'\n'}$${rData.VolumeGrossMonthCurrent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, y: rData.VolumeGrossMonthCurrentPercent },
                    { x: `Trialing ${'\n'}$${rData.VolumeTrialing.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, y: rData.VolumeTrialingPercent }
                ]}
                innerRadius={120}
                padAngle={1} 
                colorScale={["#6ee7b7", "#059669", "#d1fae5"]}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 18 }}
                x={200} y={200}
                text={`${(!rData.IsAuthorized) ? 0 : rData.VolumeGrossMonthCurrentPercent.toFixed(0)}%${'\n'} Gross Volume`}
            />
        </VictoryContainer>        
    )
}