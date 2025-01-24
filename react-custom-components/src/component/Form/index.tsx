import CustomForm  from "./form";
import CustomFormItem from "./form-item";

const Form = Object.assign(CustomForm, {
  Item: CustomFormItem,
});

export default Form;