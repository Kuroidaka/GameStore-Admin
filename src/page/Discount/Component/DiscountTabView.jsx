
import React, { useContext, useEffect, useState } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import styled from "styled-components/macro";
import { InputText } from 'primereact/inputtext';
import DiscountTable from './DiscountTable';
import { icon } from '~/assert/icon/icon'
import SkelentonTable from './Skeleton';
import OrderService from '~/service/order.service';
import { orderApi } from '~/api/order.api';
import DiscountContext from '~/Context/Discount.context';
import { discountAPI } from '~/api/discount.api';


const DiscountTabView = (props) => {
      
    const [discount, setDiscountList] = useState([]);
    const [load, setLoad] = useState(true);
  
    useEffect(() => {
      const fetchDiscountList = async () => {
        setLoad(true)
        try {
          const response = await discountAPI.getListDiscount();
          setDiscountList(response.data);
          setLoad(false)
        } catch (error) {
          console.error('Error fetching discount list:', error);
          setLoad(false)
        }
      };
  
      fetchDiscountList();
    }, []);

    

    // const [orderData, setOrder] = useState({
    //     dataAll: orders.order,
    // })

    // const filterAccepted = async () => {
    //     const dataAcceptedFiltered = dataAll.filter((item) => {
    //         return item.queue_status === 'DONE';
    //     })

    //     if(dataAcceptedFiltered) {
    //       setOrder(prev => {return { ...prev, dataAccepted: dataAcceptedFiltered }});
    //     }
    // }

    // const filterReject = async () => {
    //   const dataRejectFiltered = dataAll.filter((item) => {
    //     return item.queue_status === 'REJECT';
    //   });
      
    //   if(dataRejectFiltered) {
    //     setOrder(prev => {return { ...prev, dataReject: dataRejectFiltered }});
    //   }
    
    // };

    // useEffect(() => {
    //   if(orders.order) {
    //     filterReject()
    //     filterAccepted()
    //   }
     
    // }, [orders]);

    const discountValue = {
      discount,
      setDiscountList,
      load,
      setLoad
    }

    return (
      <DiscountContext.Provider value={discountValue}>
        <Container className="card">
            <TabView>
                <TabPanel header="All">
                    { !load ?
                    (
                      discount.length > 0 
                      ? <TabTable/>
                      : <div>Empty</div>
                    ) : (
                      <SkelentonTable />
                    )}
                </TabPanel>
                {/* <TabPanel header="Accepted">
                {orderData.dataAccepted ?
                    (
                    <TabTable orderData={orderData.dataAccepted} />
                    ) : (
                    <SkelentonTable orderData={orderData.dataAccepted} />
                    )}
                </TabPanel>
                <TabPanel header="Rejected">
                {orderData.dataReject ?
                    (
                    <TabTable orderData={orderData.dataReject} />
                    ) : (
                    <SkelentonTable orderData={orderData.dataReject} />
                    )}
                </TabPanel> */}
            </TabView>
        </Container>
      </DiscountContext.Provider>
    )
}

const TabTable = (props) => {

    const { orderData } = props

    const { discount } = useContext(DiscountContext)

    return (
    <TotalQuantity>
        <div className="d-flex justify-content-between">
            <p className='my-auto'>{discount.length} results</p>
            
            <span className="p-input-icon-left">
                <icon.search/>
                <InputText placeholder="Order Search" />
            </span>

        </div>
            <Content>
                {discount && <DiscountTable/>}
            </Content>
    </TotalQuantity>
    )
}


        
export default DiscountTabView

const Container = styled.div `
margin: 0 16px;
height: 70vh;
`

const TotalQuantity = styled.div `
    
`

const FilterSection = styled.div`
width: 100%;
height: 60px;
display: flex;
justify-content: flex-end;
align-items: center;
padding: 0 20px;
gap: 10px;

`


const Content = styled.div`
padding: 16px 0;
`
