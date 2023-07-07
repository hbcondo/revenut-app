import { REVENUT_API_BASE, STRIPE_CLIENT_ID } from '@env';
import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutAuthentication } from './Authentication';
import { RevenutChart } from './Chart';
import { RevenutLoading } from './Loading';
import { displayCompactNumber, displayMonthDate } from '../utils/formatters';

import { useState } from 'react';

import { Box, Center, Stack, HStack, VStack } from 'native-base';
import { RevenutSettings } from './Settings';

export function RevenutDashboard() {
    const [rUserID, setUserID] = useState(null);
    const [rData, setData] = useState(new RevenutData());
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
                        <RevenutAuthentication toggleSettings={setSettings} userId={rUserID} rData={rData} />                 
                    </VStack>
                </Box>
            </Stack>            
            <RevenutChart rData={rData} />
            <RevenutLoading isLoading={showLoading} />
            <RevenutSettings toggleSettings={setSettings} showSettings={showSettings} userId={rUserID} />
        </Center>
    )
}