import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { isEmpty } from '@aemforms/af-core';
import { withRuleEngine } from '../../utils/RuleEngineHook';
import { richTextString, DEFAULT_ERROR_MESSAGE } from '../../utils/richTextString';

const useStyles = makeStyles((theme: any) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 200,
    }
}));


const CheckboxGroupComponent = (props: any) => {
    const {
        label, id, required, enumNames, enum: enums, enabled,
        visible, value, onChange, description, valid, name, type
    } = props;
    const isEnabled = enabled === false ? false : true;
    const errorMessage = props.errorMessage || DEFAULT_ERROR_MESSAGE;
    const validateState = valid === false ? 'invalid' : ((valid === undefined || isEmpty(value)) ? undefined : 'valid');
    const error = validateState === 'invalid';
    const options = enumNames && enumNames.length ? enumNames : enums || [];
    const isVisible = typeof visible === 'undefined' || visible;
    const valueArr = value == null ? [] : value instanceof Array ? value : [value]
    const classes = useStyles();

    const changeHandler = (event: any) => {
        const checked = event.target.checked;
        let val = event.target.value;
        if (type.includes("number")) {
            val = Number(val);
        }
        let finalVal = [...valueArr];
        if (checked) {
            finalVal.push(val);
        }
        const index = finalVal.findIndex((a) => a === val);
        if (index !== -1 && !checked) {
            finalVal.splice(index, 1);
        }
        onChange(finalVal);
    };

    return isVisible ? (
        <FormControl required={required} error={error} className={classes.formControl}>
            {label?.visible ? <FormLabel>{label?.value}</FormLabel> : null}
            <FormGroup>
                {
                    options.map((opt: any, index: string | number) => (
                        <FormControlLabel
                            key={enums[index]}
                            control={(
                              <Checkbox 
                                color="primary" 
                                name={name} 
                                value={enums[index]} 
                                checked={valueArr.includes(enums[index])} 
                                onChange={changeHandler} 
                                disabled={!isEnabled}
                              />
                            )}
                            label={opt}
                        />
                    ))
                }
            </FormGroup>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {description && !error && <FormHelperText>{richTextString(description)}</FormHelperText>}
        </FormControl>
    ) : null;
}

// wrapper component to wrap adaptive form capabilities
const AdaptiveFormCheckboxGroup = (props: any) => {
    const { handlers, ...state } = props
    return <CheckboxGroupComponent {...state} onChange={handlers?.dispatchChange} />;
}
export default withRuleEngine(AdaptiveFormCheckboxGroup);
