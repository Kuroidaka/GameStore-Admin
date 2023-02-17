import { Button, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { productApi } from '~/api/product/product.api';
import {productModel} from '~/api/product/product.api'
import ProductGroupSelect from '../ProductGroup/Controll/ProductGroupSelect'
import DeleteComponent from './ProductDelete';
import ProductUpdate from './ProductUpdate';
const ProductList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<productModel[]>([]);
    const [selectModel, setSelectModel] = useState<productModel>({})
    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<productModel> = [
        { width: '200px', title: 'Product Code', dataIndex: 'Product_Code', key: 'Product_Code' },
        { width: '200px', title: 'Product Name', dataIndex: 'Product_Name', key: 'Product_Name' },
        { width: '200px', title: 'Product Group', dataIndex: 'Product_Group', key: 'Product_Group' },
        { width: '200px', title: 'Product Price', dataIndex: 'Product_Price', key: 'Product_Price' },
        { width: '200px', title: 'Product Detail', dataIndex: 'Product_Detail', key: 'Product_Detail' },
        { width: '240px', title: 'Product Description', dataIndex: 'Product_Description', key: 'Product_Description' },
        { width: '200px', title: 'Status', dataIndex: 'Status', key: 'Status' },
        {
            width: '400px',
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, recode) => {
                return <Space>
                    <DeleteComponent onChange={handleSearch} id={recode.id} />
                    <ProductUpdate onChange={handleSearch} id={recode.id} />
                </Space>
            },
        },
    ];
    const handleSearch = async ()  => {
       const product = await productApi.search({});
       setDataSource(product.data.results)
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const handleProductNameChange = (e: any) => {
        selectModel.Product_Name = e.target.value;
        setSelectModel(selectModel)
    }
    const handleProductCodeChange = (e: any) => {
        selectModel.Product_Code = e.target.value;
        setSelectModel(selectModel)
    }  
    const handleProductGroupChange = (e: any) => {
        selectModel.Product_Group_Code = e.target.value;
        setSelectModel(selectModel)
    }  
    const handleProductPriceChange = (e: any) => {
        selectModel.Product_Price = e.target.value;
        setSelectModel(selectModel)
    }  
    const handleProductDetailChange = (e: any) => {
        selectModel.Product_Detail = e.target.value;
        setSelectModel(selectModel)
    }




    const handleProductStatusChange = (e: any) => {
        selectModel.Status = e.target.value;
        setSelectModel(selectModel)
    }


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
           const product = await productApi.create(selectModel)
           if(!!product) handleSearch();
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
                <Modal title="Add Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >

                        <Form.Item label="Product Code">
                            <Input onChange={handleProductCodeChange} />
                        </Form.Item>
                        <Form.Item label="Product Name">
                            <Input onChange={handleProductNameChange} />
                        </Form.Item>
                            <ProductGroupSelect style={{ width: "100%" }}/>
                        <Form.Item label="Product Price">
                            <Input onChange={handleProductPriceChange} />
                        </Form.Item>
                        <Form.Item label="Product Detail">
                            <Input onChange={handleProductDetailChange} />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Input onChange={handleProductStatusChange} />
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

export default ProductList;

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