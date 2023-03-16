import { Col, Collapse, Form, Input, Row, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { CartApi, CartModel } from '~/api/cart/cart.api';
import { CustomerApi, CustomerModel } from '~/api/customer/customer.api';
// import { Form } from 'react-router-dom';

const { Panel } = Collapse;

interface props {
    onChange: () => void
}

const CartSearch = (props: any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<CartModel>({})
    const [cardModel, setCardModel] = useState<CartModel[]>([])
    const [customerModel, setCustomerModel] = useState<CustomerModel[]>([])
    const listMethodPay = [
        {value: "Cash", label: "Cash"},
        {value: "Online", label: "Online"},
    ]
    useEffect(() => {
        const setCustomer = async () => {
            const customer = await CustomerApi.search({});
            const result =  customer.data.results.map((item :CustomerModel)=> {
                return {
                    value: item.Customer_Code,
                    label: item.Customer_Name
                }
            })
            setCustomerModel(result)
        }
        const setCart = async () => {
            const customer = await CartApi.search({});
            const result =  customer.data.results.map((item :CartModel)=> {
                return {
                    value: item.Cart_Code,
                    label: item.Cart_Name
                }
            })
            setCardModel(result)
        }
        setCart()
        setCustomer()
    }, [])
    const handleCardCodeChange = (value: string) => {
        searchModel.Cart_Code = value
        props.onChange(searchModel);
    }

   
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchModel.Cart_PhoneNumber = e.target.value
        props.onChange(searchModel);
    }

    const handleCardEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchModel.Cart_Email = e.target.value
        props.onChange(searchModel);
    }

    const handleCardNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchModel.Cart_Note = e.target.value
        props.onChange(searchModel);
    }

    const handleCardMethodPayChange = (value: string) => {
        searchModel.Cart_MethodPay = value
        props.onChange(searchModel);
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchModel.Status = e.target.value
        props.onChange(searchModel);
    }

    
    const handleCustomerChange = (value: string) => {
        searchModel.Customer_Code = value
        props.onChange(searchModel);
    }


    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    return (
        <Collapse style={{ width: "80%", height: 300 }} defaultActiveKey={['1']} ghost>
            <Panel style={{ fontSize: "20px" }} header="Search Card" key="1">
                <Content>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Card Code">
                                <Select 
                                     onChange={handleCardCodeChange}
                                     options={cardModel}
                                      />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Phone Number">
                                    <Input onChange={handleCardNumberChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="Email">
                                    <Input onChange={handleCardEmailChange} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Note">
                                    <Input onChange={handleCardNoteChange} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="Method Pay">
                                <Select 
                                     onChange={handleCardMethodPayChange}
                                     options={listMethodPay}
                                      />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label="Customer">
                                    <Select 
                                     onChange={handleCustomerChange}
                                     options={customerModel}
                                      />
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

export default CartSearch;