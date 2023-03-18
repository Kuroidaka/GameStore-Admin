import { Col, Collapse, DatePicker, Form, Input, Row, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { productGroupModel } from '~/api/productGroup/productGroup.api';
import { reportModel, searchReportModel } from '~/api/report/report.api';
// import { Form } from 'react-router-dom';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;


const ProductGroupSearch = (props: any) => {
    const [form] = Form.useForm();
    const [searchModel, setSearchModell] = useState<searchReportModel>({})
    const options = [
        {label: "Day", value: "Day"},
        {label: "Month", value: "Month"},
        {label: "Year", value: "Year"},

    ]
  
   
    const handleTypeChange = (value : string) => {
        searchModel.Report_Type = value
        props.onChange(searchModel);
    }

    const handleTimeChange = (dates: any) => {
        console.log(dates)
        searchModel.Report_Time = dates
        props.onChange(searchModel);
    }



    const formLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    console.log(searchModel)
    return (
        <Collapse style={{ width: "80%" }} defaultActiveKey={['1']} ghost>
            <Panel style={{ fontSize: "20px" }} header="Type Report" key="1">
                <Content>
                    <Form
                        form={form}
                        initialValues={{ layout: formLayout }}
                        {...formLayout}
                    >
                       
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Time Type">
                                    <Select  defaultValue={options[1].value} options={options} onChange={handleTypeChange} />
                                </Form.Item>
                            </Col>
                            {searchModel.Report_Type === "Day" ? ( <Col span={12}>
                                <Form.Item label="Time">
                                <RangePicker  onChange={handleTimeChange} style={{width: "100%"}}  />
                                </Form.Item>
                            </Col>) : ''}
                           
                        </Row>

                    </Form>
                </Content>

            </Panel>
        </Collapse>)
}

    ;

export default ProductGroupSearch;

