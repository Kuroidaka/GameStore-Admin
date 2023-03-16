import { Col, Collapse, Form, Input, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { employeeModel } from '~/api/employee/employee.api';
// import { Form } from 'react-router-dom';

const { Panel } = Collapse;



const EmployeeSearch = (props: any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<employeeModel>({})

    const handleEmployeeCodeChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Employee_Code = e.target.value;
        props.onChange(searchModel);
    }
    const handleEmployeeNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Employee_Name = e.target.value;
        props.onChange(searchModel);
    }

    const handleEmployeePhoneChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Employee_Phone = e.target.value;
        props.onChange(searchModel);
    }

    const handleEmployeeCIChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Employee_CI = e.target.value;
        props.onChange(searchModel);
    }

    const handleEmployeeEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        searchModel.Employee_Email = e.target.value;
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
            <Panel style={{ fontSize: "20px" }} header="Search Employee" key="1">
                <Content>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Employee Code">
                                    <Input onChange={handleEmployeeCodeChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Employee Name">
                                    <Input onChange={handleEmployeeNameChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Employee Phone">
                                    <Input onChange={handleEmployeePhoneChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Employee CI">
                                    <Input onChange={handleEmployeeCIChange} />
                                </Form.Item>
                            </Col>
                        </Row> 
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Employee Email">
                                    <Input onChange={handleEmployeeEmailChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Employee Birthday">
                                    <Input onChange={( ) => {}} />
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

export default EmployeeSearch;