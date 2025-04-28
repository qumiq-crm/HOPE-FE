/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Flex, Pagination, Tooltip, Typography } from "antd";
import GenericTable from "../../components/common/GenericTable";
import { formattedDateOnly, formattedTime } from "../../utils/dateFormat";
import useCategory from "../../hooks/useCategory";
import CategoryHeader from "../../components/categories/CategoryHeader";
import CategoryModal from "../../components/categories/CategoryModal";

const Category = () => {
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
  // const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleActive = (catId, status) => {
    let active;
    if (status === 1 || status === true) active = false;
    else active = true;
    handleUpdateCat(catId, { isActive: active });
  };
  const handleEdit = (record) => {
    setModalData(record);
    setOpenModal(true);
  };
  const updateSearchText = (query) => {
    setFilters((prev) => ({
      ...prev,
      searchText: query,
    }));
  };
  const { categories, loading, handleCreateCat, handleUpdateCat } =
    useCategory(filters);
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
      title: "Category Name",
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
      <CategoryHeader
        // setRefresh={setRefresh}
        handleSearch={updateSearchText}
        handleCreateCat={handleCreateCat}
        handleUpdateCat={handleUpdateCat}
      />
      <Flex vertical className="md:px-10">
        <GenericTable
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={categories}
          pagination={false}
          loading={loading}
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
          <CategoryModal
            // setRefresh={setRefresh}
            data={modalData}
            open={openModal}
            handleCancel={() => setOpenModal(false)}
            handleCreateCat={handleCreateCat}
            handleUpdateCat={handleUpdateCat}
          />
        )}
      </Suspense>

      {/* {deleteModal && (
        <ConfirmationModal
          // handleSubmit={handleDelete}
          handleCancel={() => setDeleteModal(false)}
          isOpen={deleteModal}
          title="Do you want to proceed with the deletion?"
          isLoading={false}
        />
      )} */}
    </Flex>
  );
};

export default Category;
