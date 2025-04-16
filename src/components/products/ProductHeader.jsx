/* eslint-disable react/prop-types */
import { Suspense, lazy, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Typography } from "antd";

const ProductModal = lazy(() => import("./ProductModal"));

const ProductHeader = ({
  searchText,
  handleSearch,
  categoryData,
  updateProducts,
  vendorData,
  createProducts,
  setRefresh,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Flex vertical className=" bg-emerald-50 p-2 md:p-10" gap={10}>
        <Typography.Text className="text-xl md:text-3xl font-medium">
          Products Management
        </Typography.Text>
        <Typography.Text className="text-lg hidden md:block">
          The Product Management page on the admin side enables administrators
          to efficiently create, edit, and manage product listings. It includes
          features for updating product details, images, pricing, stock levels,
          categories, and visibility settings to ensure accurate and organized
          inventory control.
        </Typography.Text>
      </Flex>
      <Row justify="space-between" className="w-full gap-5 md:px-10">
        <Col span={24} md={21}>
          <Input
            value={searchText}
            placeholder="Search "
            suffix={<SearchOutlined />}
            onChange={handleSearch}
            allowClear
            type="text"
            variant="outlined"
            maxLength={100}
          />
        </Col>
        <Col span={24} md={2}>
          <Button type="primary" className="w-full sm:w-fit" onClick={() => setOpenModal(true)}>
            Add New Product
          </Button>
        </Col>
      </Row>
      <Suspense>
        {openModal && (
          <ProductModal
            createProducts={createProducts}
            categoryData={categoryData}
            updateProducts={updateProducts}
            vendorData={vendorData}
            open={openModal}
            handleCancel={() => setOpenModal(false)}
            setRefresh={setRefresh}
          />
        )}
      </Suspense>
    </>
  );
};
export default ProductHeader;
