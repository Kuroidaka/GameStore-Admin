import { Button, Form, Input, InputNumber, Modal, Tabs, UploadFile } from 'antd';
import { useState } from 'react';
import { productApi, productModel } from '~/api/product/product.api';
import UploadImage from '~/component/UploadImage/UploadImage';
import ProductGroupSelect from '../ProductGroup/Controll/ProductGroupSelect';

interface Props {
    id: any,
    onChange: () => void,
    style: {}
  }
const ProductUpdate = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<productModel>({});
    const [form] = Form.useForm<productModel>();

    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const handleOk = async (e: any): Promise<any> => {
        e.preventDefault();
        try {
            dataSource.id = props.id;
            productApi.update(dataSource).then((result) => {
                if (!!result) {
                    setDataSource({});
                    props.onChange();
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

    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataSource({
            ...dataSource,
            Product_Description :e.target.value
         })
    }


    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataSource({
            ...dataSource,
            Product_Name :e.target.value
         })
    }

    const handleProductCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataSource({
            ...dataSource,
            Product_Code :e.target.value
         })
    }

    const handleProductGroupChange = (value: string) => {
       setDataSource({
           ...dataSource,
           Product_Group_Code : value
        })
    }

    const handleProductPriceChange = (value: number | null) => {
        setDataSource({
           ...dataSource,
           Product_Price : value
        })
    }

    const handleProductDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataSource({
            ...dataSource,
            Product_Detail :e.target.value
         })
    }


    const handleProductStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataSource({
            ...dataSource,
            Status :e.target.value
         })
    }

    const handleImageProduct = (value: Array<UploadFile>) => {
        dataSource.Product_Images_Request = value;
        setDataSource(dataSource)
    }

    const showModal = async () => {
        productApi.getById(props.id).then(result => {
            if (!!result) {
                const data = result.data.data;
                setDataSource(data)
            }
        })
        setIsModalOpen(true);
    };
    const items = [
        {
            key: '1',
            label: `Product Detail`,
            children: <>    <Form
            form={form}
            initialValues={{ layout: formLayout }}
            {...formLayout}
        >

            <Form
                form={form}
                initialValues={{ layout: formLayout }}
                {...formLayout}
            >

                <Form.Item  label="Product Code">
                    <Input disabled={true} value={dataSource?.Product_Code} onChange={handleProductNameChange} />
                </Form.Item>
                <Form.Item label="Product Name">
                    <Input value={dataSource?.Product_Name} onChange={handleProductNameChange} />
                </Form.Item>
                <ProductGroupSelect value={dataSource.Product_Group_Code} onChange={handleProductGroupChange} style={{ width: "100%" }} />
                <Form.Item label="Product Price">
                    <InputNumber style={{width: "100%"}} value={dataSource.Product_Price} onChange={handleProductPriceChange} />
                </Form.Item>
                <Form.Item label="Product Detail">
                    <Input value={dataSource.Product_Detail} onChange={handleProductDetailChange} />
                </Form.Item>
                <Form.Item label="Status">
                    <Input value={dataSource.Status} onChange={handleProductStatusChange} />
                </Form.Item>
                <Form.Item label="Image">
                    <UploadImage  data={dataSource.Product_Images || ''} onChange={handleImageProduct} />
                </Form.Item>
            </Form>
        </Form></>,
          },
          {
            key: '2',
            label: `Product's description`,
            children: <>
            
             <textarea value={dataSource.Product_Description} style={{width: "100%",height: "200px"}} onChange={onChangeDescription} name="content" id="editor">
            </textarea>
            </>
      ,
          },
    ]

    return (
        <>
            <Button type="primary" style={props.style} onClick={showModal}>
                    Edit
            </Button>
            <Modal title="Add employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
            </Modal>
        </>
    );
}
export default ProductUpdate;
