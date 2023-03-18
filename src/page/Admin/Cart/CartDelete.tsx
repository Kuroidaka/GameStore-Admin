import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { productGroupApi } from '~/api/productGroup/productGroup.api';
import { CartApi } from '~/api/cart/cart.api';
interface Props {
  id: any,
  onChange: () => void,
  style: {}
}

const CartDelete = (props:Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      CartApi.delete(props.id).then(result => {
        if (!!result) {
          props.onChange();
        }
      })
      setIsModalOpen(false);
    } catch (e) {
      console.log(e)
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
       <Button type="primary" style={props.style}>
                    Delete
                </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Are you sure to delele employee? :)
      </Modal>
    </>
  );
};

export default CartDelete;