import React, { useEffect, useState } from 'react';
import { productApi } from '~/api/product.api';

function ProductService() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProductList();
  }, []);
    
  return [products];
}

export const getProductDetail = (id) => {
  return productApi.getProductById(id)
}


export default ProductService;
