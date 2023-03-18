import { Button, Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RevenueReportTable from './RevenueReportTable'
import { productGroupApi, productGroupModel } from '~/api/productGroup/productGroup.api';
import handleValidUser from '../CommomHandler/token';
import ProductGroupSearch from './RevenueReportSearch';
import { reportApi, reportModel, searchReportModel } from '~/api/report/report.api';
import ReactToPrint, { PrintContextConsumer, useReactToPrint } from 'react-to-print';
const RevenueReportList = () => {
    const [dataSource, setDataSource] = useState<reportModel[]>([]);
    const [searchModel, setSearchModell] = useState<searchReportModel>({})
    const componentRef = useRef(null)
    const handleSearch = async () => {
        const listData = await reportApi.revenueReport(searchModel)
        setDataSource(listData.data.results)

    }

    useEffect(() => {
        handleValidUser();
        searchModel.Report_Type = "Month"
        // handleSearch();

    }, []);
    console.log(RevenueReportTable)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const handleSearchModelChange = (value: searchReportModel) => {
        setSearchModell({
            ...searchModel,
            ...value
        })
    }
    return (
        <Container >
            <ProductGroupSearch onChange={handleSearchModelChange} />
            <Content>
                <ButtonWrapper className='Button_Wrapper'>
                    <Button type="primary" style={{ backgroundColor: 'var(--third_admin)', marginRight: 4 }} onClick={handleSearch}>
                        Search
                    </Button>
                    <ReactToPrint
                        trigger={() => <Button onClick={handlePrint} type="primary" style={{ backgroundColor: 'var(--third_admin)', marginRight: 4 }}>
                            Print
                        </Button>}
                        content={() => componentRef.current}
                    />
                </ButtonWrapper>

                
                <RevenueReportTable  childRef={componentRef}  dataSource={dataSource} />
            </Content>


        </Container>

    );
}

export default RevenueReportList;

const Container = styled.div`
    max-width: calc(100% - 40px);
    width: 100%;
    margin: 16px 20px;
    height: auto;

`
const ButtonWrapper = styled.div`
display: flex;  
width: 100%;
margin-bot: 16px;
`



const Content = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    box-shadow: rgb(0 0 0 / 25%) 0px 0.0625em 0.0625em, rgb(0 0 0 / 25%) 0px 0.125em 0.5em, rgb(255 255 255 / 10%) 0px 0px 0px 1px inset;
    background-color: #ffffff;
    border-radius: 10px;
`