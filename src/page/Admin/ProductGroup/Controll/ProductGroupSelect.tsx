import React, { useEffect, useState } from 'react';
import { Form, Select, Space } from 'antd';
import { productGroupApi, productGroupModel } from '~/api/productGroup/productGroup.api';



const ProductGroupSelect = (props: any) => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const [dataSource,setData] = useState<productGroupModel[]>([]); 
    const searchProductGroupList =  async () => {
        try {
            const productGroupList = await productGroupApi.search({});
            const data = productGroupList.data.results;
            const result = data.map((item : productGroupModel) => {
                return {
                    value: item.Product_Group_Code,
                    label: item.Product_Group_Name,
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
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={dataSource}
                />

                {/* <ProductGroupSelect style={{ width: "100%" }}/> */}
            </Form.Item>

        </div>
    )

};

export default ProductGroupSelect;