import React from 'react';
import * as PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class BookDetailForm extends React.Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    isNew: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, attributes) => {
      if (!err) {
        onSubmit(attributes)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <div style={{ width: 400 }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="Название книги"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Укажите название книги!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Автор"
            >
              {getFieldDecorator('author', {
                rules: [{ required: true, message: 'Укажите автора!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Статус"
            >
              {getFieldDecorator('status', {
                initialValue: 'Отложена',
                rules: [{ required: true, message: 'Выберите статус' }],
              })(
                <Select>
                  <Select.Option value="Отложена">Отложена</Select.Option>
                  <Select.Option value="Читаю">Читаю</Select.Option>
                  <Select.Option value="Прочтена">Прочтена</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Заметки"
            >
              {getFieldDecorator('notes')(
                <Input.TextArea />
              )}
            </Form.Item>

            <div>
              <Button type="primary" htmlType="submit">
                {this.props.isNew ? 'Добавить' : 'Обновить'}
              </Button>
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Form.create({
  name: 'book_form',
  mapPropsToFields: (props) => {
    const fields = {};

    Object
      .entries(props.attributes)
      .forEach(([name, value]) => fields[name] = Form.createFormField({
        value,
      }));

    return fields;
  }
})(BookDetailForm);
