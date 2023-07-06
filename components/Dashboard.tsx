import { REVENUT_API_BASE, STRIPE_CLIENT_ID } from '@env';
import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutChart } from './Chart';
import { RevenutLoading } from './Loading';
import { displayCompactNumber, displayMonthDate } from '../utils/formatters';

import { useState } from 'react';

import { Center } from 'native-base';
import { RevenutSettings } from './Settings';

export function RevenutDashboard() {
    const [rUserID, setUserID] = useState(null);
    const [rData, setData] = useState(new RevenutData());
    const [showLoading, setLoading] = useState(false);
    const [showSettings, setSettings] = useState(false);

    return (
        <Center flex={1} maxWidth={500}>
            <RevenutChart rData={rData} />
            <RevenutLoading isLoading={showLoading} />
            <RevenutSettings toggleSettings={setSettings} showSettings={showSettings} userId={rUserID} />
        </Center>
    )
}