import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Grid,
  Image,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { formatNumberWithLocalString } from "../../utils/priceFormat";
import { CreditCardFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetails from "../../hooks/useProductsDetails";
import { paths } from "../../routes/paths";
import React, { useEffect, useState } from "react";
import { ORDER_MOBILENO } from "../../config-global";

const { useBreakpoint } = Grid;
const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { prdId } = useLocation().state;
  const { Text } = Typography;
  const screens = useBreakpoint();
  const { loading, product } = useProductDetails({ productId: prdId });
  const [viewImg, setViewImg] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [prdId]);
  if (loading) {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} active />
        ))}
      </>
    );
  }
  return (
    <Content key={prdId}>
      <Flex justify="center">
        <Row align="middle" gutter={24} className="mt-6 px-2 max-w-screen-2xl">
          <Col xs={24} md={12} className="flex flex-col align-middle p-0">
            <Card size="small" className="rounded-2xl p-0">
              <Image
                src={product?.images?.[viewImg]}
                alt="No image available"
                width="100%"
                height={430}
                className="object-contain "
                fallback="https://www.ugaoo.com/cdn/shop/files/3_95c81721-0beb-47c4-8eae-3efad6742baf.jpg?v=1717308876&width=360"
              />
              <Flex gap={10} justify="center">
                {product?.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="prd"
                    onClick={() => setViewImg(index)}
                    role="button"
                    preview={false}
                    width={70}
                    height={70}
                    className="object-contain hover:border hover:rounded-lg"
                    fallback="https://www.ugaoo.com/cdn/shop/files/3_95c81721-0beb-47c4-8eae-3efad6742baf.jpg?v=1717308876&width=360"
                  />
                ))}
              </Flex>
            </Card>
          </Col>
          <Col xs={24} md={12} className="xs:pt-8 md:pt-0">
            <Flex gap={7} vertical>
              <Text className="text-base text-productText font-medium">
                {product?.highlights}
              </Text>
              <Text className="xs:lg md:text-xl line-clamp-3 mt-2">
                {product?.name}
              </Text>
            </Flex>
            {screens.md ? (
              <>
                <Flex gap={5} vertical className="mt-5">
                  <Flex gap={15} align="baseline" className="mx-0">
                    <Text className="text-neutral-950 text-2xl font-medium">
                      {Number(product.price) == 0
                        ? "Free"
                        : `₹ 
                      ${formatNumberWithLocalString(
                        Number(product.price) -
                          (product.discountType == "PERCENTAGE"
                            ? Number((product.price * product.discount) / 100)
                            : Number(product.discount))
                      )}`}
                    </Text>
                    {/* {Number(product.discount) > 0 && (
                      <Text className="text-productText text-base">
                        Real price
                        <Text
                          delete
                          className="text-productText text-base strike ms-2"
                        >
                          ₹ {product.price}
                        </Text>
                      </Text>
                    )} */}
                  </Flex>
                </Flex>
                <Flex gap={15} vertical className="mt-5">
                  <Text className="text-textBlack text-base font-normal">
                    {product?.description &&
                      product?.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Text>
                  <Flex gap={10} className="m-0 p-0">
                    {Number(product.quantity) > 0 && (
                      <Button
                        type="primary"
                        size="large"
                        className="px-8 py-2 p-2"
                        onClick={() => {
                          window.location.href = `https://wa.me/${ORDER_MOBILENO}?text=${product?.name
                            .split(" ")
                            .join("%20")}`;
                        }}
                      >
                        Order Now
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </>
            ) : (
              <>
                <Row
                  gutter={[10, 10]}
                  style={{ marginTop: "16px" }}
                  className="mb-6 items-center"
                >
                  <Col span={24}>
                    <Space size={8} className="flex-row items-end">
                      <Typography.Text className="text-textBlack font-semibold text-2xl">
                        {Number(product.price) == 0
                          ? "Free"
                          : `₹ 
                        ${
                          Number(product.price) -
                          (product.discountType == "PERCENTAGE"
                            ? Number((product.price * product.discount) / 100)
                            : Number(product.discount))
                        }`}
                      </Typography.Text>
                    </Space>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Typography.Text className="text-textBlack font-inter font-normal text-base">
                    {product?.description &&
                      product?.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </Typography.Text>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Flex>
      <Row className="fixed md:hidden bottom-0 z-10 w-full left-0 bg-white">
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Button
            type="primary"
            className="font-roboto h-14 rounded-sm w-full rounded-l-none px-0 flex justify-center items-center"
            onClick={() => {
              window.location.href = `https://wa.me/${ORDER_MOBILENO}?text=${product?.name
                .split(" ")
                .join("%20")}`;
            }}
            disabled={!(Number(product.quantity) > 0)}
          >
            {Number(product.quantity) > 0 ? (
              <span className="flex gap-2">
                <CreditCardFilled />
                Buy Now
              </span>
            ) : (
              "Out Of Stock"
            )}
          </Button>
        </Col>
      </Row>
      {/* <Row className=" px-2 xl:px-72 my-5">
        <Flex
          vertical
          justify="center"
          gap={10}
          className="w-full px-2 xl:px-72"
        >
          <Typography.Text className="text-3xl font-light text-center">
            About the Product
          </Typography.Text>
          <Typography.Text className="text-gray-400 text-center text-lg">
            {product.description}
          </Typography.Text>
        </Flex>
      </Row> */}
      <Divider className="my-5" />
      <Row className="" justify="center">
        <Flex vertical className="px-2 xl:px-60 w-full">
          <Typography.Title
            level={screens.lg ? 1 : 3}
            className="text-center text-[#0a4c36] mb-8"
          >
            You May Also Like
          </Typography.Title>
          <Row gutter={[24, 24]} className="justify-center">
            {product?.relativeProducts &&
              product?.relativeProducts.length &&
              product?.relativeProducts?.map((product, index) => (
                <Col xs={24} sm={12} lg={8} xl={8} key={index}>
                  <Card
                    cover={
                      <Image
                        src={product?.images?.[0]}
                        alt={product.name}
                        preview={false}
                        height={500}
                        fallback="https://www.ugaoo.com/cdn/shop/files/2_72x-100.jpg?v=1739860291&width=360"
                      />
                    }
                    className="relative"
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
                      <Typography.Title level={4}>
                        {product.name}
                      </Typography.Title>
                      <Flex gap={5} align="end">
                        <Typography.Text
                          strong
                          className="text-lg text-[#149253]"
                        >
                          {Number(product.price) == 0
                            ? "Free"
                            : `From ₹ 
                            ${
                              Number(product.price) -
                              (product.discountType == "PERCENTAGE"
                                ? Number(
                                    (product.price * product.discount) / 100
                                  )
                                : Number(product.discount))
                            }`}
                        </Typography.Text>
                      </Flex>
                      {/* <Rate
                        disabled
                        allowHalf
                        defaultValue={(Math.random() * 2 + 3).toFixed(1)}
                      /> */}
                      <Button
                        type="primary"
                        size="large"
                        className="lg:px-24"
                        onClick={() =>
                          navigate(
                            `${paths.dashboard.products}/${paths.products.details}`,
                            {
                              state: {
                                prdId: product._id,
                              },
                              replace: true,
                            }
                          )
                        }
                      >
                        VIEW PRODUCT
                      </Button>
                    </Space>
                  </Card>
                </Col>
              ))}
          </Row>
        </Flex>
      </Row>
      <Divider className="my-5" />
    </Content>
  );
};

export default ProductDetailsPage;
