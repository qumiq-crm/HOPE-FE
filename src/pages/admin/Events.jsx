import { Suspense, useState } from "react";
import { Button, Col, Flex, Input, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GenericTable from "../../components/common/GenericTable";
import CustomModalWithForm from "../../components/common/modals/CustomModalWithForm";
import TextInput from "../../components/common/inputs/TextInput";
import TextAreaInput from "../../components/common/inputs/TextAreaInput";
import FileUploadInput from "../../components/common/inputs/FileUploadInput";
import useEvents from "../../hooks/useEvents";

const initialEventValues = {
  heading: "",
  description: "",
  photo1: "",
  photo2: "",
  photo3: "",
  photo4: "",
  photo5: "",
};

const Events = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 1,
    searchText: "",
    sortBy: "",
    isActiveOnly: false,
  });
  const { events, loading, handleCreateEvent, refetch } = useEvents(filters);

  const handleCreateEventForm = async (values) => {
    // Map photo1-photo5 to photos array
    const photos = [1, 2, 3, 4, 5]
      .map((i) => values[`photo${i}`])
      .filter((p) => !!p);
    const payload = {
      heading: values.heading,
      description: values.description,
      photos,
    };
    await handleCreateEvent(payload);
    setOpenModal(false);
    refetch();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Typography.Text>
          {new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()}
        </Typography.Text>
      ),
    },
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => (
        <Typography.Text
          style={{
            maxWidth: 250,
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}
          ellipsis={{ tooltip: desc }}
        >
          {desc}
        </Typography.Text>
      ),
    },
    {
      title: "Photos",
      dataIndex: "photos",
      key: "photos",
      render: (photos) => (
        <Flex gap={4}>
          {Array.isArray(photos) &&
            photos.map((photo, i) =>
              photo ? (
                <img
                  key={i}
                  src={photo.startsWith("http") ? photo : `data:image/jpeg;base64,${photo}`}
                  alt={`event-${i}`}
                  style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4 }}
                />
              ) : null
            )}
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap={20}>
      <Flex vertical className="bg-emerald-50 p-2 md:p-10" gap={10}>
        <Typography.Text className="text-xl md:text-3xl font-medium">
          Events Management
        </Typography.Text>
        <Typography.Text className="text-lg hidden md:block">
          Add and manage events. Each event can have up to 5 photos, a heading, and a description.
        </Typography.Text>
      </Flex>
      <Row justify="space-between" className="w-full gap-5 md:px-10">
        <Col span={24} md={21}>
          <Input
            value={searchText}
            placeholder="Search by heading or description"
            onChange={(e) => {
              setSearchText(e.target.value);
              setFilters((prev) => ({ ...prev, searchText: e.target.value }));
            }}
            allowClear
            type="text"
            maxLength={100}
          />
        </Col>
        <Col span={24} md={2}>
          <Button
            type="primary"
            className="w-full sm:w-fit"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Add Event
          </Button>
        </Col>
      </Row>
      <Flex vertical className="md:px-10">
        <GenericTable
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={events}
          pagination={false}
          loading={loading}
        />
      </Flex>
      <Suspense>
        {openModal && (
          <CustomModalWithForm
            modalTitle="Add Event"
            open={openModal}
            handleCancel={() => setOpenModal(false)}
            handleFormSubmit={handleCreateEventForm}
            initialValues={initialEventValues}
            validationSchema={null}
            reinitialise
          >
            {() => (
              <form>
                <TextInput
                  name="heading"
                  label="Event Heading"
                  type="text"
                  placeholder="Enter event heading"
                  isRequired
                  maxLength={100}
                />
                <TextAreaInput
                  name="description"
                  label="Event Description"
                  placeholder="Enter event description"
                  isRequired
                  maxLength={350}
                />
                {[1,2,3,4,5].map((i) => (
                  <FileUploadInput
                    key={i}
                    name={`photo${i}`}
                    format={null}
                    label={`Photo ${i}`}
                    showFileName
                    allowFileDelete
                    isRequired={i === 1}
                  />
                ))}
              </form>
            )}
          </CustomModalWithForm>
        )}
      </Suspense>
    </Flex>
  );
};

export default Events;

