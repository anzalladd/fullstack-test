import { useMutation, useQuery } from '@apollo/client';
import { Button, Spin, Table } from 'antd';
import { GET_LIST_PRODUCT } from './gql/query';
import { DELETE_PRODUCT } from './gql/mutation';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function App() {
  const { loading, data, refetch, } = useQuery(GET_LIST_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, [])

  const onClickDelete = async (id: string) => {
    await deleteProduct({ variables: { id } })
    refetch()
  }

  const onClickAdd = () => {
    navigate('/add-product', { replace: true })
  }

  const onClickEdit = (id: string) => {
    navigate(`/edit-product/${id}`, { replace: true })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button color="danger" variant="solid" onClick={() => onClickDelete(record.id)}>Delete</Button>
          <Button type='primary' onClick={() => onClickEdit(record.id)}>Edit</Button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <Spin />
    )
  }

  return (
    <>
      <Button style={{ marginBottom: 16 }} onClick={onClickAdd}>Add Product</Button>
      <Table pagination={false} dataSource={data.listProducts.map((val: any) => ({ ...val, key: val.id }))} key="id" columns={columns} />
    </>
  )
}

export default App
