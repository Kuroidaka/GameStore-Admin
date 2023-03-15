import { Button, Form, Input, Modal, Space, Table, Tabs } from 'antd';
import { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { adminApi } from '~/api/admin/authApi';
import { productApi, productModel } from '~/api/product/product.api';
import UploadImage from '~/component/UploadImage/UploadImage';
import ProductGroupSelect from '../ProductGroup/Controll/ProductGroupSelect';
import DeleteComponent from './ProductDelete';
import ProductSearch from './ProductSearch';
import ProductUpdate from './ProductUpdate';
const ProductList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<productModel[]>([]);
    const [selectModel, setSelectModel] = useState<productModel>({})
    const [searchModel, setSearchModell] = useState<productModel>({})

    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<productModel> = [
        { width: '200px', title: 'Product Code', dataIndex: 'Product_Code', key: 'Product_Code' },
        { width: '200px', title: 'Product Name', dataIndex: 'Product_Name', key: 'Product_Name' },
        { width: '200px', title: 'Product Group', dataIndex: 'Product_Group_Code', key: 'Product_Group_Code' },
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
    const handleSearchModelChange = (value : any) : void => {
        setSearchModell({
            ...searchModel,
            ...value
        })
    }
    const handleSearch = async ()  => {
       const product = await productApi.search({searchModel});
       setDataSource(product.data.results)
    }

    useEffect(() => {
        handleSearch();
    }, []);

    const onChangeTab = (key: string) => {
        console.log(key);
      };

    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        selectModel.Product_Description = e.target.value;
        setSelectModel(selectModel)
    }
    

    const handleProductNameChange = (e: any) => {
        selectModel.Product_Name = e.target.value;
        setSelectModel(selectModel)
    }

    const handleProductCodeChange = (e: any) => {
        selectModel.Product_Code = e.target.value;
        setSelectModel(selectModel)
    }

    const handleProductGroupChange = (value: string) => {
        selectModel.Product_Group_Code = value;
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

    const handleImageProduct = (value: Array<UploadFile>) => {
        // selectModel.Product_Images.push(value);
        selectModel.Product_Images = value[0];
        console.log(selectModel)
        setSelectModel(selectModel)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSearchAction = (e:any) => {

    }

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
           const product = await productApi.create(selectModel)
           
           if(!!product){
                let form:any= new FormData();
                form.append('product',selectModel.Product_Images?.originFileObj)
                axios({
                    method: 'post',
                    url: 'http://localhost:4000/api/v1/product/productImage',
                    data: form,
                    headers: { 
                        'Content-Type': "multipart/form-data" ,
                    },
                  })
                    .then(res => {
                      console.log(res)
                    })
                    .catch(error => {
                      console.error(error)
                    })
               handleSearch();
           }else {
                await adminApi.refreshToken()
           }
        } catch (error) {
            
        }
        setIsModalOpen(false);
    };
    

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            key: '1',
            label: `Product Detail`,
            children: <>   <Form
            form={form}
            initialValues={{ layout: formLayout }}
            {...formLayout}
        >

            <Form.Item label="Product Code">
                <Input  defaultValue="Product Code" onChange={handleProductCodeChange} />
            </Form.Item>
            <Form.Item label="Product Name">
                <Input onChange={handleProductNameChange} />
            </Form.Item>
                <ProductGroupSelect onChange={handleProductGroupChange} style={{ width: "100%" }}/>
            <Form.Item label="Product Price">
                <Input onChange={handleProductPriceChange} />
            </Form.Item>
            <Form.Item label="Product Detail">
                <Input onChange={handleProductDetailChange} />
            </Form.Item>
            <Form.Item label="Status">
                <Input onChange={handleProductStatusChange} />
            </Form.Item>
            <Form.Item label="Image">
                <UploadImage onChange={handleImageProduct}/>
            </Form.Item>
        </Form></>,
          },
          {
            key: '2',
            label: `Product's description`,
            children: <>
            
             <textarea style={{width: "100%",height: "200px"}} onChange={onChangeDescription} name="content" id="editor">
            </textarea>
            </>
      ,
          },
    ]

    return (
        <Container >
            <ProductSearch onChange={handleSearchModelChange}/>

            <Content>   
            <Control>
            <Button type="primary" style={{ backgroundColor: 'var(--third_admin)',marginRight: 4}} onClick={handleSearch}>
                    Search
                </Button>
                <Button type="primary" style={{ backgroundColor: 'var(--third_admin)' }} onClick={showModal}>
                    Add
                </Button>
            </Control>
            
                <Modal style={{width: "800px"}} title="ADD PRODUCT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
                 
                </Modal>

                <Table
                    columns={columns}
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
const Control = styled.div`
    max-width: calc(100% - 40px);
    width: 100%;
    margin: 16px 20px;

`

export const Content = styled.div`
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