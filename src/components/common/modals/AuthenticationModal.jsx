/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Flex, Modal, Input, Typography } from "antd";

const AuthenticationModal = ({
  isOpen,
  title = "Authentication Required",
  handleSubmit,
  isLoading,
}) => {
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    handleSubmit(password);
  };

  return (
    <Modal
      title={
        <Flex vertical gap={8}>
          <Typography.Title level={4} className="m-0">
            {title}
          </Typography.Title>
        </Flex>
      }
      open={isOpen}
      closeIcon={false}
      centered
      width={360}
      footer={[
        <Flex justify="center" gap={10} key="modal-footer">
          <Button
            type="primary"
            className="w-full"
            loading={isLoading}
            onClick={onSubmit}
            disabled={!password}
          >
            Login
          </Button>
        </Flex>,
      ]}
    >
      <Input.Password
        placeholder="Password"
        size="large"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={50}
        autoFocus
      />
    </Modal>
  );
};

export default AuthenticationModal;
