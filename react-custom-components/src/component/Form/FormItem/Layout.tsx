// Layout
import { Col, Row, Tooltip, TooltipProps } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren {
  label: string | React.ReactNode ;
  tooltip: TooltipProps['title']
}


const Index = ({ children, label, tooltip }: LayoutProps) => {
  return (
    <>
      <Row gutter={8}>
         <Col
          span={4}
          style={{ textAlign: "right", lineHeight: "32px", fontSize: 14 }}
        >
          {label || ""}
          {tooltip && (
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined style={{ margin: "0 3px" }} />
            </Tooltip>
          )}
          {label && "："}
        </Col>
        <Col span={9}> {children}</Col>
      </Row>
      <div style={{ height: 12 }}></div>
    </>
  );
};

export default Index;