import React, { useEffect, useState } from 'react';
import { orderApi } from '~/api/order.api';

function OrderService() {
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
    
  return [orders, load];
}

export default OrderService;
