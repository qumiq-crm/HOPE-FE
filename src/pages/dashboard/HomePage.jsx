import {
  Button,
  Card,
  Carousel,
  Col,
  Flex,
  Grid,
  Image,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import {
  bestsellerProducts,
  categories,
  categoryData,
  homePageCarousel,
  homePageCarouselForMobile,
} from "../../utils/dummy-data";
import {
  BulbOutlined,
  ExperimentOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
// import { useNavigate } from "react-router-dom";

const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const { useBreakpoint } = Grid;

const HomePage = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const features = [
    {
      icon: <PayCircleFilled className="text-4xl text-[#0a4c36]" />,
      title: "Secure and Recyclable Packaging",
    },
    {
      icon: <BulbOutlined className="text-4xl text-[#0a4c36]" />,
      title: "Free Replacements if Damaged",
    },
    {
      icon: <ExperimentOutlined className="text-4xl text-[#0a4c36]" />,
      title: "Self-Watering Pots with Every Plant",
    },
  ];
  return (
    <Content>
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        {screens.lg
          ? homePageCarousel.map((item, key) => (
              <Flex key={key} justify="center">
                <Flex style={contentStyle} justify="center">
                  <Flex
                    vertical
                    className="bg-gray-100 flex items-center justify-center relative"
                  >
                    <Button
                      type="primary"
                      size="large"
                      className="absolute bottom-20 z-10 px-10"
                    >
                      SHOP NOW
                    </Button>
                    <Image
                      src={item}
                      preview={false}
                      style={{
                        width: "100vw",
                        objectFit: "fill", // Ensures the image covers the whole area
                      }}
                      className="relative z-0"
                    />
                  </Flex>
                </Flex>
              </Flex>
            ))
          : homePageCarouselForMobile.map((item, key) => (
              <Flex key={key} justify="center">
                <Flex style={contentStyle} justify="center">
                  <Flex
                    vertical
                    className="bg-gray-100 flex items-center justify-center relative"
                  >
                    <Button
                      type="primary"
                      size="middle"
                      className="absolute bottom-7 z-10 px-4"
                    >
                      SHOP NOW
                    </Button>
                    <Image
                      src={item}
                      preview={false}
                      style={{
                        width: "100vw",
                        objectFit: "fill", // Ensures the image covers the whole area
                      }}
                      className="relative z-0"
                    />
                  </Flex>
                </Flex>
              </Flex>
            ))}
      </Carousel>
      <Flex className="px-2 xl:px-60 mt-12" justify="center">
        <Row gutter={[10, 10]} className="xl:px-8 mb-12 justify-center w-full">
          {categoryData.map((category, index) => (
            <Col key={index} xs={12} md={8} lg={6} xl={3}>
              <Flex
                vertical
                className="text-center cursor-pointer"
                justify="center"
              >
                <Flex justify="center">
                  <Image
                    src={category.image}
                    alt={category.title}
                    preview={false}
                    width={screens.lg ? 140 : 110}
                  />
                </Flex>
                <Typography.Text className="text-xl">
                  {category.title}
                </Typography.Text>
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>
      <Flex vertical className="px-2 xl:px-60 ">
        <Typography.Title
          level={screens.lg ? 1 : 3}
          className="text-center text-[#0a4c36] mb-8 "
        >
          Your Best Picks
        </Typography.Title>

        <Row gutter={[24, 24]} className="justify-center">
          {categories.map((category, index) => (
            <Col key={index}>
              <Flex
                vertical
                className="w-full h-full rounded-3xl"
                justify="center"
              >
                <Image
                  alt={category.title}
                  src={category.image}
                  preview={false}
                  width={screens.md ? 300 : 120}
                />
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>

      <Flex vertical className="px-2 xl:px-60 mt-14">
        <Typography.Title
          level={screens.lg ? 1 : 3}
          className="text-center text-[#0a4c36] mb-8"
        >
          Bestsellers
        </Typography.Title>
        <Row gutter={[24, 24]} className="justify-center">
          {bestsellerProducts.map((product, index) => (
            <Col xs={24} sm={12} lg={8} xl={8} key={index}>
              <Card
                cover={
                  <Image
                    src={product.image}
                    alt={product.title}
                    preview={false}
                  />
                }
                className="relative"
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
                  <Typography.Title level={4}>{product.title}</Typography.Title>
                  <Flex gap={5} align="end">
                    <Typography.Text delete className="text-gray-400">
                      ₹ {product.originalPrice}
                    </Typography.Text>
                    <Typography.Text strong className="text-lg text-[#149253]">
                      From ₹ {product.price}
                    </Typography.Text>
                  </Flex>
                  <Rate disabled defaultValue={product.rating} />
                  <Button type="primary" size="large" className="lg:px-24">
                    VIEW PRODUCT
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Flex className="mt-8" justify="center">
          <Button
            type="primary"
            size="large"
            className="lg:px-16"
            onClick={() => navigate(paths.dashboard.products)}
          >
            VIEW ALL
          </Button>
        </Flex>
      </Flex>

      <Flex
        vertical
        className="w-full bg-emerald-50/50 py-10 px-2 xl:px-60 mt-10"
        justify="center"
      >
        <Typography.Title
          level={screens.lg ? 2 : 4}
          className="text-center text-[#0a4c36] mb-12"
        >
          Why Hope
        </Typography.Title>

        <Row justify="center" gutter={[48, 48]} className=" mx-auto mt-4">
          {features.map((feature, index) => (
            <Col key={index} xs={24} md={8} className="text-center">
              <Space direction="vertical" size="small" className="w-full">
                {feature.icon}
                <Typography.Text className="text-base text-gray-700">
                  {feature.title}
                </Typography.Text>
              </Space>
            </Col>
          ))}
        </Row>
      </Flex>
    </Content>
  );
};

export default HomePage;
