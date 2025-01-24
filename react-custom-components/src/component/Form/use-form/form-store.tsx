import type {
  ConfigWayProps,
  DataProps,
  FormInstance,
  ReducerAction,
  updateChangeProps,
  validateRule,
  NameProps,
  updateProps,
  validateRuleListProps,
  validateStatusProps,
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
    this.store = initialValues;
    this.initialValues = initialValues;
  }

  /** 用于暴露方法 */
  public getDetail = (): FormInstance => {
    return {
      unRegisterField: this.unRegisterField, // 卸载表单方法
      registerField: this.registerField, // 注册表单方法
      getFieldValue: this.getFieldValue, // 获取对应的值
      dispatch: this.dispatch, // 方法派发
      setConfigWays: this.setConfigWays, // 设置方法区间
      submit: this.submit, // 用于表单提交
      resetFields: this.resetFields, // 重置表单
      getFieldValidate: this.getFieldValidate, // 获取表单的验证值
    };
  }

  /** 注册表单字段 */
  registerField = (name: NameProps, updateChange: updateProps) => {
    // 注册更新字段
    this.update_store[name] = updateChange;
    // 注册字段校验规则
    this.validateRule[name] = this.createValidate(name, updateChange);
  }

  /** 根据name卸载对应表单字段 */
  unRegisterField = (name: NameProps) => {
    delete this.update_store[name];
    delete this.validateRule[name];
  }

  /** 创建验证模块 */
  createValidate = (name: NameProps, updateChange: updateProps): validateRuleListProps | null => {
    const { rules = [], required = false, message = "" } = updateChange;
    if (rules.length === 0 && !required) {
      return null;
    }

    // 抽离出必填项
    const requiredFlay = required || rules.find((r) => r?.required)?.required;

    // 如果存在必填则更新对应表单
    if (requiredFlay) {
      this.updateStoreField(name);
    }

    return {
      message,
      requiredMessage: message,
      required: requiredFlay || false,
      status: "pen", // 设置为等待状态
      rules: rules.filter((r) => r?.required), // 过滤掉有required项
    };
  }

  /** 根据name获取值, 或获取所有值 */
  getFieldValue = (name?: NameProps) => {
    if (name) {
      return this.store[name];
    }
    return this.store;
  }

  /** 根据name获取表单的验证值 */
  getFieldValidate = (name: NameProps) =>{
    return this.validateRule[name];
  }

  /** 方法派发 */
  dispatch = (action: ReducerAction) => {
    switch (action.type) {
      case "updateValue": {
        const { name, value } = action;
        this.updataValue(name, value);
        break;
      }
      case "validateField": {
        const { name } = action;
        this.validateFieldValue(name);
      }
    }
  }

  /** 数据更新 */
  // 更新值
  updataValue = (name: NameProps, value: any) => {
    // 将store对象扩展，将name属性赋值为value
    this.store = {
      ...this.store,
      [name]: value,
    };

    // 更新store字段
    this.updateStoreField(name);
  }

  updateStoreField = (name: NameProps) => {
    const update = this.update_store[name];
    if (update) {
      update?.updateValue();
    }
  }

  /** 用于单个验证表单 */
  validateFieldValue = (name: NameProps) => {
    const data = this.validateRule[name];
    if (!data) return null;
    const value = this.store[name];
    const last_status = data.status;
    const last_message = data.message;
    let status: validateStatusProps = "res";
    if (data.required && !value) {
      status = "rej";
      data.message = data?.requiredMessage || "";
    }

    data.rules.map((v) => {
      if (status !== "rej" && value && v.rule) {
        if (v.rule instanceof RegExp && !v.rule.test(value)) {
          status = "rej";
          data.message = v.message || "";
        }

        if (typeof v.rule === "function" && !v.rule(value)) {
          status = "rej";
          data.message = v.message || "";
        }
      }
    });

    if (last_status !== status || last_message !== data.message) {
      const validateUpdate = this.updateStoreField.bind(this, name);
      this.validateQueue.push(validateUpdate);
    }

    this.promiseValidate();

    data.status = status;
    return status;
  }

  /** 异步校验队列 */
  promiseValidate = () => {
    if (this.validateQueue.length === 0) return null;
    Promise.resolve().then(() => {
      do {
        const validateUpdate = this.validateQueue.shift();

        if (validateUpdate) {
          validateUpdate(); /* 触发更新 */
        }
      } while (this.validateQueue.length > 0);
    });
  }

  /** 设置方法区间 */
  setConfigWays = (configWays: ConfigWayProps) => {
    this.configWays = configWays;
  };

  /** 用于表单提交 */
  submit = (cb?: any) => {
    const status = this.validateField();

    const { onFinish, onFinishFailed } = this.configWays;

    if (!status) {
      const errorFields = this.errorValidateFields();

      cb &&
        cb({
          errorFields,
          values: this.store,
        });

      onFinishFailed &&
        onFinishFailed({
          errorFields,
          values: this.store,
        });
    } 
    else {
      onFinish && onFinish(this.store);
      cb && cb(this.store);
    }
  };

  /** 错误收集 */
  errorValidateFields = () => {
    let errorList: any = [];
    Object.keys(this.validateRule).forEach((name) => {
      const data = this.validateRule[name];
      if (data && data.status === "rej") {
        errorList = [...errorList, { name, errors: data.message }];
      }
    });
    return errorList;
  };

  /** 用于集中表单验证 */
  validateField = () => {
    let flag = true;
    Object.keys(this.validateRule).forEach((name) => {
      const status = this.validateFieldValue(name);
      if (status === "rej") flag = false;
    });
    return flag;
  };

  /** 重置表单 */
  resetFields = (cb?: () => void) => {
    const { onReset } = this.configWays;
    Object.keys(this.store).forEach((key) => {
      // 重置表单的时候，如果有初始值，就用初始值，没有就删除
      this.initialValues[key]
        ? (this.store[key] = this.initialValues[key])
        : delete this.store[key];
      this.updateStoreField(key);
    });

    Object.keys(this.validateRule).forEach((key) => {
      const data = this.validateRule[key];
      if (data) {
        if (data.status === "rej") this.updateStoreField(key);
        data.status = "pen";
      }
    });
    cb && cb();
    onReset && onReset();
  };
}

export default FromStore;
