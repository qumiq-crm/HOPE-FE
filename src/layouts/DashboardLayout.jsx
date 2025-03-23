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
  Space,
  Typography,
} from "antd";
import Logo from "../assets/Logo-1.png";
import APPSTORE from "../assets/app-store.png";
import PLAYSTORE from "../assets/play-store.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { paths } from "../routes/paths";

const DashboardLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState();
  const navigate = useNavigate();
  const { Text, Title } = Typography;

  const navigationItems = [
    { key: `${paths.dashboard.products}?cat=plants`, label: "PLANTS" },
    { key: `${paths.dashboard.products}?cat=seeds`, label: "SEEDS" },
    { key: `${paths.dashboard.products}?cat=pots`, label: "POTS & PLANTERS" },
    { key: `${paths.dashboard.products}?cat=care`, label: "PLANT CARE" },
    { key: paths.dashboard.blogs, label: "BLOG" },
  ];

  const aboutLinks = [
    "Our Story",
    "Careers",
    "Contact Us",
    "Locate Stores",
    "Own Grown",
    "Garden Services & Maintenance",
  ];

  const customerCareLinks = [
    "Take The Plant Quiz",
    "Track Order",
    "Shipping Policy",
    "Terms and Conditions",
    "Privacy Policy",
    "FAQs",
    "Terms of Service",
    "Refund policy",
  ];

  const offersLinks = ["Plant Parent Rewards Club", "Ugaoo Coupons"];
  return (
    <Flex vertical className="min-h-screen">
      <Row
        className="w-full px-2 xl:px-60  bg-[#FFF6F4]"
        justify="space-between"
      >
        <Col xs={24} lg={4} className="flex justify-center items-center">
          <Image
            src={Logo}
            height={90}
            alt="Hope Logo"
            className="h-8"
            preview={false}
          />
        </Col>
        <Col xs={24} lg={14} className="flex justify-center items-center">
          <Row
            justify="center"
            align="middle"
            gutter={[30, 12]}
            className="space-x-4 pb-2"
          >
            {navigationItems.map((item) => (
              <Typography.Text
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  navigate(item.key);
                }}
                className={`cursor-pointer text-sm font-medium ${
                  activeTab === item.key
                    ? "border-b-2 text-[#029354] border-[#029354]"
                    : "text-gray-500"
                }`}
              >
                {item.label}
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
      <Row className="bg-white py-12 px-4">
        <Flex vertical className="max-w-7xl mx-auto w-full">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={6}>
              <Title level={5} className="text-gray-700 mb-4">
                ABOUT US
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

            <Col xs={24} md={6}>
              <Title level={5} className="text-gray-700 mb-4">
                CUSTOMER CARE
              </Title>
              <List
                dataSource={customerCareLinks}
                renderItem={(item) => (
                  <List.Item className="!border-none !p-0 mb-2">
                    <Link className="text-gray-600 hover:text-emerald-600">
                      {item}
                    </Link>
                  </List.Item>
                )}
              />
            </Col>

            <Col xs={24} md={6}>
              <Title level={5} className="text-gray-700 mb-4">
                OFFERS & REWARDS
              </Title>
              <List
                dataSource={offersLinks}
                renderItem={(item) => (
                  <List.Item className="!border-none !p-0 mb-2">
                    <Link className="text-gray-600 hover:text-emerald-600">
                      {item}
                    </Link>
                  </List.Item>
                )}
              />

              <Title level={5} className="text-gray-700 mt-8 mb-4">
                GET IN TOUCH
              </Title>
              <Space direction="vertical" size="small" className="w-full">
                <Text className="text-gray-600">
                  WhatsApp us at: 7090970909
                </Text>
                <Text className="text-gray-600">Call: +91-9129912991</Text>
                <Text className="text-gray-600">Email: support@ugaoo.com</Text>
              </Space>
            </Col>

            <Col xs={24} md={6}>
              <Title level={5} className="text-gray-700 mb-4">
                SIGN UP FOR OUR NEWSLETTER
              </Title>
              <Input.Search
                placeholder="Enter email address"
                enterButton={
                  <Button type="primary" className="bg-emerald-700">
                    →
                  </Button>
                }
                className="mb-4"
              />
              <Text className="block mb-8 text-gray-600">
                For plant care tips, our featured plant of the week, exclusive
                offers and discounts
              </Text>

              <Title level={5} className="text-gray-700 mb-4">
                FOLLOW US
              </Title>
              <Space size="large" className="mb-8">
                <Link>
                  <FacebookFilled className="text-2xl text-gray-600 hover:text-emerald-600" />
                </Link>
                <Link>
                  <TwitterOutlined className="text-2xl text-gray-600 hover:text-emerald-600" />
                </Link>
                <Link>
                  <InstagramOutlined className="text-2xl text-gray-600 hover:text-emerald-600" />
                </Link>
                <Link>
                  <LinkedinFilled className="text-2xl text-gray-600 hover:text-emerald-600" />
                </Link>
                <Link>
                  <YoutubeFilled className="text-2xl text-gray-600 hover:text-emerald-600" />
                </Link>
              </Space>

              <Title level={5} className="text-gray-700 mb-4">
                Download App!
              </Title>
              <Space size="middle">
                <Link>
                  <Image
                    src={APPSTORE}
                    alt="Google Play"
                    className="h-10 object-contain"
                    preview={false}
                  />
                </Link>
                <Link>
                  <Image
                    src={PLAYSTORE}
                    alt="App Store"
                    className="h-10 object-contain"
                    preview={false}
                  />
                </Link>
              </Space>
            </Col>
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default DashboardLayout;
