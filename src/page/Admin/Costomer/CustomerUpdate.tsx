import { Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { CustomerApi, CustomerModel } from '~/api/customer/customer.api';
// import './css/Customer.css';


const CustomerUpdate = (props: { id: any, onChange: any }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectModel, setSelectModel] = useState<CustomerModel>({})
    const [form] = Form.useForm();
    useEffect(() => {
    }, [selectModel])
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            selectModel.id = props.id
            CustomerApi.update(selectModel).then((result) => {
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


    const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Customer_Name=e.target.value
        setSelectModel({
            ...selectModel,
            Customer_Name: e.target.value
        })
    }
    const handleCustomerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Customer_Phone = e.target.value;
        setSelectModel({
            ...selectModel,
            Customer_Phone: e.target.value
        })
    }

    const handleCustomerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Customer_Email = e.target.value;
        setSelectModel({
            ...selectModel,
            Customer_Email: e.target.value
        })
    }

 

    const handleCustomerStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // selectModel.Status = e.target.value;
        setSelectModel({
            ...selectModel,
            Status: e.target.value
        })
    }

    const showModal = () => {
        CustomerApi.getById(props.id).then(result => {
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
                    <Form.Item label="Customer Code">
                        <Input disabled={true} value={selectModel.Customer_Code} onChange={(e) => handleCustomerNameChange(e)} />
                    </Form.Item>
                    <Form.Item label="Customer Name">
                        <Input value={selectModel.Customer_Name} onChange={(e) => handleCustomerNameChange(e)} />
                    </Form.Item>
                   
                    <Form.Item label="Customer Phone">
                        <Input value={selectModel.Customer_Phone} onChange={handleCustomerPhoneChange} />
                    </Form.Item>
                    <Form.Item label="Customer Email">
                        <Input value={selectModel.Customer_Email} onChange={handleCustomerEmailChange} />
                    </Form.Item>
                 
                    <Form.Item label="Status">
                        <Input value={selectModel.Status} onChange={handleCustomerStatusChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default CustomerUpdate;
