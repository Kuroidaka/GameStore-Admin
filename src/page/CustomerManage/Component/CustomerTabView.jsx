
import React, { useContext, useEffect, useState } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import styled from "styled-components/macro";
import { InputText } from 'primereact/inputtext';
import CustomerTable from './CustomerTable';
import { icon } from '~/assert/icon/icon'
import SkelentonTable from './Skeleton';
import OrderService from '~/service/order.service';
import { orderApi } from '~/api/order.api';
import CustomerContext from '~/Context/Customer.context';
import { customer as customerAPI } from '~/api/customer.api';


const CustomerTabView = (props) => {
      
    const [customer, setCustomer] = useState([]);
    const [load, setLoad] = useState(true);
  
    useEffect(() => {
      const fetchOrderList = async () => {
        setLoad(true)
        try {
          const response = await customerAPI.getList();
          setCustomer(response.data);
          setLoad(false)
        } catch (error) {
          console.error('Error fetching order list:', error);
          setLoad(false)
        }
      };
  
      fetchOrderList();
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

    const customerValue = {
      customer,
      setCustomer,
      load,
      setLoad
    }

    return (
      <CustomerContext.Provider value={customerValue}>
        <Container className="card">
            <TabView>
                <TabPanel header="All">
                    { !load ?
                    (
                      customer.length > 0 
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
      </CustomerContext.Provider>
    )
}

const TabTable = (props) => {

    const { orderData } = props

    const { customer } = useContext(CustomerContext)

    return (
    <TotalQuantity>
        <div className="d-flex justify-content-between">
            <p className='my-auto'>{customer.length} results</p>
            
            <span className="p-input-icon-left">
                <icon.search/>
                <InputText placeholder="Order Search" />
            </span>

        </div>
            <Content>
                {customer && <CustomerTable/>}
            </Content>
    </TotalQuantity>
    )
}


        
export default CustomerTabView

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
