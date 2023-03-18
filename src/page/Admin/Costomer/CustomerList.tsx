import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomerApi } from '~/api/customer/customer.api'
import {CustomerModel} from '~/api/customer/customer.api'
import handleValidUser from '../CommomHandler/token';
import CustomerDelete from './CustomerDelete';
import CustomerSearch from './CustomerSearch';
import CustomerUpdate from './CustomerUpdate';

const CustomerList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<CustomerModel[]>([]);
    const [selectModel, setSelectModel] = useState<CustomerModel>({})
    const [searchModel, setSearchModell] = useState<CustomerModel>({})

    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<CustomerModel> = [
        { width: '400px', title: 'Customer Code', dataIndex: 'Customer_Code', key: 'Customer_Code' },
        { width: '400px', title: 'Customer Name', dataIndex: 'Customer_Name', key: 'Customer_Name' },
        { width: '400px', title: 'Customer Email', dataIndex: 'Customer_Email', key: 'Customer_Email' },
        { width: '400px', title: 'Customer Phone', dataIndex: 'Customer_Phone', key: 'Customer_Phone' },

        { width: '240px', title: 'Status', dataIndex: 'Status', key: 'Status' },
    ];
    const handleSearch = async ()  => {
       const customer = await CustomerApi.search(searchModel);
       setDataSource(customer.data.results)
    }

    useEffect(() => {
        handleValidUser();
        handleSearch();
    }, []);

    const handleCustomerNameChange = (e: any) => {
        selectModel.Customer_Name = e.target.value;
        setSelectModel(selectModel)
    }
    const handleCustomerCodeChange = (e: any) => {
        selectModel.Customer_Code = e.target.value;

        setSelectModel(selectModel)
    }  
   
    const handleCustomerEmailChange = (e: any) => {
        selectModel.Customer_Email = e.target.value;
        setSelectModel(selectModel)
    }

    const handleCustomerPhoneChange = (e: any) => {
        selectModel.Customer_Phone = e.target.value;
        setSelectModel(selectModel)
    }

    const handleCustomerStatusChange = (e: any) => {
        selectModel.Status = e.target.value;
        setSelectModel(selectModel)
    }


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
           const customer = await CustomerApi.create(selectModel)
           if(!!customer){
           }
        } catch (error) {
            
        }
        handleSearch()

        setIsModalOpen(false);
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[] , selectedRows: CustomerModel[]) => {
            setSelectedRowKeys(selectedRowKeys)
        },
    };

    return (
        <Container >
          <CustomerSearch onChange={handleSearchModelChange}/>
            <Content>
            <Button type="primary" style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onClick={handleSearch}>
                    Search
                </Button>
                <Button type="primary" style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onClick={showModal}>
                    Add
                </Button>
                    <CustomerUpdate style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onChange={handleSearch} id={selectedRowKeys} />
                <CustomerDelete style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onChange={handleSearch} id={selectedRowKeys} />
                <Modal title="Add Product Group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >

                        <Form.Item label="Customer Code">
                            <Input onChange={handleCustomerCodeChange} />
                        </Form.Item>
                        <Form.Item label="Customer Name">
                            <Input onChange={handleCustomerNameChange} />
                        </Form.Item>
                        <Form.Item label="Customer Email">
                            <Input onChange={handleCustomerEmailChange} />
                        </Form.Item> 
                        <Form.Item label="Customer Phone">
                            <Input onChange={handleCustomerPhoneChange} />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Input onChange={handleCustomerStatusChange} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table
                    columns={columns}
                    rowKey="id"
                    // scroll={{ x: auto }}
                    dataSource={dataSource}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                />
            </Content>
            
         
        </Container>
        
    );
}

export default CustomerList;

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