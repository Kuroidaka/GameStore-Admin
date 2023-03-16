import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { productGroupApi } from '~/api/productGroup/productGroup.api';
import { CartApi } from '~/api/cart/cart.api';
interface id {
    firstName: string;
    lastName: string;
}
const CartDelete = (props: {id:any,onChange:any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = () => {
    CartApi.delete(props.id).then(result => {
        if(!!result){
            props.onChange();
        }
    })
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a type="primary" onClick={showModal}>
        Delete
      </a>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            Are you sure to delele employee? :)
      </Modal>
    </>
  );
};

export default CartDelete;