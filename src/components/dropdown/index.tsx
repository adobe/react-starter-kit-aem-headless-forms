import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {isEmpty} from '@aemforms/af-core';
import { withRuleEngine } from '../../utils/RuleEngineHook';
import { richTextString, DEFAULT_ERROR_MESSAGE } from '../../utils/richTextString';

const useStyles = makeStyles((theme: any) => ({
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const DropDownComponent = (props: any) => {
    const {
        label, id, required, enumNames, enum: enums, enabled,
        visible, value, onChange, description, valid, onBlur
    } = props;

    const isEnabled = enabled === false ? false : true;
    const errorMessage = props.errorMessage || DEFAULT_ERROR_MESSAGE;
    const validateState = valid === false ? 'invalid' : ((valid === undefined  || isEmpty(value)) ? undefined : 'valid');
    const error = validateState === 'invalid';

    const dropdownData = enumNames && enumNames.length ? enumNames : enums || [];
    const isVisible = typeof visible === 'undefined' || visible;
    const classes = useStyles();

    const changeHandler = (event: any) => {
        onChange(event.target.value);
    };

    const handleBlur = (event: any) => {
        onBlur(event.target.value || '');
    };

    return isVisible ? (
        <FormControl required={required} error={error} className={classes.formControl}>
            <InputLabel id={`${id}-label`}>{label?.value}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                key={value}
                onChange={changeHandler}
                onBlur={handleBlur}
                displayEmpty
                disabled={!isEnabled}
                className={classes.selectEmpty}
            >
                {
                    dropdownData.map((text: any, index: string | number) => (
                        <MenuItem value={enums[index]} key={enums[index]}>{text}</MenuItem>
                    ))
                }
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {description && !error && <FormHelperText>{richTextString(description)}</FormHelperText>}
        </FormControl>
    ) : null;
}

// wrapper component to wrap adaptive form capabilities
const AdaptiveFormDropDown = (props: any) => {
    const { handlers, ...state } = props
    const selectedKey = state?.value != null ? `${state.value}` : state.value;
    return <DropDownComponent {...state} selectedKey={selectedKey} onChange={handlers?.dispatchChange} onBlur={handlers?.dispatchChange} />;
}

export default withRuleEngine(AdaptiveFormDropDown);
