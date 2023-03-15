import { Collapse, Input, Form, Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { productModel } from '~/api/product/product.api';
// import { Form } from 'react-router-dom';
import ProductGroupSelect from '../ProductGroup/Controll/ProductGroupSelect';

const { Panel } = Collapse;



const ProductSearch = (props : any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<productModel>({})

    const handleProductCodeChange = (e: any) => {
        searchModel.Product_Code = e.target.value
        props.onChange(searchModel);
    }

    const handleProductNameChange = (e: any) => {
        searchModel.Product_Name = e.target.value
        props.onChange(searchModel);
    }

    const handleProductPriceChange = (e: any) => {
        searchModel.Product_Price = e.target.value
        props.onChange(searchModel);
    }

    const handleProductDetailChange = (e: any) => {
        searchModel.Product_Detail = e.target.value
        props.onChange(searchModel);
    }

    const handleStatusChange = (e: any) => {
        searchModel.Status = e.target.value
        props.onChange(searchModel);
    }


    const handleStatusGroup = (e: any) => {
        searchModel.Product_Code = e.target.value
        props.onChange(searchModel);
    }



    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    return (
        <Collapse style={{ width: "80%" ,height: 300}} defaultActiveKey={['1']} ghost>
            <Panel style={{ fontSize: "20px" }} header="Search Product" key="1">
                <Content>
                <Form
                    form={form}
                    initialValues={{ layout: formLayout }}
                    {...formLayout}
                >
                    <Row>
                        <Col span={12}>  
                        <Form.Item label="Product Code">
                            <Input onChange={handleProductCodeChange} />
                        </Form.Item></Col>
                        <Col span={12}><Form.Item label="Product Name">
                            <Input onChange={handleProductNameChange}/>
                        </Form.Item></Col>
                    </Row>


                    <Row>
                        <Col span={12}>
                            <Form.Item label="Product Price">
                                <Input onChange={handleProductPriceChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Product Detail">
                                <Input onChange={handleProductDetailChange}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item label="Status">
                                <Input onChange={handleStatusChange}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        <ProductGroupSelect  style={{ width: "100%" }}/>

                        </Col>
                    </Row>


                </Form>
                </Content>
                
            </Panel>
        </Collapse>)
}

    ;

export default ProductSearch;