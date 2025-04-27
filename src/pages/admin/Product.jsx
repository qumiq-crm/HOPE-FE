/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Flex, Pagination, Tooltip, Typography } from "antd";
import ProductHeader from "../../components/products/ProductHeader";
import ProductModal from "../../components/products/ProductModal";
import GenericTable from "../../components/common/GenericTable";
import { formattedDateOnly, formattedTime } from "../../utils/dateFormat";
import ConfirmationModal from "../../components/common/modals/ConfirmationModal";
import useProduct from "../../hooks/useProducts";
import useCategory from "../../hooks/useCategory";

const Product = () => {
  const initialValues = {
    limit: 10,
    offset: 1,
    searchText: "",
    catIds: [],
    sortBy: "",
    isActiveOnly: false,
  };
  const [filters, setFilters] = useState(initialValues);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState();

  // const {
  //   isLoading,
  //   tableData,
  //   count,
  //   updateActiveStatus,
  //   deleteDoc,
  //   setRefresh,
  //   downloadReport,
  // } = useGetProduct(filters);
  // const {
  //   categoryData,
  //   vendorData,
  //   updateProducts,
  //   allVendors,
  //   createProducts,
  // } = useUpdateProduct({ searchCategories: "", searchVendors: "" });
  // const { loading, getProductImage, productImages } = useGetProductImages();
  // const { handlePageChange, handleTableChange } = useFilter({ setFilters });
  const handleActive = (prodId, status) => {
    let active;
    if (status === 1 || status === true) active = false;
    else active = true;
    handleUpdatePrd(prodId, { isActive: active });
  };
  const handleEdit = (record) => {
    setModalData(record);
    setOpenModal(true);
  };
  // const handleDelete = () => {
  //   deleteDoc(modalData?.id);
  //   setDeleteModal(false);
  // };
  const updateSearchText = (query) => {
    setFilters((prev) => ({
      ...prev,
      searchText: query,
    }));
  };
  const { loading, products, handleCreatePrd, handleUpdatePrd } =
    useProduct(filters);
  const { categories } = useCategory();
  const columns = [
    {
      title: "Date",
      sorter: true,
      visibilityToggle: true,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Flex vertical>
          <Typography.Text>
            {formattedDateOnly(new Date(createdAt))}
          </Typography.Text>
          <Typography.Text>
            {formattedTime(new Date(createdAt))}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      visibilityToggle: true,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category Name",
      visibilityToggle: true,
      dataIndex: ["category", "categoryName"],
      key: "category",
      render: (_, data) => (
        <Typography.Text>
          {data?.category?.categoryName || "N/A"}
        </Typography.Text>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <Typography.Text>AED {price}</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, record) => (
        <Tooltip placement="top">
          <span>
            {status === 1 || status === true ? (
              <CheckOutlined
                className={`cursor-pointer ${"text-green-400"}`}
                onClick={() => handleActive(record._id, record.isActive)}
              />
            ) : (
              <CloseOutlined
                className={`cursor-pointer ${"text-red-400"}`}
                onClick={() => handleActive(record._id, record.isActive)}
              />
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Flex justify="space-between">
          <Tooltip placement="top">
            <span>
              <EditOutlined onClick={() => handleEdit(record)} />
            </span>
          </Tooltip>
          {/* <Tooltip placement="top">
            <span>
              <DeleteOutlined
                className=" text-brandColor ml-7"
                onClick={() => {
                  setModalData(record);
                  setDeleteModal(true);
                }}
              />
            </span>
          </Tooltip> */}
        </Flex>
      ),
    },
  ];
  return (
    <Flex vertical gap={20}>
      <ProductHeader
        categoryData={categories}
        // setRefresh={setRefresh}
        handleSearch={updateSearchText}
        handleCreatePrd={handleCreatePrd}
        handleUpdatePrd={handleUpdatePrd}
      />
      <Flex vertical className="md:px-10">
        <GenericTable
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={products}
          pagination={false}
          loading={loading}
          onChange={(e) => {
            console.log(e);
          }}
        />
        <Pagination
          current={filters.page}
          size="default"
          className="text-end pt-7"
          // onChange={handlePageChange}
          // total={count}
          showSizeChanger={false}
        />
      </Flex>
      <Suspense>
        {openModal && (
          <ProductModal
            // productImages={productImages}
            categoryData={categories}
            // setRefresh={setRefresh}
            data={modalData}
            open={openModal}
            handleCancel={() => setOpenModal(false)}
            handleCreatePrd={handleCreatePrd}
            handleUpdatePrd={handleUpdatePrd}
          />
        )}
      </Suspense>

      {deleteModal && (
        <ConfirmationModal
          // handleSubmit={handleDelete}
          handleCancel={() => setDeleteModal(false)}
          isOpen={deleteModal}
          title="Do you want to proceed with the deletion?"
          isLoading={false}
        />
      )}
    </Flex>
  );
};

export default Product;
