import { Button, Form, Input } from "antd";

function UserForm() {
    const [form] = Form.useForm();
    const title = 'Crear usuario';

    const handleSubmit = () => {
      const values = form.getFieldsValue();
      console.log('Todos los datos del formulario: ', values);
    }

    return (
      <div><h1>{title}</h1><Form
          name="layout-multiple-horizontal"
          layout="horizontal"
          form={form}
        >
          <Form.Item label="horizontal" name="horizontal" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Obtener datos
            </Button>
          </Form.Item>
        </Form></div>
    );
}

export default UserForm