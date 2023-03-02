import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import {withRuleEngine} from "../../utils/RuleEngineHook";
import {renderChildren, FormContext} from '@aemforms/af-react-renderer';


// Customer's component
const PanelComponent = (props: any) => {
    const context = useContext(FormContext);
    const { handlers, ...state } = props
    return (
        <Box sx={{
                "display" : 'flex',
                "alignItems" : 'flex-start',
                "flexDirection" : 'column',
                "pt" : 2,
                "ml" : 8,
                "borderRadius" : 1
                }}>
            <div>{props?.label?.visible ? props?.label?.value : ""}</div>
            {renderChildren(props, context.mappings, context.modelId, handlers)}
        </Box>
    );
}
export default withRuleEngine(PanelComponent);
