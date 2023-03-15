import { DatePicker, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { employeeApi, employeeModel } from '../../../api/employee/employee.api';
import './css/Employee.css';


const EmployeeUpdate = (props: { id: any, onChange: any }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectModel, setSelectModel] = useState<employeeModel>({})
    const [form] = Form.useForm();
    useEffect(() => {
        console.log(selectModel)

    }, [selectModel])
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            selectModel.id = props.id
            employeeApi.update(selectModel).then((result) => {
                if (!!result) {
                    setSelectModel({});
                }
            })
        } catch (err) {
            console.log(err)
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleEmployeeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Employee_Name=e.target.value
        setSelectModel({
            ...selectModel,
            Employee_Name: e.target.value
        })
    }
    const handleEmployeePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Employee_Phone = e.target.value;
        setSelectModel({
            ...selectModel,
            Employee_Phone: e.target.value
        })
    }

    const handleEmployeeEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Employee_Email = e.target.value;
        setSelectModel({
            ...selectModel,
            Employee_Email: e.target.value
        })
    }

    const handleEmployeeCIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Employee_CI = e.target.value;
        setSelectModel({
            ...selectModel,
            Employee_CI: e.target.value
        })
    }

    const handleEmployeeStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Status = e.target.value;
        setSelectModel({
            ...selectModel,
            Status: e.target.value
        })
    }

    const handleEmployeeBirthDayChange = (value: any) => {
        // selectModel.Employee_BirthDay = value;
        setSelectModel({
            ...selectModel,
            Employee_BirthDay: value
        })
    }
    const showModal = () => {
        debugger
        employeeApi.getById(props.id).then(result => {
            if (!!result) {
                setSelectModel(result.data.data)
            }
        })
        setIsModalOpen(true);
    };

    return (
        <div >
            <a type="primary" onClick={showModal}>
                Edit
            </a>
            <Modal title="Edit employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={{ layout: formLayout }}
                    {...formLayout}
                >
                    <Form.Item label="Employee Code">
                        <Input disabled={true} value={selectModel.Employee_Code} onChange={(e) => handleEmployeeNameChange(e)} />
                    </Form.Item>
                    <Form.Item label="Employee Name">
                        <Input value={selectModel.Employee_Name} onChange={(e) => handleEmployeeNameChange(e)} />
                    </Form.Item>
                    <Form.Item label="Employee CI">
                        <Input value={selectModel.Employee_CI} onChange={handleEmployeeCIChange} />
                    </Form.Item>
                    <Form.Item label="Employee Phone">
                        <Input value={selectModel.Employee_Phone} onChange={handleEmployeePhoneChange} />
                    </Form.Item>
                    <Form.Item label="Employee Email">
                        <Input value={selectModel.Employee_Email} onChange={handleEmployeeEmailChange} />
                    </Form.Item>
                    <Form.Item label="Employee Birthday">
                        <DatePicker defaultValue={dayjs(moment(selectModel.Employee_BirthDay).format("YYYY/MM/DD"), "YYYY/MM/DD")} onChange={handleEmployeeBirthDayChange} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Input value={selectModel.Status} onChange={handleEmployeeStatusChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default EmployeeUpdate;
