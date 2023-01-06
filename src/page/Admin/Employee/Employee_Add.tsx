import { Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { employeeApi } from '../../../api/employee/employee.api';
import DeleteComponent from './Employee_Delete'
import EmployeeUpdate from './Employee_Update'
import './css/Employee.css';
interface employee {
    id?: number,
    Employee_Name?: string,
    Employee_Phone?: string,
    Employee_CI?: string,
    Employee_Email?: string,
    Employee_Avatar?: string,
    Employee_BirthDay?: Date,
    Status?: string,
}


const ManageTeam = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState([]);
    const [selectModel, setSelectModel] = useState<employee>({})
    const [form] = Form.useForm();
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const columns: ColumnsType<employee> = [
        { width: '200px', title: 'Employee Code', dataIndex: 'Employee_Code', key: 'Employee_Code' },
        { width: '200px', title: 'Employee Name', dataIndex: 'Employee_Name', key: 'Employee_Name' },
        { width: '200px', title: 'Employee Phone', dataIndex: 'Employee_Phone', key: 'Employee_Phone' },
        { width: '200px', title: 'Employee CI', dataIndex: 'Employee_CI', key: 'Employee_CI' },
        { width: '200px', title: 'Employee Email', dataIndex: 'Employee_Email', key: 'Employee_Email' },
        { width: '200px', title: 'Employee BirthDay', dataIndex: 'Employee_BirthDay', key: 'Employee_BirthDay' },
        { width: '200px', title: 'Status', dataIndex: 'Status', key: 'Status' },
        {
            width: '300px',
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
        employeeApi.search({}).then((result: any) => {
            setdataSource(result.results)
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
        try {
            employeeApi.update(selectModel).then((result) => {
                if (!!result) {
                    setSelectModel({});
                }
                handleSearch();
            })
        } catch (err) {
            console.log(err)
        }

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ marginTop: '20%' }}>
            <Button type="primary" onClick={showModal}>
                Add Employee
            </Button>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={{ layout: formLayout }}
                    {...formLayout}
                >

                    <Form.Item label="Employee Name">
                        <Input onChange={handleEmployeeNameChange} />
                    </Form.Item>
                    <Form.Item label="Employee CI">
                        <Input onChange={handleEmployeeCIChange} />
                    </Form.Item>
                    <Form.Item label="Employee Phone">
                        <Input onChange={handleEmployeePhoneChange} />
                    </Form.Item>
                    <Form.Item label="Employee Email">
                        <Input onChange={handleEmployeeEmailChange} />
                    </Form.Item>
                    <Form.Item label="Employee Birthday">
                        <DatePicker onChange={handleEmployeeBirthDayChange} style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item label="Employee Avatar">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Input onChange={handleEmployeeStatusChange} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={columns}
                scroll={{ x: 1300 }}
                dataSource={dataSource}
            />
        </div>
    );
}

export default ManageTeam;