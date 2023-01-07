import React, { FC, ReactNode, useState } from 'react';
import { Modal } from 'antd';
import Button from '~/component/Button/Button';

interface AndModalPropType {
    // onClick: () => void
    children: ReactNode
    isModalOpen: boolean | undefined
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>
    handleClickOk: () => void
}

const AndModal:FC<AndModalPropType> = (props) => {
    const { children, isModalOpen, setIsModalOpen, handleClickOk } = props
 


  const handleOk = () => {
    setIsModalOpen(false);
    handleClickOk()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {children}
      </Modal>
    </>
  );
};

export default AndModal;