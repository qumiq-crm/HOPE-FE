import { Suspense, useState } from "react";

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

const Product = () => {
  const initialValues = {
    searchText: "",
    page: 1,
    itemsPerPage: 10,
    sort: "DESC",
    sortField: "",
  };
  const [filters, setFilters] = useState(initialValues);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState();
  const { searchText, updateSearchText } = useDebounceSearch(setFilters);

  const {
    isLoading,
    tableData,
    count,
    updateActiveStatus,
    deleteDoc,
    setRefresh,
    downloadReport,
  } = useGetProduct(filters);
  const {
    categoryData,
    vendorData,
    updateProducts,
    allVendors,
    createProducts,
  } = useUpdateProduct({ searchCategories: "", searchVendors: "" });
  const { loading, getProductImage, productImages } = useGetProductImages();
  const { handlePageChange, handleTableChange } = useFilter({ setFilters });
  const handleActive = (prodId, status) => {
    let active;
    if (status === 1 || status === true) active = false;
    else active = true;
    updateActiveStatus({ prodId, status: active });
  };
  const handleEdit = (record) => {
    setModalData(record);
    getProductImage(record.id);
    setOpenModal(true);
  };
  const handleDelete = () => {
    deleteDoc(modalData?.id);
    setDeleteModal(false);
  };
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
      // sorter: true,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      sorter: true,
      visibilityToggle: true,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category Name",
      sorter: true,
      visibilityToggle: true,
      dataIndex: ["category", "categoryName"],
      key: "category",
      render: (_, data) => (
        <Typography.Text>{data.category.categoryName}</Typography.Text>
      ),
    },
    {
      title: "Quantity",
      sorter: true,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      sorter: true,
      dataIndex: "price",
      key: "price",
      render: (price) => <Typography.Text>AED {price}</Typography.Text>,
    },
    {
      title: "Status",
      sorter: true,
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Tooltip placement="top">
          <span>
            {status === 1 || status === true ? (
              <CheckOutlined
                className={`cursor-pointer ${"text-gray-400"}`}
                onClick={() => handleActive(record.id, record.status)}
              />
            ) : (
              <CloseOutlined
                className={`cursor-pointer ${"text-brandColor"}`}
                onClick={() => handleActive(record.id, record.status)}
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
          <Tooltip placement="top">
            <span>
              <DeleteOutlined
                className=" text-brandColor ml-7"
                onClick={() => {
                  setModalData(record);
                  setDeleteModal(true);
                }}
              />
            </span>
          </Tooltip>
        </Flex>
      ),
    },
  ];
  return (
    <Flex vertical gap={20}>
      <ProductHeader
        downloadReport={downloadReport}
        allVendors={allVendors}
        createProducts={createProducts}
        updateProducts={updateProducts}
        vendorData={vendorData}
        categoryData={categoryData}
        setRefresh={setRefresh}
        handleSearch={updateSearchText}
        searchText={searchText}
      />
      <GenericTable
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={isLoading || loading}
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
      />
      <Pagination
        current={filters.page}
        size="default"
        className="text-end pt-7"
        onChange={handlePageChange}
        total={count}
        showSizeChanger={false}
      />
      <Suspense>
        {openModal && (
          <ProductModal
            productImages={productImages}
            createProducts={createProducts}
            allVendors={allVendors}
            categoryData={categoryData}
            updateProducts={updateProducts}
            vendorData={vendorData}
            setRefresh={setRefresh}
            data={modalData}
            open={openModal}
            handleCancel={() => setOpenModal(false)}
          />
        )}
      </Suspense>

      {deleteModal && (
        <ConfirmationModal
          handleSubmit={handleDelete}
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
