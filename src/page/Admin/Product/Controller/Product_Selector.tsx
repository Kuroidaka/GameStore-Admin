import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { productApi, productModel } from '~/api/product/product.api';



const ProductSelector = (props: any) => {
    const handleChange = (value: string) => {
        props.onChange(value)
    };

    const [dataSource,setData] = useState<productModel[]>([]); 
    const getProductList =  async () => {
        try {
            const productList = await productApi.search({});
            const data = productList.data.results;
            const result = data.map((item : productModel) => {
                return {
                    value: item.Product_Code,
                    label: item.Product_Code,
                }
            })
            if(result.length > 0){
                setData(result);
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getProductList();
    }, [])
    return (
        <div>
            <Form.Item label="Product Code">
                <Select
                    // name={props?.name}
                    style={{ width: "100%" }}
                    value={props.value}
                    allowClear={true}
                    onChange={handleChange}
                    options={dataSource}
                />

                {/* <ProductSelector style={{ width: "100%" }}/> */}
            </Form.Item>

        </div>
    )

};

export default ProductSelector;