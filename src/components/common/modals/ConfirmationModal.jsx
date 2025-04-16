/* eslint-disable react/prop-types */
import { Button, Flex, Modal } from "antd";

const ConfirmationModal = ({
  isOpen,
  handleCancel,
  title,
  description,
  handleSubmit,
  isLoading,
}) => (
  <Modal
    title={
      <Flex gap={5} vertical>
        <Flex gap={16} align="start" className="font-bold mb-5">
          {title}
        </Flex>
        {description && (
          <Flex gap={16} align="start" className="font-normal text-sm mb-5">
            {description}
          </Flex>
        )}
      </Flex>
    }
    open={isOpen}
    onCancel={handleCancel}
    closeIcon={null}
    centered
    width={400}
    footer={[
      <Flex className=" w-full" justify="flex-end" gap={10} key="">
        <Button
          key="submit"
          type="primary"
          danger
          loading={isLoading}
          onClick={() => {
            handleSubmit();
          }}
        >
          Yes
        </Button>
        <Button key="back" onClick={handleCancel} className=" rounded-sm ">
          No
        </Button>
      </Flex>,
    ]}
  />
);

export default ConfirmationModal;
