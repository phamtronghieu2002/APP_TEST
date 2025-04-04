import { FC } from "react";
import { Button, FloatButton, Layout, theme, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { Theme, useTheme } from "@/contexts/ThemeContext";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout className="flex flex-col h-[100vh]">
        <FloatButton.Group placement="left">
          <FloatButton
            className="!fixed !left-3 bottom-5"
            onClick={toggleTheme}
            shape="circle"
            type="primary"
            style={{ insetInlineEnd: 94 }}
            icon={theme === Theme.LIGHT ? <SunOutlined /> : <MoonOutlined />}
          />
        </FloatButton.Group>
      <Content style={{ padding: "0px 16px" }} className="">
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
