import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Grid,
  Image,
  Rate,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import saveFlat from "../../assets/icons/SaveFlat.svg";
import cashBack from "../../assets/icons/ExtraCashback.svg";
import { formatNumberWithLocalString } from "../../utils/priceFormat";
import { CreditCardFilled } from "@ant-design/icons";
import { bestsellerProducts } from "../../utils/dummy-data";
import { useLocation } from "react-router-dom";
import useProductDetails from "../../hooks/useProductsDetails";

const { useBreakpoint } = Grid;
const ProductDetailsPage = () => {
  const { prdId } = useLocation().state;
  const { Text } = Typography;
  const screens = useBreakpoint();
  const { loading, product } = useProductDetails({ productId: prdId });
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
    <Content>
      <Row align="middle" gutter={24} className="mt-6 px-2 xl:px-72">
        <Col xs={24} md={12} className="flex flex-col align-middle p-0">
          <Card size="small" className="rounded-2xl p-0">
            <Image
              src=""
              alt="No image available"
              width="100%"
              height={340}
              className="object-contain "
              fallback="https://www.ugaoo.com/cdn/shop/files/3_95c81721-0beb-47c4-8eae-3efad6742baf.jpg?v=1717308876&width=360"
            />
            <Flex gap={10} justify="center">
              {[2, 3, 4, 6]?.map((image, index) => (
                <Image
                  key={index}
                  src=""
                  alt="prd"
                  // onClick={() => setSelectedImageIndex(index)}
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
              {/* <Flex vertical className="mt-3 hidden">
                <Text
                  strong
                  className="font-roboto text-gray-400 text-xs font-light"
                >
                  Select your color:{" "}
                </Text>
                <Flex gap={5} align="center" className="mt-4">
                  {["red", "yellow", "green"].map((color, index) => (
                    <Avatar
                      key={index}
                      style={{ backgroundColor: color }}
                      size={25}
                    />
                  ))}
                </Flex>
              </Flex> */}

              <Flex gap={20} vertical>
                <Flex
                  gap={30}
                  justify="start"
                  align="center"
                  className="mx-0 mt-5"
                >
                  {Number(product?.discount || 0) > 0 && (
                    <Flex justify="center" align="center" gap={10}>
                      <Image
                        preview={false}
                        src={saveFlat}
                        alt="Save flat icon"
                      />
                      <Text className="text-textDimGreen text-base">
                        Save ₹{" "}
                        {formatNumberWithLocalString(
                          product.discountType == "PERCENTAGE"
                            ? Number((product.price * product.discount) / 100)
                            : Number(product.discount)
                        )}
                      </Text>
                    </Flex>
                  )}
                  <Flex justify="center" align="center" gap={10}>
                    <Image preview={false} src={cashBack} alt="Earn Cashback" />
                    <Text className="text-textDimGreen font-roboto text-base">
                      Earn Cashback
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex gap={5} vertical className="mt-5">
                <Flex gap={15} align="baseline" className="mx-0">
                  <Text className="text-neutral-950 text-2xl font-medium">
                    ₹{" "}
                    {formatNumberWithLocalString(
                      Number(product.price) -
                        (product.discountType == "PERCENTAGE"
                          ? Number((product.price * product.discount) / 100)
                          : Number(product.discount))
                    )}
                  </Text>
                  {Number(product.discount) > 0 && (
                    <Text className="text-productText text-base">
                      Real price
                      <Text
                        delete
                        className="text-productText text-base strike ms-2"
                      >
                        ₹ {product.price}
                      </Text>
                    </Text>
                  )}
                </Flex>

                <Text className="text-productText text-base font-normal">
                  Inclusive of GST
                </Text>
              </Flex>
              <Flex gap={15} vertical className="mt-5">
                <Text className="text-textBlack text-base font-normal">
                  This item will be delivered within 2 to 4 working days with
                  standard delivery charge.
                </Text>
                <Flex gap={10} className="m-0 p-0">
                  {Number(product.quantity) > 0 && (
                    <Button
                      type="primary"
                      size="large"
                      className="px-8 py-2 p-2"
                      onClick={() => {
                        window.location.href = `https://wa.me/+919995144332?text=${product?.name.split(" ").join("%20")}`;
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
                    <Typography.Text
                      delete
                      className="text-textGray text-lg font-roboto"
                    >
                      ₹ {product.price}
                    </Typography.Text>
                    <Typography.Text className="text-textBlack font-semibold text-2xl">
                      ₹{" "}
                      {Number(product.price) -
                        (product.discountType == "PERCENTAGE"
                          ? Number((product.price * product.discount) / 100)
                          : Number(product.discount))}
                    </Typography.Text>
                  </Space>
                </Col>

                <Row className="flex gap-2">
                  <Col>
                    <Flex gap={10} align="center">
                      <Image
                        preview={false}
                        src={saveFlat}
                        alt="Save flat icon"
                        className="w-6"
                      />
                      <Typography.Text className="text-textDimGreen font-roboto text-xs">
                        Save ₹{" "}
                        {formatNumberWithLocalString(
                          product.discountType == "PERCENTAGE"
                            ? Number((product.price * product.discount) / 100)
                            : Number(product.discount)
                        )}
                      </Typography.Text>
                    </Flex>
                  </Col>
                  <Col>
                    <Flex gap={10} align="center">
                      <Image
                        preview={false}
                        src={cashBack}
                        alt="Get Extra Cashback"
                        className="w-6"
                      />
                      <Typography.Text className="text-textDimGreen font-roboto text-xs">
                        Get Extra Cashback
                      </Typography.Text>
                    </Flex>
                  </Col>
                </Row>
              </Row>
              <Row className="mt-2">
                <Typography.Text className="text-textBlack font-inter font-normal text-base">
                  This item will be delivered within 2 to 4 working days with
                  standard delivery charge.
                </Typography.Text>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row className="fixed md:hidden bottom-0 z-10 w-full left-0 bg-white">
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Button
            type="primary"
            className="font-roboto h-14 rounded-sm w-full rounded-l-none px-0 flex justify-center items-center"
            onClick={() => {
              window.location.href = `https://wa.me/+919995144332?text=${product?.name.split(" ").join("%20")}%20[${product?.SKUCode}]`;
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
      <Row className=" px-2 xl:px-72 my-5">
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
      </Row>
      <Divider className="my-5" />
      <Row className="" justify="center">
        <Flex vertical className="px-2 xl:px-60 ">
          <Typography.Title
            level={screens.lg ? 1 : 3}
            className="text-center text-[#0a4c36] mb-8"
          >
            You May Also Like
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
                    <Typography.Title level={4}>
                      {product.title}
                    </Typography.Title>
                    <Flex gap={5} align="end">
                      <Typography.Text delete className="text-gray-400">
                        ₹ {product.originalPrice}
                      </Typography.Text>
                      <Typography.Text
                        strong
                        className="text-lg text-[#149253]"
                      >
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
        </Flex>
      </Row>
      <Divider className="my-5" />
    </Content>
  );
};

export default ProductDetailsPage;
