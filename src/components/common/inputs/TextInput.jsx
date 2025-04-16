/* eslint-disable react/prop-types */
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Grid, Input } from 'antd';
import { Field } from 'formik';

const { useBreakpoint } = Grid;

const TextInput = ({
    name,
    label,
    placeholder,
    type,
    size,
    isDisabled,
    isRequired,
    addonBefore,
    classes,
    formItemClass,
    showToolTip = false,
    disablePaste = false,
    tooltipText,
    suffix,
    maxLength,
    minLength,
    allowNumbersOnly = false,
    allowDecimalsOnly = false,
    allowTwoDecimalsOnly = false,
    allowAlphabetsOnly = false,
    allowAlphabetsAndSpaceOnly = false,
    allowAlphabetsAndNumbersOnly = false,
    allowAlphabetsSpaceAndNumbersOnly = false,
    allowAlphabetsAndSpecialCharacters,
    allowAlphabetsNumberAndSpecialCharacters,
    allowNumbersAndDots = false,
    allowLowerCaseOnly = false,
    allowUpperCaseOnly = false,
    allowEmailsOnly = false,
    allowedInputKeys,
    prefix,
    handleChange,
    readOnly = false,
    values,
    maxValue,
    autoComplete = 'on',
}) => {
    const { sm } = useBreakpoint();
    return (
        <Field name={name}>
            {({ field, form: { touched, errors, setFieldValue } }) => (
                <Form.Item
                    label={label && <span title="">{label}</span>} // Modified line
                    colon={false} // Added line
                    required={isRequired}
                    validateStatus={touched[name] && errors[name] ? 'error' : ''}
                    help={
                        touched[name] && errors[name]
                            ? (errors[name])
                            : undefined
                    }
                    tooltip={
                        showToolTip && {
                            title: tooltipText,
                            color: 'white',
                            placement: sm ? 'right' : 'top',
                            icon: <InfoCircleOutlined />,
                            overlayInnerStyle: {
                                color: '#171717',
                            },
                            overlayStyle: {
                                minWidth: 300,
                            },
                        }
                    }
                    className={formItemClass}
                >
                    <Input
                        {...field}
                        value={values ?? field.value}
                        maxLength={maxLength}
                        minLength={minLength}
                        type={type}
                        size={size ?? 'middle'}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        className={classes}
                        addonBefore={addonBefore}
                        suffix={suffix}
                        prefix={prefix}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        onPaste={e => {
                            if (disablePaste) e.preventDefault();
                        }}
                        onChange={e => {
                            const { value } = e.target;
                            let filteredValue = value;
                            if (allowNumbersOnly) {
                                filteredValue = value.replace(/[^\d]/g, '');
                                if (maxValue && parseInt(filteredValue, 10) > maxValue) {
                                    filteredValue = maxValue.toString();
                                }
                            }
                            if (allowAlphabetsNumberAndSpecialCharacters) {
                                const allowedChars =
                                    allowAlphabetsNumberAndSpecialCharacters.join('');
                                const regex = new RegExp(`[^a-zA-Z0-9${allowedChars}]`, 'g');
                                filteredValue = value.replace(regex, '');
                            }
                            if (allowAlphabetsAndSpecialCharacters) {
                                const allowedChars = allowAlphabetsAndSpecialCharacters.join('');
                                const regex = new RegExp(`[^a-zA-Z${allowedChars}]`, 'g');
                                filteredValue = value.replace(regex, '');
                            }
                            if (allowDecimalsOnly || allowTwoDecimalsOnly) {
                                // Ensure only valid numeric input with decimal points
                                filteredValue = value
                                    .replace(/[^0-9.]/g, '') // Allow only numbers and dots
                                    .replace(/(\..*?)\..*/g, '$1'); // Remove additional dots

                                // Prevent NaN if only "." is entered
                                if (filteredValue === '.') {
                                    filteredValue = '0.';
                                }
                                if (allowTwoDecimalsOnly) {
                                    filteredValue = filteredValue.replace(/(\.\d{2})\d+/, '$1');
                                }
                            }
                            if (allowAlphabetsOnly) {
                                filteredValue = value.replace(/[^a-zA-Z]/g, '');
                            }
                            if (allowAlphabetsAndSpaceOnly) {
                                filteredValue = value.replace(/[^a-zA-Z ]/g, '');
                            }
                            if (allowAlphabetsAndNumbersOnly) {
                                filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
                            }
                            if (allowAlphabetsSpaceAndNumbersOnly) {
                                filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
                            }
                            if (allowNumbersAndDots) {
                                filteredValue = value.replace(/[^\d.]/g, '');
                            }
                            if (allowLowerCaseOnly) {
                                filteredValue = value.toLowerCase();
                            }
                            if (allowUpperCaseOnly) {
                                filteredValue = value.toUpperCase();
                            }
                            if (allowEmailsOnly) {
                                filteredValue = value
                                    .replace(/[^a-zA-Z0-9@._-]/g, '') // Allow only valid email characters
                                    .replace(/[^@]*@[^.]*\./g, match =>
                                        match.replace(/[^a-zA-Z0-9@._-]/g, '')
                                    ); // Keep valid email format
                            }
                            if (allowedInputKeys) {
                                filteredValue = allowedInputKeys(value);
                            }
                            setFieldValue(name, filteredValue);
                            if (handleChange) handleChange(e.target.value);
                        }}
                    />
                </Form.Item>
            )}
        </Field>
    );
};

export default TextInput;
