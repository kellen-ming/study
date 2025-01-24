import { forwardRef, useImperativeHandle } from "react";
import { DataProps, FormInstance } from "./use-form/interface";
import useForm from "./use-form";
import FormContext from "./use-form/form-context";

interface FormProps {
  onReset?: () => void;
  onFinish?: (data: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  initialValues?: DataProps;
  form?: FormInstance;
  [key: string]: any;
}

const Index = (props: FormProps, ref: any) => {
  const {
    form,
    children,
    onFinish = (_data: any) => {},
    onReset = () => {},
    onFinishFailed = (_errorInfo: any) => {},
    initialValues = {},
    ...payload
  } = props;

  const [formRef] = useForm(initialValues, form);


  // 用于剔除方法，不提供给外部使用
  const {
    registerField,
    unRegisterField,
    dispatch,
    setConfigWays,
    ...formRefInstance
  } = formRef;

  /* Form 能够被 ref 标记，并操作实例。 */
  useImperativeHandle(ref, () => formRefInstance, []);

  formRef.setConfigWays({
    onFinish,
    onReset,
    onFinishFailed,
  });

  return (
    <form
      {...payload}
      onSubmit={(e) => {
        // 阻止默认事件
        e.preventDefault();
        e.stopPropagation();
        formRef.submit();
      }}
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formRef.resetFields(); /* 重置表单 */
      }}
    >
      <FormContext.Provider value={formRef}>{children}</FormContext.Provider>
    </form>
  );
};

export default forwardRef(Index);
