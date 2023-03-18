import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { productGroupApi, productGroupModel } from '~/api/productGroup/productGroup.api';
import { employeeApi } from '../../../api/employee/employee.api';
interface Props {
    id: any,
    onChange: () => void,
    style: {}
}

const ProductGroupUpdate = (props:Props) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setdataSource] = useState<productGroupModel>({});
    const [selectModel, setSelectModel] = useState<productGroupModel>({})
    const [form] = Form.useForm();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    
    const handleProductGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Product_Group_Name = e.target.value;
        setSelectModel({
            ...selectModel,
            Product_Group_Name: e.target.value
        })
    }
    const handleProductGroupCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Product_Group_Code = e.target.value;
        setSelectModel({
            ...selectModel,
            Product_Group_Code: e.target.value
        })
    }  
   

    const handleProductGroupStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectModel.Status = e.target.value;
        setSelectModel({
            ...selectModel,
            Status: e.target.value
        })
    }
    
    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            productGroupApi.update(selectModel).then((result) => {
                if (!!result) {
                    setSelectModel({});
                    props.onChange();
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
    

    const showModal = () => {
        productGroupApi.getById(props.id).then(result => {
            if(!!result){
                console.log(result.data)
                setdataSource(result.data.data)
            }
        })
        setIsModalOpen(true);
    };
    return (
        < >
             <Button type="primary" style={props.style} onClick={showModal}>
                    Update
                </Button>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >

                        <Form.Item label="Product Group Code">
                            <Input disabled={true} value={dataSource.Product_Group_Code} onChange={handleProductGroupCodeChange} />
                        </Form.Item>
                        <Form.Item label="Product Group Name">
                            <Input value={dataSource.Product_Group_Name} onChange={handleProductGroupNameChange} />
                        </Form.Item>
                        
                        <Form.Item label="Status">
                            <Input value={dataSource.Status} onChange={handleProductGroupStatusChange} />
                        </Form.Item>
                    </Form>
            </Modal>
        </>
    );
}
export default ProductGroupUpdate;
