import { Layout } from ".";
import { LayoutProps } from "./Layout";


interface FormItemProps extends LayoutProps {
  [key: string]: any;
}

const FormItem = (props: FormItemProps) => {
  const { children } = props;
  <Layout {...props}>
    {children}
  </Layout>
}

export default FormItem;
