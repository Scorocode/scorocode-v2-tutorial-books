import React from 'react';
import { Alert, Spin, PageHeader } from 'antd';
import sc from 'sc';

import BookDetailForm from './Form';

export default class BookDetail extends React.Component {
  state = {
    isInitiating: true,
    record: null,
    success: null,
    error: null,
    alertKey: 0,
  }

  componentDidMount() {
    const { user, match: { params: { id }} } = this.props;

    if (id) {
      sc.app().pg()
        .record('app', 'public', 'book', { id })
        .sync()
        .then((record) => {
          this.setState({
            record,
            isInitiating: false,
          });
        })
        .catch((error) => {
          this.setState({
            error,
            isInitiating: false,
            alertKey: this.state.alertKey + 1,
          });
        })
    } else {
      const record = sc
        .app()
        .pg()
        .record('app', 'public', 'book')
        .set('user_id', user.id);

      this.setState({
        record,
        isInitiating: false,
      });
    }
  }

  handleSubmit = (attributes) => {
    const { record } = this.state;
    const isNew = !record.id;
    Object.entries(attributes).forEach(([k, v]) => record.set(k, v))

    record
      .save()
      .then(() => this.setState({
        success: isNew ? 'Книга добавлена' : 'Книга обновлена',
        error: null,
        alertKey: this.state.alertKey + 1,
      }))
      .catch((error) => this.setState({
        error,
        success: null,
        alertKey: this.state.alertKey + 1,
      }))
  }

  render() {
    const { error, success, alertKey, isInitiating, record } = this.state;

    return (
      isInitiating
        ? <Spin />
        : <React.Fragment>
          <PageHeader
            title={!record.id ? 'Добавить книгу' : 'Редактировать книгу'}
            onBack={() => this.props.history.goBack()}
          />

          <div style={{ width: 600 }}>
            {error && <Alert
              key={alertKey}
              type="error"
              message={error.message}
              style={{ marginBottom: '1em' }}
              showIcon
              closable
            />}

            {success && <Alert
              key={alertKey}
              type="success"
              message={success}
              style={{ marginBottom: '1em' }}
              showIcon
              closable
            />}

            {record && <BookDetailForm
              attributes={record.attributes}
              isNew={!record.id}
              onSubmit={this.handleSubmit}
            />}
          </div>
        </React.Fragment>
    );
  }
}
