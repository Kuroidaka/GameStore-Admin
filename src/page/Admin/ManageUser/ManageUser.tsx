import { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import styled from 'styled-components'
import { img } from '~/assert/img';
import { icon } from '~/assert/icon';
import AddNewUser from '~/page/Admin/ManageUser/Component/AddNewUser';
import EditUser from '~/page/Admin/ManageUser/Component/EditUser';

import Button from '~/component/Button/Button';
import Avatar from '~/component/Avatar/Avatar';
import Tippy from '@tippyjs/react/headless';
import { userApi } from '~/api/admin/userApi';
import { User } from '~/model/User.model';
import DeleteConfirmModal from './Component/DeleteConfirmModal';
import { AxiosResponse } from 'axios';



export interface UserPropType extends User {
    avatar: string | null
    phone: string | null

}

interface optionsType {
    year: string
    month: string
    day: string
}

const ManageUser = () => {
    const [userList, setUserList] = useState<User[]>([])
    const [isAddNew, setIsAddNew] = useState<boolean>(false)
    const [isEditNew, setIsEditNew] = useState<boolean>(false)
    const [isRoleOption, setIsRoleOption] = useState<number>(-1)
    const [isOpenOption, setIsOpenOption] = useState<number>(-1)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean | undefined>(false);
    const [targetId, setTargetId] = useState<number>(-1)

    const handleOpenAddNew = () => {
        setIsAddNew(true)
    }

    const handleClickDeleteUser = (id:number) => {
        setTargetId(id)
        setIsOpenOption(-1)
        setIsModalDeleteOpen(true)
    }
    

    const handleClickOptionBtn = (idx:number) => {
        idx === isOpenOption ? setIsOpenOption(-1) : setIsOpenOption(idx)
    }

    const handleIsRuleOptionOpen = (idx:number) => {
        idx === isRoleOption ? setIsRoleOption(-1) : setIsRoleOption(idx)
    }

    const handleClickEditOption = () => {
        setIsEditNew(true)
        setIsOpenOption(-1)
    }

    useEffect(() => {
        const data = {
            User_Account_Name: ''
        }

        userApi.search(data)
        .then((res:AxiosResponse<User[]>) => {
            console.log('get all user',res.data);
            setUserList(res.data.reverse())
        })
    }, [])

    return ( 
        <Container>
            { isAddNew && <AddNewUser setIsAddNew={setIsAddNew} userList={userList} setUserList={setUserList} />}
            { isEditNew && <EditUser setIsEditNew={setIsEditNew} userList={userList} setUserList={setUserList} />}
            <DeleteConfirmModal 
                targetId={targetId} 
                isModalDeleteOpen={isModalDeleteOpen}  
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                setUserList={setUserList}
                />

            <header>
                <div className="title">
                    Users
                </div>

                <div className="description">
                    Managing user's state
                </div>
            </header>


            <div className='form'>
                <div className="content">

                    <div className="add">

                        <Button title='Add New' handleOnClick={handleOpenAddNew}>
                            <AiOutlineUserAdd/>
                        </Button>

                    </div>

                    <div className="search">
                        <input type="text" placeholder='Search user...'/>
                    </div>


                    <table className="list">
                        <thead>
                            <tr>
                                <th id='id' style={{textAlign: 'center'}}>ID</th>
                                <th id='user'>User</th>
                                <th id='status'>Status</th>
                                <th id='date'>Create Date</th>
                                <th id='role'>Access Level</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {(userList.length >=1)  && userList.map((user, idx) => {

                            if(user.createdAt){
                            const date = new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric"})
                            
                            return (
                                <tr key={idx} style={idx % 2 === 0 ? {backgroundColor: 'var(--light-bg)'}: {}}>
                                    <td style={{textAlign: 'center'}}>{user.id}</td>
                                    <td>
                                        <div className="user">
                                            <Avatar src={img.defaultAvatar} width='40px'/>

                                            <div className="info">
                                                <div className="name">{user.User_Account_Name}</div>
                                                <div className="username"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`${user.Status === 'Online' ? 'online' : 'offline'}`}>
                                       <span>{user.Status=== 'Online' ? 'Online' : 'Offline'}</span> 
                                    </td>
    
                                    <td>{date}</td>
                                    <td>

                                        
                                        <Tippy
                                            offset={[0, 0]}
                                             interactive
                                             visible= {isRoleOption === idx}
                                             placement='bottom-start'
                                             onClickOutside={() => {setIsRoleOption(-1)}}
                                             render={() => {
                                                return <PopperRole>
                                                            <div className='item-role'>
                                                                <icon.adminRole />
                                                                <span>Admin</span>
                                                            </div>
                                                            <div className='item-role'>
                                                                <icon.userRole />
                                                                <span>Manager</span>
                                                            </div>
                                                        </PopperRole>
                                             }}
                                        >
                                            <div className='role-btn' onClick={() =>handleIsRuleOptionOpen(idx)}>
                                            {(user.User_Account_Permission === 'Admin') && <icon.adminRole />}
                                            {(user.User_Account_Permission === 'User') && <icon.userRole />}
                                            <span>{user.User_Account_Permission}</span>
                                            <icon.arrowDown />
                                        
                                            </div>

                                        </Tippy>
                                        
                                    </td>
                                    <td>
                                        <div className='option'>
                                            <Tippy
                                            offset={[0, 0]}
                                            interactive
                                            visible= {isOpenOption === idx}
                                            placement='bottom'
                                            onClickOutside={() => {setIsOpenOption(-1)}}
                                            render={() => {
                                                return (
                                                <PopperOption>
                                                    <div className="item" onClick={handleClickEditOption}>
                                                        <span>Edit User Information</span>
                                                    </div>
                                                    <div className="item delete" onClick={() => handleClickDeleteUser(Number(user.id))}>
                                                        <span>Delete User</span>
                                                    </div>
                                                </PopperOption>
                                                )
                                            }}
                                            >
                                                <div className="icon">
                                                    <icon.option onClick={() => handleClickOptionBtn(idx)}/>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        })}
                        </tbody>
                    </table>
                </div>
            </div>


        </Container>
    );
}
 
export default ManageUser;

const Container = styled.div`
    height: calc(100vh - var(--header-height));
    

    header {
        padding: 16px 20px;

        .title {
            font-size: 2rem;
            font-weight: 900;
        }

        .description {
            color: var(--secondary_admin);
            font-size: 1.4rem;
        }
    }

    .form {
        max-width: calc(100% - 40px);
        margin: 16px 20px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        background-color: #ffffff;
        border-radius: 10px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

            .content{
                height: 100%;
                width: 100%;
                padding: 20px;
                display: flex;
                flex-wrap: wrap;

                .add{
                    flex: 1;
                    button{
                        border: none;
                        padding: 8.8px 16px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 5px;
                        gap: 7px;
                        background-color: var(--third_admin);
                        color: white;
                        font-size: 1.2rem;
                        transition: all .2s ease-in-out;
                    
                        &:hover {
                            box-shadow: 0 0.1rem 0.5rem rgb(37 71 106 / 50%), 0 0.25rem 1rem rgb(55 60 67 / 20%);
                        }
                    }
                
                }

                .search{

                    input{
                        display: block;
                        width: 280px;
                        padding: 0.55rem 1rem;
                        font-size: 1.35rem;
                        font-weight: 400;
                        line-height: 1.5;
                        color: #75868f;
                        background-color: #fff;
                        background-clip: padding-box;
                        border: 1px solid rgba(0,0,0,.07);
                        appearance: none;
                        border-radius: 0.4375rem;
                        box-shadow: inset 0 1px 2px rgb(55 60 67 / 8%);
                        transition: border-color .35s ease-in-out,box-shadow .35s ease-in-out;

                        &:focus{
                            color: #75868f;
                            background-color: #fff;
                            border-color: #25476a;
                            outline: 0;
                            box-shadow: inset 0 1px 2px rgb(55 60 67 / 8%), 0 0 0.75rem 0 rgb(0 0 0 / 13%);
                        }
                    }
                }

                .list{
                    width: 100%;

                    thead, tbody tr {
                        display: table;
                        width: 100%;
                        table-layout: fixed;/* even columns width , fix width of table too*/
                    }

                    thead{
                        font-size: 1.3rem;
                        border-bottom: 2px solid black;

                        tr{
                            th{
                                text-align: start;
                                padding: 12px 8px;
                            }
                        }
                    }

                    tbody{
                        display: block;
                        height: 60vh;
                        overflow: auto;

                        tr{
                            font-size: 1.2rem;
                            td{
                                color: var(--text-color);
                                padding: 12px 8px;
                                
                                .option{

                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    .icon{
                                        cursor: pointer;
                                        font-size: 15px;
                                        position: relative;
                                    }
                                    

                                }

                                .role-btn{

                                    --btn-height: 30px ;
                                    position: relative;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 5px;
                                    background: var(--role-admin);
                                    color: white;
                                    max-width: 100px;
                                    height: var(--btn-height);
                                    border-radius: 7px;

                                    svg{
                                        font-size: 1.7rem;
                                    }

                                    
                                }

                                &.online{
                                    span {
                                        color: var(--online);
                                    }
                                }

                                &.offline{
                                    span {
                                        color: var(--offline);
                                    }
                                }

                                .user{
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                .img-wrap{
                                    width: 40px;
                                    height: 40px;
                                    overflow: hidden;
                                    border-radius: 50%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                }

                                img{
                                    width: 100%;
                                }
                                }

                                .info{
                                    
                                    margin-left: 10px;
                                    text-align: start;

                                    .name{
                                        font-weight: 700;
                                    }

                                    .username{
                                        font-size: 1.2rem;
                                        color: var(--side-bar-normal-text);
                                    }
                                }

                                

                            }

                                
                        }
                    }

                        
                }


            }
                

    }
    
`

const PopperOption = styled.div`

width: 150px;
height: auto;
background-color: white;
position: absolute;
border-radius: 3px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;  
right: 0;
overflow: hidden;

.item{
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    

    &:hover {
        background-color: var(--semi-primary_admin);
    }

    &.delete{
        span{
            color: var(--notify-color);
        }
    }
    span{
        font-weight: 900;
        color: var(--text-color);
    }

    
}


`

const PopperRole = styled.div `
        background-color: var(--secondary_admin);
        width: 100px;
        position: absolute;
        height: auto;
        border-radius: 5px;
        top: calc(var(--btn-height));
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        padding: 5px 0;
        z-index: 99;

        .item-role{

            padding: 5px 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            gap: 5px;
            color: white;
            cursor: pointer;

            &:hover{
                background-color: var(--hover-item_dark);
            }

        }
`