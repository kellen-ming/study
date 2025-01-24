import { useRef } from "react";
import { FormInstance, DataProps } from "./interface";
import FormStore from "./form-store";

const useForm = (initialValues: DataProps, formInstance?: FormInstance) => {
  const formRef = useRef<FormInstance | null>();

  if (!formRef.current) {
    // 如果存在实例，则直接使用
    if (formInstance) {
      formRef.current = formInstance;
    } else {
      // 创建一个实例，帮我们获取对应的方法，而 getDetail 是暴露的方法集合
      formRef.current = new FormStore(initialValues).getDetail();
    }
  }

  return [formRef.current];
};

export default useForm;
