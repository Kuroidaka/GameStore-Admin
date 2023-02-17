import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { productGroupApi } from '~/api/productGroup/productGroup.api';
import DeleteComponent from './ProductGroupDelete';
import ProductGroupUpdate from './ProductGroupUpdate';
import {productGroupModel} from '~/api/productGroup/productGroup.api'


const ProductGroupList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<productGroupModel[]>([]);
    const [selectModel, setSelectModel] = useState<productGroupModel>({})
    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<productGroupModel> = [
        { width: '400px', title: 'Product Group Code', dataIndex: 'Product_Group_Code', key: 'Product_Group_Code' },
        { width: '400px', title: 'Product Group Name', dataIndex: 'Product_Group_Name', key: 'Product_Group_Name' },
        { width: '240px', title: 'Status', dataIndex: 'Status', key: 'Status' },
        {
            width: '400px',
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, recode) => {
                return <Space>
                    <DeleteComponent onChange={handleSearch} id={recode.id} />
                    <ProductGroupUpdate onChange={handleSearch} id={recode.id} />
                </Space>
            },
        },
    ];
    const handleSearch = async ()  => {
       const productGroup = await productGroupApi.search({});
       setDataSource(productGroup.data.results)
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const handleProductGroupNameChange = (e: any) => {
        selectModel.Product_Group_Name = e.target.value;
        setSelectModel(selectModel)
    }
    const handleProductGroupCodeChange = (e: any) => {
        selectModel.Product_Group_Code = e.target.value;
        setSelectModel(selectModel)
    }  
   

    const handleProductGroupStatusChange = (e: any) => {
        selectModel.Status = e.target.value;
        setSelectModel(selectModel)
    }


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
           const productGroup = await productGroupApi.create(selectModel)
           if(!!productGroup) handleSearch();
        } catch (error) {
            
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Container >
            <Content>
                <Button type="primary" style={{ backgroundColor: 'var(--third_admin)' }} onClick={showModal}>
                    Add
                </Button>
                <Modal title="Add Product Group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >

                        <Form.Item label="Product Group Code">
                            <Input onChange={handleProductGroupCodeChange} />
                        </Form.Item>
                        <Form.Item label="Product Group Name">
                            <Input onChange={handleProductGroupNameChange} />
                        </Form.Item>
                        
                        <Form.Item label="Status">
                            <Input onChange={handleProductGroupStatusChange} />
                        </Form.Item>
                    </Form>
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

export default ProductGroupList;

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