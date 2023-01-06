import { Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { employeeApi } from '../../../api/employee/employee.api';
import DeleteComponent  from './Employee_Delete'
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
interface getEmployeeResponse{
    data: employee[]
}
const EmployeeUpdate = (props:{id:any,onChange:any}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState<employee>({});
    const [selectModel, setSelectModel] = useState<employee>({})
    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const handleEmployeeNameChange = (e: any) => {
        selectModel.Employee_Name = e.target.value;
        setSelectModel(selectModel)
    }
    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            employeeApi.update(selectModel).then((result) => {
                if (!!result) {
                    setSelectModel({});
                }
                // handleSearch();
            })
        } catch (err) {
            console.log(err)
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
        employeeApi.getById(props.id).then(result => {
            if(!!result){
                setdataSource(result.data)
            }
        })
        setIsModalOpen(true);
    };
    return (
        <div style={{marginTop: '20%'}}>
            <a type="primary" onClick={showModal}>
                Edit
            </a>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={{ layout: formLayout }}
                    {...formLayout}
                >

                    <Form.Item label="Employee Name">
                        <Input value={dataSource.Employee_Name} onChange={handleEmployeeNameChange} />
                    </Form.Item>
                    <Form.Item label="Employee CI">
                        <Input value={dataSource.Employee_CI} onChange={handleEmployeeCIChange} />
                    </Form.Item>
                    <Form.Item label="Employee Phone">
                        <Input value={dataSource.Employee_Phone} onChange={handleEmployeePhoneChange} />
                    </Form.Item>
                    <Form.Item label="Employee Email">
                        <Input value={dataSource.Employee_Email} onChange={handleEmployeeEmailChange} />
                    </Form.Item>
                    <Form.Item label="Employee Birthday">
                        <DatePicker onChange={handleEmployeeBirthDayChange} style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item label="Employee Avatar">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Input value={dataSource.Status} onChange={handleEmployeeStatusChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default EmployeeUpdate;
