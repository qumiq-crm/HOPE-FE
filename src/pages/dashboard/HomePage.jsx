import {
  Button,
  Card,
  Carousel,
  Col,
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
import {
  homePageCarousel,
  homePageCarouselForMobile,
} from "../../utils/dummy-data";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import useDashboard from "../../hooks/useDashboard";
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
  const { categories, loading, newArrivals } = useDashboard();

  return (
    <Content>
      {/* <div style={frameStyle}>
        {" "} */}
      {/* Apply the frame styles */}
      <Carousel autoplay autoplaySpeed={3000}>
        {screens.lg
          ? homePageCarousel.map((item, key) => (
              <Flex key={key} justify="center">
                <Flex style={contentStyle} justify="center">
                  <Flex
                    vertical
                    className="bg-gray-100 flex items-center justify-center relative"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100vw",
                      height: "50rem",
                    }}
                  >
                    <Typography.Text
                      level={2}
                      className="absolute bottom-40 z-10 text-[#0a4c36] text-center text-2xl font-medium"
                      style={{
                        display: "inline-block",
                        background: "rgba(255, 255, 255, 0.7)",
                        padding: "15px 25px",
                        borderRadius: "50px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <span>&quot;{item.title || ""}&quot;</span>
                    </Typography.Text>

                    <Button
                      type="primary"
                      size="large"
                      className="absolute bottom-20 z-10 px-10"
                      onClick={() => navigate(paths.dashboard.products)}
                    >
                      SHOP NOW
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ))
          : homePageCarouselForMobile.map((item, key) => (
              <Flex key={key} justify="center">
                <Flex style={contentStyle} justify="center">
                  <Flex
                    vertical
                    className="flex items-center justify-center relative"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100vw",
                      height: "20rem",
                    }}
                  >
                    <Typography.Text
                      level={2}
                      className="absolute bottom-52 left-0 z-10 text-[#0a4c36] text-xs text-center font-medium"
                      style={{
                        display: "inline-block",
                        width: "80%",
                        background: "rgba(255, 255, 255, 0.7)",
                        padding: "15px 25px",
                        borderRadius: "0px 50px 50px 0px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <span>&quot;{item.title || ""}&quot;</span>
                    </Typography.Text>

                    <Button
                      type="primary"
                      size="middle"
                      className="absolute bottom-7 z-10 px-4"
                      onClick={() => navigate(paths.dashboard.products)}
                    >
                      SHOP NOW
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ))}
      </Carousel>
      <Flex
        vertical
        className="w-full bg-emerald-50/50 py-10 px-2 xl:px-60"
        justify="center"
      >
        <Typography.Title
          level={screens.lg ? 2 : 4}
          className="text-center text-[#0a4c36] mb-12"
        >
          About Hope
        </Typography.Title>

        <Row justify="center" gutter={[48, 48]} className=" mx-auto mt-4">
          <Col xs={24} className="text-center">
            <Typography.Text className="text-base text-gray-700 md:text-xl">
              &quot;HOPE&quot; was founded in 2012 by a group of like-minded
              people who were distraught by the fact that many of their family
              members were falling victims to cancer and later commenced its
              operations in 2015, registered as Hope Agricultural & Charitable
              Trust. <br /> Through the realization that a good percentage of
              cancer cases are related to the use of pesiticide-laden vegetables
              alone, (HOPE/The Trust) aims at educating every household to grow
              organic vegetables in their own kitchen gardens and provides all
              necessary support and materials on a nonprofit basis. <br />{" "}
              (HOPE/The Trust) also has GST Registration, which makes it
              possible to dispatch materials required for organic
              farming/kitchen gardens throughout India. Seeds and saplings
              (traditional categories) required for such is provided totally
              free of cost. <br /> The entire state of Kerala has been
              segregated into 4-5 separate zones and with the exception of Covid
              times, (HOPE/The Trust) has been regularly organizing zone-wise
              meets once every 4 months, with the sole purpose of educating and
              creating awareness about organic farming among the local farmers
              and recognizing and appreciating those farmers who lead by
              example. <br /> An amount of Rs.200 per head is collected towards
              registration fee for such events, and the surplus amount after
              meeting food expenses is contributed towards the care of cancer
              patients. The organizing costs of such events are completely borne
              by (HOPE/The Trust) itself. <br /> Through regular assessment of
              its operations, necessary steps are taken to extend more and more
              suppport to kitchen farmers every year. We operate mainly through
              social media and online organic agriculture forums and
              communities.
            </Typography.Text>
          </Col>
        </Row>
      </Flex>
      {/* </div> */}
      {loading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} active />
          ))}
        </>
      ) : (
        <>
          <Flex vertical className="px-2 xl:px-60 mt-20 mb-12" justify="center">
            <Typography.Title
              level={screens.lg ? 2 : 3}
              className="text-center text-[#0a4c36] mb-12"
            >
              Shop By Category
            </Typography.Title>
            <Row gutter={[64, 64]} className="justify-center w-full">
              {categories.map((category, index) => (
                <Col key={index} xs={12} md={12} lg={12} xl={12}>
                  <div
                    className="category-card hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer h-full"
                    onClick={() =>
                      navigate(paths.dashboard.products, {
                        state: {
                          categoryName: category?.name,
                          categoryDesc: category?.description,
                          categoryId: category?._id,
                        },
                      })
                    }
                  >
                    <Flex
                      vertical
                      className="text-center h-full"
                      justify="space-between"
                      align="center"
                    >
                      <div className="category-image-container p-4 flex justify-center">
                        <Image
                          src={category.image}
                          alt={category.name}
                          preview={false}
                          width={screens.lg ? 120 : 100}
                          height={screens.lg ? 120 : 100}
                          style={{ objectFit: "contain" }}
                          fallback="https://www.ugaoo.com/cdn/shop/files/2._Bestseller_0153b41a-9169-49f4-a322-5415b827d8bf.png?v=1739970441&width=360"
                        />
                      </div>
                      <Typography.Text
                        className="text-base font-medium mb-4 text-[#0a4c36] px-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {category.name}
                      </Typography.Text>
                    </Flex>
                  </div>
                </Col>
              ))}
            </Row>
            <Flex justify="center" className="mt-16">
              <Button
                type="primary"
                size="large"
                className="px-10 py-2 text-base font-medium h-auto"
                onClick={() => navigate(paths.dashboard.products)}
              >
                VIEW ALL CATEGORIES
              </Button>
            </Flex>
          </Flex>
          {/* <Flex vertical className="px-2 xl:px-60 ">
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
      </Flex> */}

          {newArrivals && newArrivals.length ? (
            <Flex vertical className="px-2 xl:px-60 mt-14">
              <Typography.Title
                level={screens.lg ? 1 : 3}
                className="text-center text-[#0a4c36] mb-8"
              >
                New Arrivals
              </Typography.Title>
              <Row gutter={[24, 24]} className="justify-center">
                {newArrivals.map((product, index) => (
                  <Col xs={24} sm={12} lg={8} xl={8} key={index}>
                    <Card
                      cover={
                        <Image
                          src={product.images?.[0]}
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
          ) : (
            ""
          )}
        </>
      )}
      {/* <Flex
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
      </Flex> */}
    </Content>
  );
};

export default HomePage;
