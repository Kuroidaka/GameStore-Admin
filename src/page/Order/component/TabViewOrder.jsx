
import React, { useContext, useEffect, useState } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import styled from "styled-components/macro";
import { InputText } from 'primereact/inputtext';
import Table from './OrderTable';
import { icon } from '~/assert/icon/icon'
import SkelentonTable from './Skelenton';
import OrderService from '~/service/order.service';
import { orderApi } from '~/api/order.api';
import OrderContext from '~/Context/Order.context';

const dataAll = [
{
  id: 1,
  admin_id: 1,
  rental_start_date: '2023-01-01',
  rental_end_date: '2023-01-07',
  discount_applied: 0.00,
  rental_price: 100.00,
  game_name: 1,
  address: '123 Example Street',
  queue_status: 'WAITING'
},
{
  id: 2,
  admin_id: 2,
  rental_start_date: '2023-02-01',
  rental_end_date: '2023-02-07',
  discount_applied: 0.10,
  rental_price: 80.00,
  game_name: 2,
  address: '456 Sample Avenue',
  queue_status: 'DONE'
},
{
  id: 3,
  admin_id: 1,
  rental_start_date: '2023-03-01',
  rental_end_date: '2023-03-07',
  discount_applied: 0.05,
  rental_price: 120.00,
  game_name: 3,
  address: '789 Test Road',
  queue_status: 'WAITING'
},
{
  id: 4,
  admin_id: 2,
  rental_start_date: '2023-04-01',
  rental_end_date: '2023-04-07',
  discount_applied: 0.00,
  rental_price: 90.00,
  game_name: 1,
  address: '321 Sample Lane',
  queue_status: 'DONE'
},
{
  id: 5,
  admin_id: 3,
  rental_start_date: '2023-05-01',
  rental_end_date: '2023-05-07',
  discount_applied: 0.15,
  rental_price: 150.00,
  game_name: 2,
  address: '654 Example Court',
  queue_status: 'WAITING'
},
{
  id: 6,
  admin_id: 3,
  rental_start_date: '2023-06-01',
  rental_end_date: '2023-06-07',
  discount_applied: 0.10,
  rental_price: 80.00,
  game_name: 3,
  address: '987 Test Avenue',
  queue_status: 'DONE'
},
{
  id: 7,
  admin_id: 1,
  rental_start_date: '2023-07-01',
  rental_end_date: '2023-07-07',
  discount_applied: 0.00,
  rental_price: 100.00,
  game_name: 1,
  address: '456 Example Street',
  queue_status: 'WAITING'
},
{
  id: 8,
  admin_id: 2,
  rental_start_date: '2023-08-01',
  rental_end_date: '2023-08-07',
  discount_applied: 0.10,
  rental_price: 80.00,
  game_name: 2,
  address: '789 Sample Avenue',
  queue_status: 'DONE'
},
{
  id: 9,
  admin_id: 3,
  rental_start_date: '2023-09-01',
  rental_end_date: '2023-09-07',
  discount_applied: 0.05,
  rental_price: 120.00,
  game_name: 3,
  address: '123 Test Road',
  queue_status: 'WAITING'
},
{
  id: 10,
  admin_id: 1,
  rental_start_date: '2023-10-01',
  rental_end_date: '2023-10-07',
  discount_applied: 0.00,
  rental_price: 90.00,
  game_name: 1,
  address: '321 Sample Lane',
  queue_status: 'REJECT'
},
{
    id: 6,
    admin_id: 3,
    rental_start_date: '2023-06-01',
    rental_end_date: '2023-06-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 3,
    address: '987 Test Avenue',
    queue_status: 'DONE'
  },
  {
    id: 7,
    admin_id: 1,
    rental_start_date: '2023-07-01',
    rental_end_date: '2023-07-07',
    discount_applied: 0.00,
    rental_price: 100.00,
    game_name: 1,
    address: '456 Example Street',
    queue_status: 'WAITING'
  },
  {
    id: 8,
    admin_id: 2,
    rental_start_date: '2023-08-01',
    rental_end_date: '2023-08-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 2,
    address: '789 Sample Avenue',
    queue_status: 'DONE'
  },
  {
    id: 9,
    admin_id: 3,
    rental_start_date: '2023-09-01',
    rental_end_date: '2023-09-07',
    discount_applied: 0.05,
    rental_price: 120.00,
    game_name: 3,
    address: '123 Test Road',
    queue_status: 'WAITING'
  },
  {
    id: 10,
    admin_id: 1,
    rental_start_date: '2023-10-01',
    rental_end_date: '2023-10-07',
    discount_applied: 0.00,
    rental_price: 90.00,
    game_name: 1,
    address: '321 Sample Lane',
    queue_status: 'REJECT'
  },
  {
    id: 6,
    admin_id: 3,
    rental_start_date: '2023-06-01',
    rental_end_date: '2023-06-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 3,
    address: '987 Test Avenue',
    queue_status: 'DONE'
  },
  {
    id: 7,
    admin_id: 1,
    rental_start_date: '2023-07-01',
    rental_end_date: '2023-07-07',
    discount_applied: 0.00,
    rental_price: 100.00,
    game_name: 1,
    address: '456 Example Street',
    queue_status: 'WAITING'
  },
  {
    id: 8,
    admin_id: 2,
    rental_start_date: '2023-08-01',
    rental_end_date: '2023-08-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 2,
    address: '789 Sample Avenue',
    queue_status: 'DONE'
  },
  {
    id: 9,
    admin_id: 3,
    rental_start_date: '2023-09-01',
    rental_end_date: '2023-09-07',
    discount_applied: 0.05,
    rental_price: 120.00,
    game_name: 3,
    address: '123 Test Road',
    queue_status: 'WAITING'
  },
  {
    id: 10,
    admin_id: 1,
    rental_start_date: '2023-10-01',
    rental_end_date: '2023-10-07',
    discount_applied: 0.00,
    rental_price: 90.00,
    game_name: 1,
    address: '321 Sample Lane',
    queue_status: 'REJECT'
  },
  {
    id: 6,
    admin_id: 3,
    rental_start_date: '2023-06-01',
    rental_end_date: '2023-06-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 3,
    address: '987 Test Avenue',
    queue_status: 'DONE'
  },
  {
    id: 7,
    admin_id: 1,
    rental_start_date: '2023-07-01',
    rental_end_date: '2023-07-07',
    discount_applied: 0.00,
    rental_price: 100.00,
    game_name: 1,
    address: '456 Example Street',
    queue_status: 'WAITING'
  },
  {
    id: 8,
    admin_id: 2,
    rental_start_date: '2023-08-01',
    rental_end_date: '2023-08-07',
    discount_applied: 0.10,
    rental_price: 80.00,
    game_name: 2,
    address: '789 Sample Avenue',
    queue_status: 'DONE'
  },
  {
    id: 9,
    admin_id: 3,
    rental_start_date: '2023-09-01',
    rental_end_date: '2023-09-07',
    discount_applied: 0.05,
    rental_price: 120.00,
    game_name: 3,
    address: '123 Test Road',
    queue_status: 'WAITING'
  },
  {
    id: 10,
    admin_id: 1,
    rental_start_date: '2023-10-01',
    rental_end_date: '2023-10-07',
    discount_applied: 0.00,
    rental_price: 90.00,
    game_name: 1,
    address: '321 Sample Lane',
    queue_status: 'REJECT'
  }
]

const Tab = (props) => {
      
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(true);
  
    useEffect(() => {
      const fetchOrderList = async () => {
        setLoad(true)
        try {
          const response = await orderApi.getOrderList();
          setOrders(response.data);
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

    const orderValue = {
      orders,
      setOrders,
      load,
      setLoad
    }

    return (
      <OrderContext.Provider value={orderValue}>
        <Container className="card">
            <TabView>
                <TabPanel header="All">
                    { !load ?
                    (
                      orders.length > 0 
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
      </OrderContext.Provider>
    )
}

const TabTable = (props) => {

    const { orderData } = props

    const { orders } = useContext(OrderContext)

    return (
    <TotalQuantity>
        <div className="d-flex justify-content-between">
            <p className='my-auto'>{orders.length} results</p>
            
            <span className="p-input-icon-left">
                <icon.search/>
                <InputText placeholder="Order Search" />
            </span>

        </div>
            <Content>
                {orders && <Table/>}
            </Content>
    </TotalQuantity>
    )
}


        
export default Tab

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
