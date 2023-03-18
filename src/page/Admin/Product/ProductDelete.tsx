import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { employeeApi } from '../../../api/employee/employee.api';
import { productApi } from '~/api/product/product.api';
interface Props {
  id: any,
  onChange: () => void,
  style: {}
}
const DeleteComponent = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = () => {
    productApi.delete(props.id).then(result => {
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
      <Button type="primary" style={props.style} onClick={showModal}>
                   Delete
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            Are you sure to delele employee? :)
      </Modal>
    </>
  );
};

export default DeleteComponent;