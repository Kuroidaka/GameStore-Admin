import React, { useEffect, useState } from 'react';
import { orderApi } from '~/api/order.api';


export const getOrderListByGameID = (id) => {
  return orderApi.getOrderListByGameID(id)
}