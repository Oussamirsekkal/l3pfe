

 import React from 'react';
 import './BlocklyComponent.css';
 import {useEffect, useRef} from 'react';

 import Blockly from 'blockly/core';
 import {javascriptGenerator} from 'blockly/javascript';
 import locale from 'blockly/msg/en';
 import 'blockly/blocks';

 Blockly.setLocale(locale);

 function BlocklyComponent(props) {
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();

    const generateCode = () => {
        var code = javascriptGenerator.workspaceToCode(
          primaryWorkspace.current
        );
        console.log(code);
    }

     useEffect(() => {
         if (blocklyDiv.current && toolbox.current && !primaryWorkspace.current) {
             primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
                 toolbox: toolbox.current,
             });

             if (props.initialXml) {
                 Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(props.initialXml), primaryWorkspace.current);
             }
         }
     }, [props.initialXml]);

    return (
    <React.Fragment>
        <button onClick={generateCode}>Convert</button>
        <div ref={blocklyDiv} id="blocklyDiv" />
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
    </React.Fragment>);
}

export default BlocklyComponent;
