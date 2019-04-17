import React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button, Typography, Icon, Popconfirm } from 'antd';
import styled from 'styled-components';
import sc from 'sc';

const { Text, Title } = Typography;

const ButtonsContainer = styled.div`
  margin-bottom: 1em;
`;

const DEFAULT_FETCH_CONDITIONS = {
  page: 1,
  pageSize: 5,
  filterBy: {},
};

export default class BookList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
    list: {
      ...DEFAULT_FETCH_CONDITIONS,
      items: [],
      total: 0,
    },
    error: null,
    errorKey: 0,
  }

  conditions = {
    ...DEFAULT_FETCH_CONDITIONS,
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    const { user } = this.props;

    const { page, pageSize } = this.conditions;

    this.setState({ isLoading: true });

    const query = sc.app().pg().query('app', 'public', 'book');

    query
      .filterBy({ user_id: user.id })
      .limit(pageSize)
      .page(page)
      .sync()
      .then((list) => {
        this.setState({
          list,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error,
          errorKey: this.state.errorKey + 1,
          isLoading: false,
        });
      })

  }

  handleAddBook = () => {
    this.props.history.push('/p/book')
  }

  handleRemoveBook = (record) => {
    record
      .delete()
      .then(this.fetchItems)
  }

  handleChangeTable = (pagination) => {
    const { page, pageSize } = this.conditions;

    if (pagination.current !== page || pagination.pageSize !== pageSize) {
      this.conditions = {
        page: pagination.current,
        pageSize: pagination.pageSize,
      };
    }

    this.fetchItems();
  };

  render() {
    const { list, isLoading } = this.state;

    return (
      <React.Fragment>
        <ButtonsContainer>
          <Button
            type="primary"
            icon="plus"
            onClick={this.handleAddBook}
          >
            Добавить
          </Button>
          &nbsp;
          <Button
            icon="reload"
            onClick={this.fetchItems}
          >
            Обновить
          </Button>
        </ButtonsContainer>

        <Table
          rowKey={(item) => item.get('id')}
          dataSource={list.items}
          onChange={this.handleChangeTable}
          pagination={{
            current: list.page,
            pageSize: list.pageSize,
            pageSizeOptions: ['5', '10', '20', '30'],
            showSizeChanger: true,
            total: list.total,
          }}
          loading={isLoading}
        >
          <Table.Column
            title="Книга"
            key="title"
            render={(item) => (
              <React.Fragment>
                <Title level={4}>
                  <Link to={`/p/book/${item.get('id')}`}>
                    {item.get('title')}
                  </Link>
                </Title>

                <Text type="secondary">{item.get('author')}</Text>
              </React.Fragment>
            )}
          />

          <Table.Column
            width={250}
            title="Примечание"
            key="notes"
            render={(item) => item.get('notes')}
          />

          <Table.Column
            width={120}
            title="Статус"
            key="status"
            render={(item) => item.get('status')}
          />

          <Table.Column
            width={100}
            key="actions"
            render={(item) => (
              <React.Fragment>
                <Link
                  to={`/p/book/${item.get('id')}`}
                  title="Редактировать книгу"
                >
                  <Icon type="edit" />
                </Link>
                &nbsp;
                <Popconfirm
                  title="Вы действительно хотите удалить книгу?"
                  onConfirm={() => this.handleRemoveBook(item)}
                >
                  {/* eslint-disable-next-line */}
                  <a title="Удалить книгу">
                    <Icon type="delete" />
                  </a>
                </Popconfirm>
              </React.Fragment>
            )}
            align="right"
          />
        </Table>
      </React.Fragment>
    );
  }
}
