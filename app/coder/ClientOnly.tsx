'use client';

import React, { ReactNode } from 'react';

interface ClientOnlyProps {
    children: ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    return <>{children}</>;
};

export default ClientOnly;