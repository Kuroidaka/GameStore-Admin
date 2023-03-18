import { Button, Modal } from 'antd';
import { useState } from 'react';
import { CustomerApi } from '~/api/customer/customer.api';
interface Props {
  id: any,
  onChange: () => void,
  style: {}
}

const CustomerDelete = (props: Props) => {
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
        <Button type="primary" style={props.style} onClick={showModal}>
                    Delete
                </Button>
      <Modal title="Notification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            Are you sure to delele? :)
      </Modal>
    </>
  );
};

export default CustomerDelete;