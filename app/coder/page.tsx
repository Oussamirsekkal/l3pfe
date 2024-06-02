import React from 'react';
import BlocklyComponent from './components/BlocklyComponent';
import ClientOnly from './ClientOnly';
const GamePage: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClientOnly>
                <BlocklyComponent />
            </ClientOnly>
        </div>
    );
};

export default GamePage;