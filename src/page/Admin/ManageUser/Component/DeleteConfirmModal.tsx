import React from "react";
import styled from "styled-components";
import { userApi } from "~/api/admin/userApi";
import AndModal from "~/component/Modal/AndModal";
import { User } from "~/model/User.model";


interface DeleteConfirmModalPropType {
    setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>
    isModalDeleteOpen: boolean | undefined
    targetId: number
    setUserList: React.Dispatch<React.SetStateAction<User[]>>
}

const DeleteConfirmModal = (props: DeleteConfirmModalPropType) => {
    const { setIsModalDeleteOpen, isModalDeleteOpen, targetId, setUserList } = props

    const handleDeleteUser = () => {

        const ids = targetId
        const token = localStorage.getItem('token')
        if(token && ids) {
            userApi.delete(ids, token)
            .then((res) => {
                setUserList(prev => prev = prev.filter(user => user.id !== ids))
            })
            .catch(e =>{
                console.log(e);
                
            })
        }
        
    }

    return ( 
        <AndModal setIsModalOpen={setIsModalDeleteOpen} isModalOpen={isModalDeleteOpen} handleClickOk={handleDeleteUser}> 
            <Content >
                <span>Are you <strong>Sure</strong> to delete this user</span>
            </Content>            
        </AndModal>
     );
}
 
export default DeleteConfirmModal;

const Content = styled.div`
    
`