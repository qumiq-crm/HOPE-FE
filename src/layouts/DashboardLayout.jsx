/* eslint-disable react/prop-types */
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Image,
  Input,
  List,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import Logo from "../assets/Logo-1.png";
import APPSTORE from "../assets/app-store.png";
import PLAYSTORE from "../assets/play-store.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { paths } from "../routes/paths";
import useCategoryList from "../hooks/useCategoryList";

const DashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState(undefined);
  const navigate = useNavigate();
  const { Text, Title } = Typography;
  const { categories, loading } = useCategoryList(true);

  const aboutLinks = [
    ...categories.map((x)=>x.name)
  ];

  // const customerCareLinks = [
  //   "Take The Plant Quiz",
  //   "Track Order",
  //   "Shipping Policy",
  //   "Terms and Conditions",
  //   "Privacy Policy",
  //   "FAQs",
  //   "Terms of Service",
  //   "Refund policy",
  // ];

  // const offersLinks = ["Plant Parent Rewards Club", "Ugaoo Coupons"];
  useEffect(() => {
    console.log(categories, activeTab);
  }, [activeTab]);
  return (
    <Flex vertical>
      <div className="min-h-screen">
        <Row
          className="w-full px-2 xl:px-4  bg-[#FFF6F4]"
          justify="space-between"
          gutter={[0, 10]}
        >
          <Col xs={12} lg={8} className="flex justify-center items-center">
            <Link to="/" onClick={() => setActiveTab(undefined)}>
              <Image
                src={Logo}
                height={90}
                alt="Hope Logo"
                className="h-8"
                preview={false}
              />
            </Link>
          </Col>
          <Col xs={12} lg={8} className="flex justify-center items-center">
            <Typography.Text className="text-center font-medium md:font-normal text-[#029354] text-base md:text-lg lg:text-3xl">
              Hope: Agriculture and charitable trust
            </Typography.Text>
          </Col>
          <Col xs={24} lg={8} className="flex justify-center items-center">
            <Row
              justify="center"
              align="middle"
              gutter={[30, 12]}
              className="space-x-4 pb-2"
            >
              {loading && <Skeleton active />}
              {!loading &&
                categories.map((item, i) => (
                  <Typography.Text
                    key={i}
                    onClick={() => {
                      setActiveTab(i + 1);
                      navigate(`${paths.dashboard.products}`, {
                        state: {
                          categoryName: item?.name,
                          categoryDesc: item?.description,
                          categoryId: item?._id,
                        },
                      });
                    }}
                    className={`cursor-pointer uppercase text-sm font-medium ${
                      activeTab === i + 1
                        ? "border-b-2 text-[#029354] border-[#029354]"
                        : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Typography.Text>
                ))}
            </Row>
          </Col>

          <Col xs={24} lg={6} className="flex justify-center items-center">
            <Row>
              {/* <Flex justify="center" className={`${!screens.lg && "w-full"}`}>
              <Input
                placeholder="Search for plants, seeds and planters..."
                prefix={<SearchOutlined />}
                className=""
              />
            </Flex> */}
              {/* <Flex justify="center" className={`${!screens.lg && "w-full"}`} gap={10}>
              <Button type="primary" className="rounded-full px-2 py-5 flex items-center gap-1 text-2xl text-white cursor-pointer">
                <ShoppingCartOutlined />
              </Button>
              <Button type="primary" className="rounded-full px-2 py-5 flex items-center gap-1 text-2xl text-white cursor-pointer">
                <InboxOutlined />
              </Button>
            </Flex> */}
            </Row>
          </Col>
        </Row>
        {children}
      </div>
      <Row className="bg-white py-12 px-4">
        <Flex vertical className="max-w-7xl mx-auto w-full">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <Title level={5} className="text-gray-700 mb-4">
                Links
              </Title>
              <List
                dataSource={aboutLinks}
                renderItem={(item) => (
                  <List.Item className="!border-none !p-0 mb-2">
                    <Link className="text-gray-600 hover:text-emerald-600">
                      {item}
                    </Link>
                  </List.Item>
                )}
              />
            </Col>

            

            <Col xs={24} md={12}>
              

              <Title level={5} className="text-gray-700 mt-8 mb-4">
                GET IN TOUCH
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                <Text className="text-gray-600">
                  WhatsApp us at: +917356828384
                </Text>
                <Text className="text-gray-600">Call: +917356828384</Text>
                <Text className="text-gray-600">Email: agrarianhope@gmail.com</Text>
                <Text className="text-gray-600">Address: Hope vattalur Malappuram Kerala 676507</Text>
              </Space>
            </Col>

          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default DashboardLayout;
