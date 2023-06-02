import React, { useEffect, useState } from 'react';
import { orderApi } from '~/api/order.api';

function OrderService() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await orderApi.getOrderList();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };

    fetchOrderList();
  }, []);
    
  return [orders];
}

export default OrderService;
