import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Alert, Divider, Card } from 'antd';
import sc from 'sc';
import { AuthContainer } from './styled';

class Register extends React.Component {
  state = {
    error: null,
    errorKey: 0,
  }

  handleSubmit = (e) => {
    const { history } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        sc.app().auth()
          .signUp(values.email, values.password)
          .then(() => {
            history.replace('/p')
          })
          .catch((error) => {
            this.setState({
              error,
              errorKey: this.state.errorKey + 1,
            })
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { error, errorKey } = this.state;

    return (
      <AuthContainer>
        <Card style={{ width: 400 }}>
          <Form onSubmit={this.handleSubmit}>
            <h2 style={{ textAlign: 'center' }}>
              Регистрация в приложении
            </h2>

            <br />

            {error && <Alert
              key={errorKey}
              type="error"
              message={error.message}
              style={{ marginBottom: '1em' }}
              showIcon
              closable
            />}

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Введите ваш e-mail!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="E-mail" />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Введите пароль!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Пароль"
                  autoComplete="new-password"
                />
              )}
            </Form.Item>

            <div>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Зарегистрироваться
              </Button>

              <Divider type="vertical" />

              <Link to="/login">Войти</Link>
            </div>
          </Form>
        </Card>
      </AuthContainer>
    );
  }
}

export default Form.create({ name: 'register_form' })(Register);
