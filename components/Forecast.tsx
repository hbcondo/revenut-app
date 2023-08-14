import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutChart } from './Chart';
import { displayCompactNumber, displayMonthDate, displayChangeNumber } from '../utils/formatters';

import { Badge, Box, HStack, Heading, Text, theme } from 'native-base';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

export function RevenutForecast({ data, dates }: {data: RevenutData, dates: RevenutDates}) {
	function getChangeColorScheme(changeType: number): ColorSchemeType {
		let colorScheme: ColorSchemeType = theme.colors.gray[300];
		
		switch (changeType) {
			case 1: colorScheme = theme.colors.green[500]; break;
			case -1: colorScheme = theme.colors.red[600]; break;
		}

		return colorScheme;
	}

	return (
		<Box justifyContent={'center'} p="2" width="98%" backgroundColor={'white'} borderWidth={1} borderColor={'coolGray.200'} shadow={1}>
			<HStack>
				<Box width={'50%'}><Text bold>Forecast (EOM)</Text></Box> 
				<Box width={'50%'} alignItems={'flex-end'}>
					<Badge colorScheme={getChangeColorScheme(data.VolumeGrossMonthOverMonthPercentChangeType)} variant={'solid'}>
						<Text bold color={'white'}>{displayChangeNumber(data.VolumeGrossMonthOverMonthPercentChange)}%</Text>
					</Badge>
				</Box>  
			</HStack>
			<HStack>
				<Box width={'50%'}>
					<Heading color={'tertiary.600'}>${displayCompactNumber(data.VolumeGrossMonthForecast)}</Heading>
					<Text>{displayMonthDate(dates.DateMonthStartCurrent)} &#10140; {displayMonthDate(dates.DateMonthEndCurrent)}</Text>
				</Box>
				<Box width={'50%'} alignItems={'flex-end'}>
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