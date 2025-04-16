/* eslint-disable react/prop-types */
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Select } from 'antd';
import { Field } from 'formik';



const SelectInput = ({
    name,
    label,
    placeholder,
    size = 'middle',
    isDisabled,
    isRequired,
    classes,
    options,
    showToolTip = false,
    tooltipText,
    handleChange,
    onSearch,
    allowClear,
    showSearch,
    filterOption,
    mode = undefined,
}) => (
    <Field name={name}>
        {({ field, form: { touched, errors, values, setFieldValue } }) => (
            <Form.Item
                label={label && <span title="">{label}</span>} // Line modified
                required={isRequired}
                validateStatus={touched[name] && errors[name] ? 'error' : ''}
                help={touched[name] && errors[name] ? (errors[name]) : undefined}
                tooltip={
                    showToolTip && {
                        title: tooltipText,
                        color: 'white',
                        placement: 'right',
                        icon: <InfoCircleOutlined />,
                        overlayInnerStyle: {
                            color: '#171717',
                        },
                        overlayStyle: {
                            minWidth: 300,
                        },
                    }
                }
            >
                <Select
                    {...field}
                    allowClear={allowClear}
                    showSearch={showSearch}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    value={values[name] !== '' ? values[name] : undefined}
                    className={classes}
                    onSearch={onSearch}
                    mode={mode}
                    size={size}
                    filterOption={filterOption}
                    onChange={e => {
                        setFieldValue(name, e);
                        if (handleChange) handleChange(e);
                    }}
                >
                    {options.map((option, index) => (
                        <Select.Option key={index} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        )}
    </Field>
);

export default SelectInput;
