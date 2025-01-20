import { Form as AntForm, Input, Button } from 'antd'


export function Form() {
  return (
    <AntForm
    initialValues={{ book: "玩转 React Hooks" }}
    onFinish={(data: any) => {
      console.log("表单数据:", data);
    }}
    onReset={() => {
      console.log("重制表单成功");
    }}
  >
    <AntForm.Item label="小册名称" name="book">
      <Input placeholder="请输入小册名称" />
    </AntForm.Item>

    <AntForm.Item label="作者" name="name">
      <Input placeholder="请输入作者" />
    </AntForm.Item>

    <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
      <Button style={{ marginLeft: 4 }} htmlType="reset">
        重制
      </Button>
    </AntForm.Item>
  </AntForm>
  )
}