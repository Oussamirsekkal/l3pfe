'use client';

import Overview from '@/app/Dashboard/components/overview';
import { Suspense } from 'react';

const OverviewWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Overview />
        </Suspense>
    );
};

export default OverviewWrapper;