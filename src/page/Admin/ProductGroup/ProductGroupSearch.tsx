import { Col, Collapse, Form, Input, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { productGroupModel } from '~/api/productGroup/productGroup.api';
// import { Form } from 'react-router-dom';

const { Panel } = Collapse;



const ProductGroupSearch = (props: any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<productGroupModel>({})

    const handleProductGroupCodeChange = (e: any) => {
        searchModel.Product_Group_Code = e.target.value
        props.onChange(searchModel);
    }

    const handleProductGroupNameChange = (e: any) => {
        searchModel.Product_Group_Name = e.target.value
        props.onChange(searchModel);
    }

   
    const handleStatusChange = (e: any) => {
        searchModel.Status = e.target.value
        props.onChange(searchModel);
    }


    const handleStatusGroup = (e: any) => {
        searchModel.Product_Group_Code = e.target.value
        props.onChange(searchModel);
    }



    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    return (
        <Collapse style={{ width: "80%", height: 300 }} defaultActiveKey={['1']} ghost>
            <Panel style={{ fontSize: "20px" }} header="Search Product Group" key="1">
                <Content>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Product Group Code">
                                    <Input onChange={handleProductGroupCodeChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Product Group Name">
                                    <Input onChange={handleProductGroupNameChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="Status">
                                    <Input onChange={handleStatusChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Content>

            </Panel>
        </Collapse>)
}

    ;

export default ProductGroupSearch;