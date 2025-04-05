/* eslint-disable react/prop-types */
import {
  Col,
  Flex,
  Image,
  Row,
} from "antd";
import Logo from "../assets/Logo-1.png";

const AdminLayout = ({ children }) => {
  return (
    <Flex vertical className="min-h-screen">
      <Row
        className="w-full px-2 xl:px-60  bg-[#FFF6F4]"
        justify="space-between"
      >
        <Col xs={24} lg={24} className="flex justify-center items-center">
          <Image
            src={Logo}
            height={90}
            alt="Hope Logo"
            className="h-8"
            preview={false}
          />
        </Col>
        {/* <Col xs={24} lg={14} className="flex justify-center items-center">
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
        </Col> */}
      </Row>
      {children}
    </Flex>
  );
};

export default AdminLayout;
