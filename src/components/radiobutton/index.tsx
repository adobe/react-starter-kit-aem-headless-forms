import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isEmpty } from '@aemforms/af-core';
import { withRuleEngine } from '../../utils/RuleEngineHook';
import { richTextString, DEFAULT_ERROR_MESSAGE } from '../../utils/richTextString';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 200,
    }
}));
// Customer's component
const RadioGroupComponent = (props: any) => {
    const {
        label, id, required, enumNames, enum: enums, enabled,
        visible, value, onChange, description, valid, name
    } = props;
    const isEnabled = enabled === false ? false : true;
    const errorMessage = props.errorMessage || DEFAULT_ERROR_MESSAGE;
    const validateState = valid === false ? 'invalid' : ((valid === undefined || isEmpty(value)) ? undefined : 'valid');
    const error = validateState === 'invalid';

    const options = enumNames && enumNames.length ? enumNames : enums || [];
    const isVisible = typeof visible === 'undefined' || visible;
    const classes = useStyles();

    const changeHandler = (event: any) => {
        onChange(event.target.value);
    };

    return isVisible ? (
        <FormControl required={required} error={error} className={classes.formControl}>
            <FormLabel>{label?.value}</FormLabel>
            <RadioGroup
                name={name}
                key={value}
                value={value}
                onChange={changeHandler}
            >
                {
                    options.map((opt: any, index: string | number) => (
                        <FormControlLabel value={enums[index]} key={enums[index]} control={<Radio color="primary" disabled={!isEnabled}/>} label={opt} />
                    ))
                }
            </RadioGroup>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {description && !error && <FormHelperText>{richTextString(description)}</FormHelperText>}
        </FormControl>
    ) : null;
}

// wrapper component to wrap adaptive form capabilities
const AdaptiveFormRadioGroup = (props: any) => {
    const { handlers, ...state } = props
    return <RadioGroupComponent {...state} onChange={handlers?.dispatchChange} />;
}

export default withRuleEngine(AdaptiveFormRadioGroup);
