import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { productModel } from '~/api/product/product.api';
import { productGroupApi, productGroupModel } from '~/api/productGroup/productGroup.api';



const ProductSelector = (props: any) => {
    const handleChange = (value: string) => {
        props.onChange(value)
    };

    const [dataSource,setData] = useState<productModel[]>([]); 
    const searchProductGroupList =  async () => {
        try {
            const productGroupList = await productGroupApi.search({});
            const data = productGroupList.data.results;
            const result = data.map((item : productModel) => {
                return {
                    value: item.Product_Code,
                    label: item.Product_Name,
                }
            })
            if(result.length > 0){
                setData(result);
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        searchProductGroupList();
    }, [])
    return (
        <div>
            <Form.Item label="Product Group">
                <Select
                    // name={props?.name}
                    style={{ width: "100%" }}
                    value={props.value}
                    onChange={handleChange}
                    options={dataSource}
                />

                {/* <ProductSelector style={{ width: "100%" }}/> */}
            </Form.Item>

        </div>
    )

};

export default ProductSelector;