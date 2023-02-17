import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { employeeApi } from '../../../api/employee/employee.api';
interface id {
    firstName: string;
    lastName: string;
}
const DeleteComponent = (props: {id:any,onChange:any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = () => {
    employeeApi.delete(props.id).then(result => {
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

export default DeleteComponent;