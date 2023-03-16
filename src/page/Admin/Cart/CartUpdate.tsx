import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { CartApi, CartModel } from '~/api/cart/cart.api';
import { employeeApi } from '../../../api/employee/employee.api';

const CartUpdate = (props:any) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState<CartModel>({});
    const [selectModel, setSelectModel] = useState<CartModel>({})
    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    
    const handleCardCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Code = e.target.value;

        setSelectModel({
            ...dataSource,
            Cart_Code: e.target.value
        })
    }
    const handleCardMethodPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_MethodPay = e.target.value;

        setSelectModel({
            ...dataSource,
            Cart_MethodPay: e.target.value
        })
    }
    const handleCardNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Note = e.target.value;
        setSelectModel({
            ...dataSource,
            Cart_Note: e.target.value
        })
    }
    const handleCardEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Email = e.target.value;
        setSelectModel({
            ...dataSource,
            Cart_Email: e.target.value
        })
    }
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_PhoneNumber = e.target.value;
        setSelectModel({
            ...dataSource,
            Cart_PhoneNumber: e.target.value
        })
    }
    const handleCustomerChange = (value: string) => {
        dataSource.Customer_Code = value;
        setSelectModel({
            ...dataSource,
            Customer_Code: value
        })
    }
   

    const handleCardStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Status = e.target.value;
        setSelectModel({
            ...selectModel,
            Status: e.target.value
        })
    }
    
    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            CartApi.update(dataSource).then((result) => {
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
    useEffect(() => {
    }, [selectModel])

    const showModal = () => {
        CartApi.getById(props.id).then(result => {
            if(!!result){
                setdataSource(result.data.data)
            }
        })
        setIsModalOpen(true);
    };
    return (
        <div >
            <a type="primary" onClick={showModal}>
                Edit
            </a>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >

                        <Form.Item label="Card Code">
                            <Input disabled={true} value={dataSource.Cart_Code} onChange={handleCardCodeChange} />
                        </Form.Item>

                        <Form.Item label="Card Number">
                            <Input  value={dataSource.Cart_PhoneNumber} onChange={handleCardNumberChange} />
                        </Form.Item>
                        <Form.Item label="Card Email">
                            <Input value={dataSource.Cart_Email} onChange={handleCardEmailChange} />
                        </Form.Item>
                        <Form.Item label="Card Note">
                            <Input  value={dataSource.Cart_Note} onChange={handleCardNoteChange} />
                        </Form.Item>
                        <Form.Item label="Card Method Pay">
                            <Input  value={dataSource.Cart_MethodPay} onChange={handleCardMethodPayChange} />
                        </Form.Item>
                        <Form.Item label="Customer">
                            <Select value={dataSource.Customer_Code} options={props.customerModel} onChange={handleCustomerChange} />
                        </Form.Item>
                        
                        <Form.Item label="Status">
                            <Input value={dataSource.Status} onChange={handleCardStatusChange} />
                        </Form.Item>
                    </Form>
            </Modal>
        </div>
    );
}
export default CartUpdate;
