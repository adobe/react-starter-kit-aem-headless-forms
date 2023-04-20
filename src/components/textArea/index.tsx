import React from 'react';
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

const TextAreaComponent = (props: any) => {
    const {
        id, label, value, required, readOnly = false, placeholder, enabled,
        description , visible, onChange, onBlur, maxLength, valid, appliedCssClassNames
    } = props;

    const isEnabled = enabled === false ? false : true;
    const errorMessage = props.errorMessage || DEFAULT_ERROR_MESSAGE;
    const validateState = valid === false ? 'invalid' : ((valid === undefined  || isEmpty(value)) ? undefined : 'valid');
    const error = validateState === 'invalid';
    const isVisible = typeof visible === 'undefined' || visible;
    const classes = useStyles();

    const handleChange = (event: any) => {
        const thisVal = event.target.value;
        if (maxLength && thisVal.length === maxLength + 1) {
            return;
        }
        onChange(thisVal);
    };

    const handleKeyDown = (event: any) => {
      const thisVal = event.target.value;
        onChange(thisVal);
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
                type={'text'}
                value={value || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
                disabled={!isEnabled}
                multiline
            />
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {description && !error && <FormHelperText>{richTextString(description)}</FormHelperText>}
        </FormControl>
    ) : null;
}

// wrapper component to wrap adaptive form capabilities
const AdaptiveFormTextArea = (props: any) => {
    const { handlers, ...state } = props
    return <TextAreaComponent {...state} onChange={handlers?.dispatchChange} onBlur={handlers?.dispatchChange} />;
}


export default withRuleEngine(AdaptiveFormTextArea);
