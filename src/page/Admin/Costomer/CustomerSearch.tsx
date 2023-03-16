import { Col, Collapse, Form, Input, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { CustomerModel } from '~/api/customer/customer.api';
import { employeeModel } from '~/api/employee/employee.api';
// import { Form } from 'react-router-dom';

const { Panel } = Collapse;



const CustomerSearch = (props: any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<CustomerModel>({})

    const handleCustomerCodeChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Customer_Code = e.target.value;
        props.onChange(searchModel);
    }
    const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Customer_Name = e.target.value;
        props.onChange(searchModel);
    }

    const handleCustomerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Customer_Phone = e.target.value;
        props.onChange(searchModel);
    }


    const handleCustomerEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Customer_Email = e.target.value;
        props.onChange(searchModel);
    }
    const handleStatusChange = ( e: React.ChangeEvent<HTMLInputElement>) =>{
        searchModel.Status = e.target.value;
        props.onChange(searchModel);

    }
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    return (
        <Collapse style={{ width: "80%", height: 300 }} defaultActiveKey={['1']} ghost>
            <Panel style={{ fontSize: "20px" }} header="Search Customer" key="1">
                <Content>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Customer Code">
                                    <Input onChange={handleCustomerCodeChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Customer Name">
                                    <Input onChange={handleCustomerNameChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Customer Phone">
                                    <Input onChange={handleCustomerPhoneChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                            <Form.Item label="Customer Email">
                                    <Input onChange={handleCustomerEmailChange} />
                                </Form.Item>
                            </Col>
                        </Row> 
                   
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Status">
                                    <Input onChange={handleStatusChange} />
                                </Form.Item></Col>
                           
                        </Row>
                    </Form>
                </Content>

            </Panel>
        </Collapse>)
}

    ;

export default CustomerSearch;