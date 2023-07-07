import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutChart } from './Chart';
import { displayCompactNumber, displayMonthDate } from '../utils/formatters';

import { Badge, Box, HStack, Heading, Text } from 'native-base';

export function RevenutForecast({ data, dates }: {data: RevenutData, dates: RevenutDates}) {
	return (
		<Box justifyContent={'center'} p="2" width="98%" backgroundColor={'white'} borderWidth={1} borderColor={'coolGray.200'} shadow={1}>
			<HStack>
				<Box width={'50%'}><Text bold>Forecast (EOM)</Text></Box> 
				<Box width={'50%'} alignItems={'end'}>
					<Badge colorScheme={'error'} variant={'solid'}>
						<Text bold color={'white'}>{data.VolumeGrossMonthOverMonthPercentChange.toFixed(2)}%</Text>
					</Badge>
				</Box>  
			</HStack>
			<HStack>
				<Box width={'50%'}>
					<Heading color={'tertiary.600'}>${displayCompactNumber(data.VolumeGrossMonthForecast)}</Heading>
					<Text>{displayMonthDate(dates.DateMonthStartCurrent)} &#10140; {displayMonthDate(dates.DateMonthEndCurrent)}</Text>
				</Box>
				<Box width={'50%'} alignItems={'end'}>
					<Heading color={'primary.900'}>${displayCompactNumber(data.VolumeGrossMonthPrevious)}</Heading>
					<Text>{displayMonthDate(dates.DateMonthStartPrevious)} &#10140; {displayMonthDate(dates.DateMonthEndPrevious)}</Text>
				</Box>
			</HStack>
			<HStack>
				<RevenutChart rData={data} />
			</HStack>
		</Box>
    )
}