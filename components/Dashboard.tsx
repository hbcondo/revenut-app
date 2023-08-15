import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutAuthentication } from './Authentication';
import { RevenutSettings } from './Settings';
import { RevenutForecast } from './Forecast';
import { RevenutToday } from './Today';
import { RevenutLoading } from './Loading';
import { styles } from '../utils/styles';

import { useState } from 'react';

import { Box, Center, Stack, VStack } from 'native-base';

import { LogBox, LogBoxNotification } from 'react-native-web-log-box';

/* 
	Install LogBox for all environments 
	Ignore known issues without a resolution
	Display remaining warnings / errors to help report issues
*/
LogBox.ignoreLogs(['SSRProvider', 'deprecated', 'animated']);
LogBox.install();

export function RevenutDashboard() {
	const [rUserID, setUserID] = useState(null);
	const [rData, setData] = useState(new RevenutData());
	const [rDates] = useState(new RevenutDates());
	const [showLoading, setLoading] = useState(false);
	const [showSettings, setSettings] = useState(false);

	return (
		<Center flex={1}>
			<Stack
				m="1"
				w="100%"
				h="100%"
				direction={{ base: "column", md: "row" }}
				bg={styles.revenut.secondary}
			>
				<Box flex={{ base: 1, md: 3 }} safeArea>
					<VStack p={2} bg={styles.revenut.primary}>
						<RevenutAuthentication toggleUserID={setUserID} toggleData={setData} toggleLoading={setLoading} toggleSettings={setSettings} userId={rUserID} rData={rData} />
						<RevenutToday rData={rData} rDates={rDates} />
					</VStack>
					<VStack alignItems={'center'} mt={1}>
						<RevenutForecast data={rData} dates={rDates} />
					</VStack>
				</Box>
			</Stack>
			<RevenutLoading isLoading={showLoading} />
			<RevenutSettings toggleUserID={setUserID} toggleData={setData} toggleSettings={setSettings} showSettings={showSettings} userId={rUserID} />
			<LogBoxNotification />
		</Center>
	)
}