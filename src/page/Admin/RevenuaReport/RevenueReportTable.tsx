import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { reportModel } from '~/api/report/report.api';
import ChartBar from '../../../component/Chart/Chart'
import './css/style.css'
interface Props {
    dataSource: reportModel[],
    childRef: any
}
const RevenueReportTable = (props: Props) => {
    useEffect(() => console.log(props.childRef))
    const columns: ColumnsType<reportModel> = [
        {
            width: '500px',
            title: 'Time',
            dataIndex: 'Report_Time',
            key: 'Report_Time',
            align: 'center',
            render: (date) => {
                return (
                    <>{date}</>
                )
            }
        },
        {
            width: '500px',
            title: 'Total',
            align: 'center',
            dataIndex: 'Report_Value',
            key: 'Report_Value',
        },
    ]
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `List`,
            children: <div className='report_container' ref={props.childRef}>
            <div className='header_report'>
            <h1 className='Header_report_CompanyName'>Huynh Gia Minh Technology Company</h1>
            <h2 className='Header_report_Name'>Revenue Report</h2>
            <p className='Header_report_Adress'>Address: 60,  Street 1, Ward 13, Go Vap District, Ho Chi Minh City</p>
            </div>
             <Table pagination={false}  bordered={true} columns={columns} dataSource={props.dataSource} />
                <div className='footer_repot'>
                <div className='footer_report_content'>
                    <p className='footer_report_date'>Day ... Month ... Year</p>
                    <h3 className='footer_report_maker '>Reporter</h3>
                    <p className='flooter_report_signature'>( Full name )</p>
                </div>
                </div>
             </div>
        },
        {
            key: '2',
            label: `Chart`,
            children: <ChartBar dataSource={props.dataSource} style={{ height: "500px", margin: "auto" }} />,
        },
    ];
    return <Tabs style={{ width: "100%" }} defaultActiveKey="1" items={items} onChange={onChange} />
};

export default RevenueReportTable;