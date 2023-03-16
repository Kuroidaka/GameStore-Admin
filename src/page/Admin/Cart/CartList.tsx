import { Button, Form, Input, Modal, Select, Space, Table, Tabs } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CartApi, CartDetailModel } from '~/api/cart/cart.api';
import CartDelete from './CartDelete';
import CartUpdate from './CartUpdate';
import CartSearch from './CartSearch';
import CartAdd from './CartAdd';

import handleValidUser from '../CommomHandler/token';
import { CartModel } from '~/api/cart/cart.api';
import { CustomerApi, CustomerModel } from '~/api/customer/customer.api';
import { productModel } from '~/api/product/product.api';

const CartList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<CartModel[]>([]);
    const [selectModel, setSelectModel] = useState<CartModel>({})
    const [searchModel, setSearchModell] = useState<CartModel>({})
    const [customerModel, setCustomerModel] = useState<CustomerModel[]>([])
    const [form] = Form.useForm();
    const listMethodPay = [
        {value: "Cash", label: "Cash"},
        {value: "Online", label: "Online"},
    ]
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<CartModel> = [
        { width: '400px', title: 'Cart Code', dataIndex: 'Cart_Code', key: 'Cart_Code' },
        { width: '400px', title: 'Phone Number', dataIndex: 'Cart_PhoneNumber', key: 'Cart_PhoneNumber' },
        { width: '400px', title: 'Email', dataIndex: 'Cart_Email', key: 'Cart_Email' },
        { width: '400px', title: 'Method Pay', dataIndex: 'Cart_MethodPay', key: 'Cart_MethodPay' },
        { width: '400px', title: 'Amount', dataIndex: 'Card_Amount', key: 'Card_Amount' },
        { width: '400px', title: 'Note', dataIndex: 'Cart_Note', key: 'Cart_Note' },
        { width: '400px', title: 'Customer', dataIndex: 'Customer_Code', key: 'Customer_Code' },
        // { width: '400px', title: 'Cart Name', dataIndex: 'Product_Group_Name', key: 'Product_Group_Name' },
        { width: '240px', title: 'Status', dataIndex: 'Status', key: 'Status' },
        {
            width: '400px',
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, recode) => {
                return <Space>
                    <CartDelete onChange={handleSearch} id={recode.id} />
                    <CartUpdate customerModel={customerModel} onChange={handleSearch} id={recode.id} />
                </Space>
            },
        },
    ];
    const handleSearch = async ()  => {
       const productGroup = await CartApi.search(searchModel);
       setDataSource(productGroup.data.results)
    }
    // get list customer
    const setCustomer = async () => {
        const customer = await CustomerApi.search({});
        const result =  customer.data.results.map((item :CustomerModel)=> {
            return {
                value: item.Customer_Code,
                label: item.Customer_Name
            }
        })
        setCustomerModel(result)
    }

    useEffect(() => {
        setCustomer()
        handleSearch();
        handleValidUser();
    }, []);
    const handleChangeProductList = (value : CartDetailModel[]) => {
        selectModel.Product_List = value        
        setSelectModel(selectModel)

    }
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Cart_PhoneNumber = e.target.value;
        setSelectModel(selectModel)
    }
    const handleCardCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Cart_Code = e.target.value;
        setSelectModel(selectModel)
    }  
    const handleCardEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Cart_Email = e.target.value;
        setSelectModel(selectModel)
    } 
    const handleCardNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Cart_Note = e.target.value;
        setSelectModel(selectModel)
    }   

    const handleCardStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Status = e.target.value;
        setSelectModel(selectModel)
    }
    const handleCustomerChange = (value: string) => {
        selectModel.Customer_Code = value;
        setSelectModel(selectModel)
    }
    const handleCardMethodPayChange = (value: string) => {
        selectModel.Cart_MethodPay = value;
        setSelectModel(selectModel)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {
        e.preventDefault();
        try {
           const cart = await CartApi.create(selectModel)
          if (!!cart.data){
            // const product array = await car
          }
        } catch (error) {
            
        }
        setIsModalOpen(false);
        handleSearch();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearchModelChange = (value : any) : void => {
        setSearchModell({
            ...searchModel,
            ...value
        })
    }
    const items = [
        {
          key: '1',
          label: `Cart Detail`,
          children: <><Form
          form={form}
          initialValues={{ layout: formLayout }}
          {...formLayout}
      >

          <Form.Item label="Cart Code">
              <Input onChange={handleCardCodeChange} />
          </Form.Item>

          <Form.Item label="Phone Number">
              <Input onChange={handleCardNumberChange} />
          </Form.Item>
          <Form.Item label="Email">
              <Input onChange={handleCardEmailChange} />
          </Form.Item>
          <Form.Item label="Note">
              <Input onChange={handleCardNoteChange} />
          </Form.Item>
          <Form.Item label="Method Pay">
              <Select options={listMethodPay} onChange={handleCardMethodPayChange} />
          </Form.Item>
          <Form.Item label="Customer">
              <Select options={customerModel} onChange={handleCustomerChange} />
          </Form.Item>
          
          <Form.Item label="Status">
              <Input onChange={handleCardStatusChange} />
          </Form.Item>
      </Form></>,
        },
        {
          key: '2',
          label: `Cart Product`,
          children:<><CartAdd onChange={handleChangeProductList}/></>,
        },
      ];
    return (
        <Container >
          <CartSearch onChange={handleSearchModelChange}/>
            <Content>
            <Button type="primary" style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onClick={handleSearch}>
                    Search
                </Button>
                <Button type="primary" style={{ backgroundColor: 'var(--third_admin)' }} onClick={showModal}>
                    Add
                </Button>
                <Modal title="Add Cart" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={items} />

                    
                </Modal>
                <Table
                    columns={columns}
                    // scroll={{ x: auto }}
                    dataSource={dataSource}
                />
            </Content>
            
         
        </Container>
        
    );
}

export default CartList;

const Container = styled.div`
    max-width: calc(100% - 40px);
    width: 100%;
    margin: 16px 20px;

`

const Content = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em, rgb(0 0 0 / 25%) 0px 0.125em 0.5em, rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
    background-color: #ffffff;
    border-radius: 10px;
`