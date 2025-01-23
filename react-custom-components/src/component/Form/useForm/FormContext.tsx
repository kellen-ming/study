import { createContext } from 'react';
import type { FormInstance } from './interface';

const warningFunc: any = () => {};

const FormContext = createContext<FormInstance>({
  registerField: warningFunc,
  unRegisterField: warningFunc,
  resetFields: warningFunc,
  getFieldValue: warningFunc,
  dispatch: warningFunc,
  setConfigWays: warningFunc,
  submit: warningFunc,
  getFieldValidate: warningFunc,
});

export default FormContext;