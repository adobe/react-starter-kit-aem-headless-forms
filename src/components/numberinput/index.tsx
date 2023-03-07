import React, { useState } from 'react';
import {isEmpty} from '@aemforms/af-core';
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { richTextString, DEFAULT_ERROR_MESSAGE } from '../../utils/richTextString';
import { withRuleEngine } from '../../utils/RuleEngineHook';


const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 200,
    }
}));

const TextFieldComponent = (props: any) => {
    const {
        id, label, value, required, readOnly = false, properties, placeholder,enabled,
        description , visible, format, onChange, onBlur, maxLength, valid, appliedCssClassNames
    } = props;

    const isEnabled = enabled === false ? false : true;
    const errorMessage = props.errorMessage || DEFAULT_ERROR_MESSAGE;
    const validateState = valid === false ? 'invalid' : ((valid === undefined  || isEmpty(value)) ? undefined : 'valid');
    const error = validateState === 'invalid';
    const { inputType } = properties || {};
    const isVisible = typeof visible === 'undefined' || visible;
    const classes = useStyles();


    const keyChangeFn = (event: any) => {
        let thisVal = event?.target?.value;
        const textValLen = thisVal?.length;
        onChange(thisVal);
    };

    const handleChange = (event: any) => {
        const thisVal = event.target.value;
        if (maxLength && thisVal.length === maxLength + 1) {
            return;
        }
        keyChangeFn(event);
    };

    const handleKeyDown = (event: any) => {
        keyChangeFn(event);
    };

    const handleBlur = (event: any) => {
        onBlur(event.target.value);
    };

    const Cmp = 'outlined' === appliedCssClassNames ? OutlinedInput : Input;

    return isVisible ? (
        <FormControl required={required} error={error} className={classes.formControl}>
            <InputLabel htmlFor={id}>{label?.value}</InputLabel>
            <Cmp
                id={id}
                type="number"
                value={value || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
                disabled={!isEnabled}
            />
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {description && !error && <FormHelperText>{richTextString(description)}</FormHelperText>}
        </FormControl>
    ) : null;
}

// wrapper component to wrap adaptive form capabilities
const AdaptiveFormNumberInput = (props: any) => {
    const { handlers, ...state } = props
    return <TextFieldComponent {...state} onChange={handlers?.dispatchChange} onBlur={handlers?.dispatchChange} />;
}


export default withRuleEngine(AdaptiveFormNumberInput);
