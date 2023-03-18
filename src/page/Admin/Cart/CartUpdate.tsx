import { Button, Form, Input, InputNumber, Modal, Select, Tabs } from 'antd';
import { useState } from 'react';
import { CartApi, CartDetailModel, CartModel } from '~/api/cart/cart.api';
import { CustomerModel } from '~/api/customer/customer.api';
import CartAdd from './CartAdd';
interface Props {
    id?: any,
    onChange: () => void,
    style?: {}
    customerModel?: CustomerModel[]
  }
const CartUpdate = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState<CartModel>({});
    const [form] = Form.useForm();
    const listMethodPay = [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
    ]
    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const handleCardCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Code = e.target.value;

        setdataSource({
            ...dataSource,
            Cart_Code: e.target.value
        })
    }
    const handleCardMethodPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_MethodPay = e.target.value;

        setdataSource({
            ...dataSource,
            Cart_MethodPay: e.target.value
        })
    }
    const handleCardNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Note = e.target.value;
        setdataSource({
            ...dataSource,
            Cart_Note: e.target.value
        })
    }
    const handleCardEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_Email = e.target.value;
        setdataSource({
            ...dataSource,
            Cart_Email: e.target.value
        })
    }
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Cart_PhoneNumber = e.target.value;
        setdataSource({
            ...dataSource,
            Cart_PhoneNumber: e.target.value
        })
    }
    const handleCustomerChange = (value: string) => {
        dataSource.Customer_Code = value;
        setdataSource({
            ...dataSource,
            Customer_Code: value
        })
    }


    const handleCardStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dataSource.Status = e.target.value;
        setdataSource({
            ...dataSource,
            Status: e.target.value
        })
    }

    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            CartApi.update(dataSource).then((result) => {
                if (!!result) {
                    setdataSource({});
                }
                props.onChange();
            })
        } catch (err) {
            console.log(err)
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeProductList = (value : CartDetailModel[]) => {
        setdataSource({
            ...dataSource,
            Product_List : [...value]   
        })

    }
    const showModal = () => {
        CartApi.getById(props.id).then(result => {
            if (!!result) {
                setdataSource(result.data.data)
            }
        })
        setIsModalOpen(true);
    };

    const items = [
        {
            key: '1',
            label: `Cart Detail`,
            children: <>
                <Form
                    form={form}
                    initialValues={{ layout: formLayout }}
                    {...formLayout}
                >

                    <Form.Item label="Card Code">
                        <Input disabled={true} value={dataSource.Cart_Code} onChange={handleCardCodeChange} />
                    </Form.Item>

                    <Form.Item label="Card Number">
                        <Input value={dataSource.Cart_PhoneNumber} onChange={handleCardNumberChange} />
                    </Form.Item>
                    <Form.Item label="Card Email">
                        <Input value={dataSource.Cart_Email} onChange={handleCardEmailChange} />
                    </Form.Item>
                    <Form.Item label="Card Note">
                        <Input value={dataSource.Cart_Note} onChange={handleCardNoteChange} />
                    </Form.Item>
                    <Form.Item label="Card Method Pay">
                        <Input value={dataSource.Cart_MethodPay} onChange={handleCardMethodPayChange} />
                    </Form.Item>
                    <Form.Item label="Tổng tiền">
                        <InputNumber  value={dataSource.Cart_Amount} style={{ width: "100%" }} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Customer">
                        <Select value={dataSource.Customer_Code} options={props.customerModel} onChange={handleCustomerChange} />
                    </Form.Item>

                    <Form.Item label="Status">
                        <Input value={dataSource.Status} onChange={handleCardStatusChange} />
                    </Form.Item>
                </Form></>,
        },
        {
            key: '2',
            label: `Cart Product`,
            children: <><CartAdd dataSource={dataSource.CartDetails} onChange={handleChangeProductList} /></>,
        },
    ];
    return (
        < >
              <Button type="primary"  style={{ backgroundColor: 'var(--third_admin)',marginRight: 4 }} onClick={showModal}>
                Edit
              </Button>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={items} />

            </Modal>
        </>
    );
}
export default CartUpdate;
