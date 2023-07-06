import { REVENUT_API_BASE, STRIPE_CLIENT_ID } from '@env';
import { RevenutData, RevenutDates } from '../types/revenut';
import { RevenutChart } from './Chart';

import { useState } from 'react';

import { Center } from 'native-base';

export function RevenutDashboard() {
    const [rData, setData] = useState(new RevenutData());

    return (
        <Center flex={1} maxWidth={500}>
            <RevenutChart rData={rData} />
        </Center>
    )
}