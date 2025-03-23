import {
  Button,
  Card,
  Col,
  Flex,
  Grid,
  Image,
  Input,
  Pagination,
  Rate,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { products } from "../../utils/dummy-data";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

const { useBreakpoint } = Grid;

const ProductsPage = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

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
            className=""
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
        <Row gutter={[24, 50]} className="justify-center">
          {products.map((product, index) => (
            <Col key={index} xs={24} sm={12} lg={8} xl={6}>
              <Card
                cover={
                  <Image
                    src={product.image}
                    alt={product.title}
                    preview={false}
                  />
                }
                className="relative border-0"
              >
                {product.tag && (
                  <Tag className="absolute top-4 right-4 bg-yellow-400 px-2 py-1 rounded">
                    {product.tag}
                  </Tag>
                )}
                {product.discount && (
                  <Tag className="absolute top-4 left-4 bg-yellow-400 px-2 py-1 rounded">
                    {product.discount}
                  </Tag>
                )}

                <Space
                  direction="vertical"
                  className="flex justify-center items-center w-full"
                >
                  <Typography.Text className="text-lg">
                    {product.title}
                  </Typography.Text>
                  <Flex gap={5} align="end">
                    <Typography.Text delete className="text-gray-400">
                      ₹ {product.originalPrice}
                    </Typography.Text>
                    <Typography.Text strong className="text-lg text-[#149253]">
                      From ₹ {product.price}
                    </Typography.Text>
                  </Flex>
                  <Rate disabled defaultValue={product.rating} />
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
                        prdId: index + 1,
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
            current={1}
            size="default"
            pageSize={16}
            total={50}
            className="text-end mt-7"
            onChange={(page, number) => {
              console.log(page, number);
            }}
            showSizeChanger={false}
          />
        </Flex>
      </Flex>
    </Content>
  );
};

export default ProductsPage;
