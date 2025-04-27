import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Grid,
  Image,
  Input,
  Pagination,
  Rate,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import useProduct from "../../hooks/useProducts";
import { useState } from "react";

const { useBreakpoint } = Grid;

const ProductsPage = () => {
  const initialValues = {
    limit: 10,
    offset: 1,
    searchText: "",
    catIds: [],
    sortBy: "",
    isActiveOnly: true,
  };
  const [filters, setFilters] = useState(initialValues);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { loading, products, totalCount } = useProduct(filters);

  const updateSearchText = (query) => {
    setFilters((prev) => ({
      ...prev,
      searchText: query,
    }));
  };
  return (
    <Content>
      <Flex vertical className="pt-5 pb-10 mb-5 bg-emerald-50/50">
        <Typography.Title
          level={screens.lg ? 1 : 3}
          className="text-center text-[#0a4c36] mb-8"
        >
          Bestsellers
        </Typography.Title>
        <Typography.Text className="text-lg text-center px-2 xl:px-72 ">
          Plants make for the best house companions, suitable for all your moods
          and every aesthetic. Ugaoo, an online website for decorative plants,
          offers a wide variety of plants so that you can buy plants online from
          the comfort of your home!
        </Typography.Text>
      </Flex>
      <Flex vertical className="px-2 xl:px-60">
        <Flex justify="end" className="mb-6" gap={5}>
          <Input
            placeholder="Search for plants, seeds and planters..."
            prefix={<SearchOutlined />}
            onChange={(e) => updateSearchText(e.target.value)}
            className=""
            allowClear
            type="text"
            variant="outlined"
            maxLength={100}
          />
          <Select
            placeholder="Sort By"
            options={[
              { label: "Default", value: "default" },
              { label: "Default2", value: "default2" },
              { label: "Default3", value: "default3" },
              { label: "Default4", value: "default4" },
            ]}
            size="large"
          />
        </Flex>
        {!loading && products.length ? (
          <>
            <Row gutter={[24, 50]} className="justify-center">
              {products.map((product, index) => (
                <Col key={index} xs={24} sm={12} lg={8} xl={6}>
                  <Card
                    cover={
                      <Image
                        src={
                          product.image ||
                          "https://www.ugaoo.com/cdn/shop/files/2_72x-100.jpg?v=1739860291&width=360"
                        }
                        alt={product.name}
                        preview={false}
                      />
                    }
                    className="relative border-0"
                  >
                    {product.highlights && (
                      <Tag className="absolute top-4 right-4 bg-yellow-400 px-2 py-1 rounded">
                        {product.highlights}
                      </Tag>
                    )}
                    {product.discount && product.discountType ? (
                      <Tag className="absolute top-4 left-4 bg-yellow-400 px-2 py-1 rounded">
                        OFF{" "}
                        {product.discountType == "PERCENTAGE"
                          ? `${product.discount}%`
                          : `${product.discount}/-`}
                      </Tag>
                    ) : (
                      ""
                    )}

                    <Space
                      direction="vertical"
                      className="flex justify-center items-center w-full"
                    >
                      <Typography.Text className="text-lg">
                        {product.name}
                      </Typography.Text>
                      <Flex gap={5} align="end">
                        {Number(product.discount) > 0 ? (
                          <Typography.Text delete className="text-gray-400">
                            ₹ {product.price}
                          </Typography.Text>
                        ) : (
                          ""
                        )}
                        <Typography.Text
                          strong
                          className="text-lg text-[#149253]"
                        >
                          From ₹{" "}
                          {Number(product.price) -
                            (product.discountType == "PERCENTAGE"
                              ? Number((product.price * product.discount) / 100)
                              : Number(product.discount))}
                        </Typography.Text>
                      </Flex>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={(Math.random() * 2 + 3).toFixed(1)}
                      />
                    </Space>
                  </Card>
                  <Button
                    type="primary"
                    className="w-full"
                    size="large"
                    onClick={() =>
                      navigate(
                        `${paths.dashboard.products}/${paths.products.details}`,
                        {
                          state: {
                            prdId: product._id,
                          },
                        }
                      )
                    }
                  >
                    VIEW PRODUCT
                  </Button>
                </Col>
              ))}
            </Row>
            <Flex justify="end">
              <Pagination
                current={filters.offset}
                size="default"
                pageSize={filters.limit}
                total={totalCount}
                className="text-end mt-7"
                onChange={(page) => {
                  setFilters((val) => ({ ...val, offset: page }));
                }}
                showSizeChanger={false}
              />
            </Flex>
          </>
        ) : loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} active />
            ))}
          </>
        ) : (
          <Empty description="No Products Found" />
        )}
      </Flex>
    </Content>
  );
};

export default ProductsPage;
