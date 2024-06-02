"use client"
import React, { useEffect, useRef } from 'react';
import Blockly, { WorkspaceSvg } from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

const BlocklyComponent: React.FC = () => {
    const blocklyDiv = useRef(null);
    const workspace = useRef<WorkspaceSvg | null>(null);

    useEffect(() => {
        if (blocklyDiv.current && !workspace.current) {
            workspace.current = Blockly.inject(blocklyDiv.current, {
                toolbox: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_ifelse"></block><block type="controls_whileUntil"></block></block></xml>',

            });

            // You can add more blocks to the workspace here
        }
    }, []);

    return <div ref={blocklyDiv} id="blocklyDiv" style={{ height: '480px', width: '600px' }} />;
};

export default BlocklyComponent;