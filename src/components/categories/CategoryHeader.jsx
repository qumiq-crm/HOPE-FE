/* eslint-disable react/prop-types */
import { Suspense, lazy, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Typography } from "antd";

const CategoryModal = lazy(() => import("./CategoryModal"));

const CategoryHeader = ({
  searchText,
  handleSearch,
  setRefresh,
  handleCreateCat,
  handleUpdateCat,
}) => {
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <>
      <Flex vertical className=" bg-emerald-50 p-2 md:p-10" gap={10}>
        <Typography.Text className="text-xl md:text-3xl font-medium">
          Category Management
        </Typography.Text>
        <Typography.Text className="text-lg hidden md:block">
          The Category Management page on the admin side enables administrators
          to efficiently create, edit, and manage product categories. It
          includes features for updating category names, descriptions, images,
          and visibility settings to ensure a well-structured and easily
          navigable product catalog.
        </Typography.Text>
      </Flex>
      <Row justify="space-between" className="w-full gap-5 md:px-10">
        <Col span={24} md={21}>
          <Input
            value={searchText}
            placeholder="Search "
            suffix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            type="text"
            variant="outlined"
            maxLength={100}
          />
        </Col>
        <Col span={24} md={2}>
          <Button
            type="primary"
            className="w-full sm:w-fit"
            onClick={() => setOpenModal(true)}
          >
            Add New Category
          </Button>
        </Col>
      </Row>
      <Suspense>
        {openModal && (
          <CategoryModal
            open={openModal}
            handleCancel={() => setOpenModal(false)}
            setRefresh={setRefresh}
            handleCreateCat={handleCreateCat}
            handleUpdateCat={handleUpdateCat}
          />
        )}
      </Suspense>
    </>
  );
};
export default CategoryHeader;
