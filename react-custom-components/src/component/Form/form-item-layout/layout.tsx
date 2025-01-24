import { Col, Row, Tooltip, TooltipProps } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";
import { validateStatusProps } from "../use-form/interface";
import useCss from "../../../hooks/useCss";

export interface LayoutProps extends PropsWithChildren {
  label: string | React.ReactNode ;
  tooltip: TooltipProps['title'];
  required?: boolean;
  status?: validateStatusProps;
  message?: string;
}


const Index = ({ 
  children, 
  label, 
  tooltip,
  status,
  message,
  required 
}: LayoutProps) => {
  const classRule = useCss({
    color: "red",
    fontSize: 12,
    lineHeight: "22px",
    padding: "0 6px",
  });
  return (
    <>
      <Row gutter={8}>
         <Col
          span={4}
          style={{ textAlign: "right", lineHeight: "32px", fontSize: 14 }}
        >
          {required && <span style={{ color: "red", marginRight: 3 }}>*</span>}
          {label || ""}
          {tooltip && (
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined style={{ margin: "0 3px" }} />
            </Tooltip>
          )}
          {label && "："}
        </Col>
        <Col span={9}> 
          {children}
          {status === "rej" && <div className={classRule}>{message}</div>}
        </Col>
      </Row>
      <div style={{ height: 12 }}></div>
    </>
  );
};

export default Index;