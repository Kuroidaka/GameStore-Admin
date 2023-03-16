import { Modal } from 'antd';
import { useState } from 'react';
import { CustomerApi } from '~/api/customer/customer.api';
interface id {
    firstName: string;
    lastName: string;
}
const CustomerDelete = (props: {id:any,onChange:any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };

  const handleOk = () => {
    CustomerApi.delete(props.id).then(result => {
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
      <Modal title="Notification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            Are you sure to delele? :)
      </Modal>
    </>
  );
};

export default CustomerDelete;