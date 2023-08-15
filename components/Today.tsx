import { RevenutData, RevenutDates } from '../types/revenut';
import { displayMonthDate, displayCompactNumber } from '../utils/formatters';
import { styles } from '../utils/styles';

import { Container, Box, HStack, Text, Heading } from 'native-base';

export function RevenutToday({rData, rDates} : {rData: RevenutData, rDates: RevenutDates}) {
	return (
		<Box>
			<Container mt={2} ml={3}>
				<Text bold color={'white'}>Today <Text bold color={styles.revenut.tertiary}> {displayMonthDate(rDates.DateToday)}</Text></Text>
			</Container>
			<HStack ml={1} space="3" p="2">
				<Box w="33%" borderRightWidth={1} borderRightColor={'muted.50'}>
					<Heading size="lg" color={'white'}>${displayCompactNumber(rData.VolumeGrossToday)}</Heading>
					<Text color={styles.revenut.tertiary} bold>Gross Volume</Text>
				</Box>
				<Box w="33%" borderRightWidth={1} borderRightColor={'muted.50'}>
					<Heading size="lg" color={'white'}>{rData.CountPaymentsToday}</Heading>
					<Text color={styles.revenut.tertiary} bold>Payments</Text>
				</Box>
				<Box w="33%">
					<Heading size="lg" color={'white'}>{rData.CountTrialingToday}</Heading>
					<Text color={styles.revenut.tertiary} bold>Customers</Text>
				</Box>
			</HStack>
		</Box>
	)
}