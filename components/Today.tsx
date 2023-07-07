import { RevenutData, RevenutDates } from '../types/revenut';
import { displayMonthDate, displayCompactNumber } from '../utils/formatters';

import { Container, Box, HStack, Text, Heading } from 'native-base';

const REVENUT_COLOR_OPPOSITE = '#1871C5';

export function RevenutToday({rData, rDates} : {rData: RevenutData, rDates: RevenutDates}) {
	return (
		<Container>
			<Box mt={2} ml={3}><Text bold color={'white'}>Today <Text bold color={REVENUT_COLOR_OPPOSITE}> {displayMonthDate(rDates.DateToday)}</Text></Text></Box>
			<HStack ml={1} space="3" p="2">
				<Box w="33%" borderRightWidth={1} borderRightColor={'muted.50'}>
					<Heading size="lg" color={'white'}>${displayCompactNumber(rData.VolumeGrossToday)}</Heading>
					<Text color={REVENUT_COLOR_OPPOSITE} bold>Gross Volume</Text>
				</Box>
				<Box w="33%" borderRightWidth={1} borderRightColor={'muted.50'}>
					<Heading size="lg" color={'white'}>{rData.CountPaymentsToday}</Heading>
					<Text color={REVENUT_COLOR_OPPOSITE} bold>Payments</Text>
				</Box>
				<Box w="33%">
					<Heading size="lg" color={'white'}>{rData.CountTrialingToday}</Heading>
					<Text color={REVENUT_COLOR_OPPOSITE} bold>Customers</Text>
				</Box>
			</HStack>
		</Container>
	)
}