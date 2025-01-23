import type { 
  ConfigWayProps, 
  DataProps, 
  FormInstance, 
  ReducerAction, 
  updateChangeProps, 
  validateRule,
  NameProps,
  updateProps,
  validateRuleProps,
  validateRuleListProps
} from "./interface";

class FromStore {
  /** 管理表单的整体数据 */
  store: DataProps = {};
  /** 保存更新的对象 */
  update_store: updateChangeProps = {};
  /** 保存初始值 */
  initialValues: DataProps = {};
  /** 收录对应的方法集合 */
  configWays: ConfigWayProps = {};
  /** 校验表单的规则 */
  validateRule: validateRule = {};
  /** 校验队列 */
  validateQueue: any[] = []; 

  constructor(initialValues: DataProps) {
    this.store = initialValues
    this.initialValues = initialValues;
  }

  /** 用于暴露方法 */
  public getDetail(): FormInstance {
    return {
      unRegisterField: this.unRegisterField, // 卸载表单方法
      registerField: this.registerField, // 注册表单方法
      getFieldValue: this.getFieldValue, // 获取对应的值
      dispatch: this.dispatch, // 方法派发
      setConfigWays: this.setConfigWays, // 设置方法区间
      submit: this.submit, // 用于表单提交
      resetFields: this.resetFields, // 重置表单
      getFieldValidate: this.getFieldValidate, // 获取表单的验证值
    }
  }

  /** 注册表单字段 */
  registerField(name: NameProps, updateChange: updateProps) {
    this.update_store[name] = updateChange;
    this.validateRule[name] = this.createValidate(name, updateChange);
  }

  /** 创建验证模块 */
  createValidate(name: NameProps, updateChange: updateProps): validateRuleListProps | null {
    const { rules = [], required = false, message = '' } = updateChange;
    if (rules.length === 0 && !required) {
      return null;
    }
    
    // 抽离出必填项
    const requiredFlay = required || rules.find(r => r?.required)?.required

    // 如果存在必填则更新对应表单
    if(requiredFlay) {
      this.updateStoreField(name);
    }

    return {
      message,
      requiredMessage: message,
      required: requiredFlay || false,
      status: 'pen', // 设置为等待状态
      rules: rules.filter((r) => r?.required)  // 过滤掉有required项
    }
  }

  /** 根据name卸载对应表单字段 */
  unRegisterField(name: string) {
    delete this.update_store[name];
    delete this.validateRule[name];
  } 
  
  /** 根据name获取值, 或获取所有值 */
  getFieldValue(name?: string) {
    if(name) {
      return this.store[name]
    }
    return this.store;
  }

  /** 根据name获取表单的验证值 */
  getFieldValidate(name: string) {
    return this.validateRule[name];
  }
  
  /** 方法派发 */
  dispatch(action: ReducerAction) {
    switch(action.type) {
      case 'updateValue': {
        const { name, value } = action;
        this.updataValue(name, value);
        break;
      }
    }
  }

  /** 数据更新 */
  // 更新值
  updataValue(name: NameProps, value: any) {
    // 将store对象扩展，将name属性赋值为value
    this.store = {
      ...this.store,
      [name]: value,
    };
    
    // 更新store字段
    this.updateStoreField(name);
  }

  updateStoreField(name: NameProps) {
    const update = this.update_store[name];
    if(update) {
      update?.updateValue();
    }
  }

}


export default FromStore;