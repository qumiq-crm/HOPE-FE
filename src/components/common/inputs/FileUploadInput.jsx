/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, Button, Form, Typography, Flex } from "antd";
import { useFormikContext } from "formik";

import notify from "../../../hooks/useNotifyToast";
import { getFileExtensionFromUrl } from "../../../utils/data";

const FileUploadInput = ({
  name,
  label,
  subLabel,
  setFile,
  format,
  classes,
  showNotification = false,
  showFileName = false,
  allowFileDelete = false,
  defaultFileName = "document",
  maxFileSize = 2000,
  isRequired,
  allowedFileTypes = ["image/jpeg", "image/png"],
  descriptionText = null,
  returnOriginalFile = false,
}) => {
  const {
    setFieldValue,
    touched,
    errors,
    validateField,
    values,
    setFieldTouched,
  } = useFormikContext();
  const [fileName, setFileName] = useState(
    values[name]
      ? `${defaultFileName}.${getFileExtensionFromUrl(values[name])}`
      : ""
  );

  const beforeUpload = (file) => {
    // const isJpegorPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isAllowedFileType = allowedFileTypes.includes(file.type);
    if (!isAllowedFileType) {
      const fileFormats = allowedFileTypes.map((type) => {
        if (type === "image/jpeg") {
          return "JPG, JPEG";
        }
        return type.split("/")[1].toUpperCase();
      });
      const allowedFormats = fileFormats
        .join(", ")
        .replace(/,([^,]*)$/, ", or$1");
      notify(`Please upload  ${allowedFormats} file.`, "error");
    }
    const isLtmaxFileSizeKB = file.size / 1024 <= maxFileSize;

    if (!isLtmaxFileSizeKB) {
      notify(
        `File size must be smaller than ${
          maxFileSize % 1024 === 0
            ? `${maxFileSize / 1024} MB`
            : `${maxFileSize} KB`
        }`,
        "error"
      );
    }
    // return isJpegorPng && isLtmaxFileSizeKB;
    return isAllowedFileType && isLtmaxFileSizeKB;
  };

  const setValue = ({ file, onSuccess }) => {
    if (file) {
      setFileName(file.name);
      if (returnOriginalFile) {
        setFieldValue(name, file);
        setFieldTouched(name, true);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            if (setFile) setFile(reader.result);
            setFieldValue(name, reader.result.split(",")[1]);
            setFieldValue(format, file.type.split("/")[1]);
            setFieldTouched(name, true);
          }
        };
        reader.readAsDataURL(file);
      }
      if (showNotification) {
        notify("File uploaded successfully", "success");
      }
      onSuccess("ok");
    }
  };

  const handleDeleteFile = () => {
    setFileName("");
    setFieldValue(name, null);
    setFieldValue(format, undefined);
    if (setFile) setFile(null);
    if (showNotification) {
      notify("File deleted successfully", "success");
    }
  };

  useEffect(() => {
    if (errors[name]) {
      validateField(name);
    }
  }, [errors, name, validateField]);

  return (
    <Form.Item
      name={name}
      label={label}
      required={isRequired}
      validateStatus={touched[name] && errors[name] ? "error" : ""}
      help={
        touched[name] && errors[name] ? (
          <Typography.Text className="text-sm font-normal text-red-500 ">
            {errors[name]}
          </Typography.Text>
        ) : undefined
      }
    >
      <Flex vertical gap={4}>
        {subLabel && (
          <Typography.Text
            type="secondary"
            className="whitespace-nowrap text-xs"
          >
            {subLabel}
          </Typography.Text>
        )}
        <Upload
          accept={allowedFileTypes.join(", ")}
          multiple={false}
          name={name}
          maxCount={1}
          listType="picture"
          className="avatar-uploader custom-upload"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={setValue}
        >
          <Button className={classes} size="small" icon={<UploadOutlined />}>
            Click to Upload
          </Button>
          {descriptionText && (
            <Typography.Text className="text-zinc-500 ml-2 mt-2">
              {descriptionText}
            </Typography.Text>
          )}
        </Upload>
        {showFileName && fileName !== "" && (
          <Flex justify="space-between" align="center">
            <Typography.Text className="text-blue-500 line-clamp-1">
              {fileName}
            </Typography.Text>
            {allowFileDelete && (
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={handleDeleteFile}
                type="text"
              />
            )}
          </Flex>
        )}
      </Flex>
    </Form.Item>
  );
};

export default FileUploadInput;
