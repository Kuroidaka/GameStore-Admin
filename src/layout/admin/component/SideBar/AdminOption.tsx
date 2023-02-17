import { FC, useEffect } from "react";
import styled from "styled-components";
import { CiLogout, CiMail, CiSettings, CiUser } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "~/config";
import { useAppDispatch, useAppSelector } from "~/hook";
import { logOut, selectCurrentUser } from "~/page/Admin/Auth/auth.slice";

interface AdminOptionProps {
    handleClickAdminInfo: () => void
    adminNavRef: React.RefObject<HTMLDivElement>
}

const AdminOption:FC<AdminOptionProps> = (props) => {
    const {handleClickAdminInfo, adminNavRef} = props
    const currentUser = useAppSelector(selectCurrentUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(currentUser){
            
        }
 
        
    },[currentUser])

    const handleLogout = () => {
        console.log('dispatch logout');
        
        dispatch(logOut())
        localStorage.removeItem("token");
        navigate(config.adminRoutePath.login)
    }

    return ( 
        <Option>
            <span onClick={handleClickAdminInfo}>
                <div className="admin-name-wrap" >
                        <div id="admin-name" className="admin-name">{currentUser?.User_Account_Name}</div>
                        <IoMdArrowDropdown />
                </div>
                    <label htmlFor="admin-name">Administrator</label> 
            </span>

                <div ref={adminNavRef} className="admin-nav">
                <div className="nav-item">
                    <CiMail /> 
                    <p>Messages</p>
                    <div className="notify">
                        <span>9</span>
                    </div>
                </div>

                <Link to={config.adminRoutePath.profile} className="nav-item">
                    <CiUser /> 
                    <p>Profile</p>
                </Link>

                <div className="nav-item" > 
                    <CiSettings /> 
                    <p>Setting</p>
                </div>

                <div className="nav-item" onClick={handleLogout}>
                    <CiLogout /> 
                    <p>Logout</p>
                </div>
                
            </div>
        </Option>
     );
}
 
export default AdminOption;

const Option = styled.div`
max-width: 225px;
width: 100%;
background-color: var(--third_admin);
position: relative;
overflow: hidden;
padding: 7px 16px;
border-radius: 10px;


    span{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center ;
    

    .admin-name-wrap{
        display: flex;
        gap: 10px;
        cursor: pointer;
        

        .admin-name {
        color: var(--primary_admin);
    }

    svg{
        color: var(--primary_admin);
        align-self: flex-end;
    }
    }
    label {
        color: var(--small_text_admin);
        font-size: 14px;
        opacity: .8;
        cursor: pointer;
    }
    }

    .admin-nav{
        flex-direction: column;
        width: 100%;
        height: 1px;
        transition: height .5s ease-in-out;
        will-change: height;   

        &.show {
            height: 130px;
        }

        .nav-item{
            cursor: pointer;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            gap: 10px;
            color: #c4c4c4;
            font-size: 16.5px;
            transition: all .2s ease-in;
            opacity: .7;
            padding: 8px 16px;

            svg{
                
                font-size: 17.5px;
                align-self: flex-start;
            }
            p {
                font-size: 14.5px;
                flex: 1;
            }
            &:hover{
                opacity: 1;
            }
            .notify{
                opacity: 1!important;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                background-color: var(--notify-color);
                border-radius: 7px;
                span {
                    color: var(--white-color);
            }}
        }
    }

`