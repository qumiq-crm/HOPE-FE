/* eslint-disable react/prop-types */
import { Form, Input } from 'antd';
import { Field } from 'formik';

const TextAreaInput = ({
    name,
    label,
    placeholder,
    size,
    isDisabled,
    isRequired,
    maxLength,
    minLength,
    minRows = 2,
}) => (
    <Field name={name}>
        {({ field, form: { touched, errors } }) => (
            <Form.Item
                label={label}
                required={isRequired}
                validateStatus={touched[name] && errors[name] ? 'error' : ''}
                help={touched[name] && errors[name] ? (errors[name]) : undefined}
            >
                <Input.TextArea
                    {...field}
                    id={name}
                    size={size ?? 'middle'}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoSize={{ minRows }}
                />
            </Form.Item>
        )}
    </Field>
);

export default TextAreaInput;
