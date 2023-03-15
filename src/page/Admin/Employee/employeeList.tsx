import { Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '~/hook';
import { employeeApi, employeeModel } from '../../../api/employee/employee.api';
import './css/Employee.css';
import DeleteComponent from './employeeDelete';
import EmployeeUpdate from './employeeUpdate';
import { selectEmployee } from './Service/employee.slice';
// import { search } from './Service/employee.slice';


const ManageTeam = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<employeeModel[]>([]);
    const [selectModel, setSelectModel] = useState<employeeModel>({})
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const employeeData = useAppSelector(selectEmployee)

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<employeeModel> = [
        { width: '200px', title: 'Employee Code', dataIndex: 'Employee_Code', key: 'Employee_Code' },
        { width: '200px', title: 'Employee Name', dataIndex: 'Employee_Name', key: 'Employee_Name' },
        { width: '200px', title: 'Employee Phone', dataIndex: 'Employee_Phone', key: 'Employee_Phone' },
        { width: '200px', title: 'Employee CI', dataIndex: 'Employee_CI', key: 'Employee_CI' },
        { width: '200px', title: 'Employee Email', dataIndex: 'Employee_Email', key: 'Employee_Email' },
        { width: '200px', title: 'Employee BirthDay', dataIndex: 'Employee_BirthDay', key: 'Employee_BirthDay' ,render: (data) =><>{moment(data).format('DD/MM/YYYY')}</>},
        { width: '200px', title: 'Status', dataIndex: 'Status', key: 'Status' },
        {
            width: '400px',
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, recode) => {
                return <Space>
                    <DeleteComponent onChange={handleSearch} id={recode.id} />
                    <EmployeeUpdate onChange={handleSearch} id={recode.id}/>
                </Space>
            },
        },
    ];
    const handleSearch = () => {
        employeeApi.search({}).then((res: any) => {
            setDataSource(res.data.results)
        })
    }
    useEffect(() => {
        return handleSearch();
    }, []);

    const handleEmployeeNameChange = (e: any) => {
        selectModel.Employee_Name = e.target.value;
        setSelectModel(selectModel)
    }

    const handleEmployeePhoneChange = (e: any) => {
        selectModel.Employee_Phone = e.target.value;
        setSelectModel(selectModel)
    }

    const handleEmployeeEmailChange = (e: any) => {
        selectModel.Employee_Email = e.target.value;
        setSelectModel(selectModel)
    }

    const handleEmployeeCIChange = (e: any) => {
        selectModel.Employee_CI = e.target.value;
        setSelectModel(selectModel)
    }

    const handleEmployeeStatusChange = (e: any) => {
        selectModel.Status = e.target.value;
        setSelectModel(selectModel)
    }

    const handleEmployeeBirthDayChange = (value: any) => {
        selectModel.Employee_BirthDay = value;
        setSelectModel(selectModel)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        if (!!selectModel.Employee_Name){
            try {
                employeeApi.create(selectModel).then((result) => {
                    if (!!result) {
                        setSelectModel({});
                    }
                    handleSearch();
                })
            } catch (err) {
                console.log(err)
            }
    
            setIsModalOpen(false);
        }
       
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
    return (
        <Container >
            <Content>
                <Button type="primary" style={{backgroundColor: 'var(--third_admin)'}} onClick={showModal}>
                    Add Employee
                </Button>
                <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        form={form}
                        validateMessages={validateMessages}
                        initialValues={{ layout: formLayout }}
                        style={{ maxWidth: "800px" }}
                        {...formLayout}
                    >

                        <Form.Item rules={[{ required: true }]} label="Employee Name">
                            <Input onChange={handleEmployeeNameChange} />
                        </Form.Item>
                        <Form.Item label="Employee CI">
                            <Input onChange={handleEmployeeCIChange} />
                        </Form.Item>
                        <Form.Item label="Employee Phone">
                            <Input onChange={handleEmployeePhoneChange} />
                        </Form.Item>
                        <Form.Item rules={[{ type: 'email' }]} label="Employee Email">
                            <Input onChange={handleEmployeeEmailChange} />
                        </Form.Item>
                        <Form.Item label="Employee Birthday">
                            <DatePicker onChange={handleEmployeeBirthDayChange} style={{ width: '100%' }} format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item label="Status">
                            <Input onChange={handleEmployeeStatusChange} />
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

export default ManageTeam;

const Container = styled.div`
    max-width: calc(100% - 40px);
    width: 100%;
    margin: 16px 20px;

`

const Content = styled.div `
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