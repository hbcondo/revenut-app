import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutAuthentication } from './Authentication';
import { RevenutSettings } from './Settings';
import { RevenutForecast } from './Forecast';
import { RevenutToday } from './Today';
import { RevenutLoading } from './Loading';

import { useState } from 'react';

import { Box, Center, Stack, VStack } from 'native-base';

export function RevenutDashboard() {
	const [rUserID, setUserID] = useState(null);
	const [rData, setData] = useState(new RevenutData());
	const [rDates] = useState(new RevenutDates());
	const [showLoading, setLoading] = useState(false);
	const [showSettings, setSettings] = useState(false);

	return (
		<Center flex={1} maxWidth={500}>
			<Stack
				m="1"
				w="100%"
				h="100%"
				direction={{ base: "column", md: "row" }}
				bg="#F8EFED"
			>
				<Box flex={{ base: 1, md: 3 }}>
					<VStack p={2} bg="#E78E3A">
						<RevenutAuthentication toggleUserID={setUserID} toggleData={setData} toggleLoading={setLoading} toggleSettings={setSettings} userId={rUserID} rData={rData} />
						<RevenutToday rData={rData} rDates={rDates} />
					</VStack>
					<VStack alignItems={'center'} mt={1}>
						<RevenutForecast data={rData} dates={rDates} />
					</VStack>
				</Box>
			</Stack>
			<RevenutLoading isLoading={showLoading} />
			<RevenutSettings toggleSettings={setSettings} showSettings={showSettings} userId={rUserID} />
		</Center>
	)
}