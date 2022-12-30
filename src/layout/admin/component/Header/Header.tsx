import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiAlignJustify, FiSearch } from 'react-icons/fi'
import { RiNotification4Line } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { inputWrapRefProps } from "~/layout/admin/HeaderSideBar";
import Tippy from "@tippyjs/react/headless";
import NotifyPopper from "./NotifyPopper";

interface HeaderProps {
    handleClickSelectBtn: (inputWrapRef: inputWrapRefProps) => void,
    sidebarOpen: Boolean
}

interface ContainerStyleProps {
    sidebarOpen: Boolean
    notifyModal: boolean
}


const Header:FC<HeaderProps> = (props) => {
    const { handleClickSelectBtn, sidebarOpen } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const inputWrapRef = useRef<HTMLFormElement>(null)
    const [notifyModal, setNotifyModal] = useState<boolean>(false)
    const [text, setText] = useState<string>('')


    // handle not to return the original search button when it have value
    useEffect(() => {
        if(inputRef.current && inputRef.current?.value !== ''){
            inputWrapRef.current?.setAttribute('style', 'width: 300px')
        }
        else {
            inputWrapRef.current?.setAttribute('style', 'width: 40px')
        }

    }, [text])
    
    
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSearch = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(text);
    }

    const handleClickNotifyBtn = () => {
        setNotifyModal(!notifyModal)
    }

    
    return ( 
        <HeaderBar>
            <Container sidebarOpen={sidebarOpen} notifyModal={notifyModal}>

                <div className="wrap-select">
                    <FiAlignJustify className="icon select" onClick={() => handleClickSelectBtn(inputWrapRef)}/>
                </div>

                <div className="header-body">
                    <form ref={inputWrapRef} onSubmit={handleSearch} className="wrap-search-bar">
                        <input value={text} ref={inputRef} type="text" onInput={handleInput} placeholder="Search here ..." />
                        <div className="wrap-icon"> 
                            <FiSearch className="icon search"/>
                        </div>
                    </form>

                </div>    

                <div className="header-end">
                    <div className="icon-box">      
                        <Tippy
                            visible={notifyModal}
                            interactive={true}
                            // offset={[0,0]}
                            placement='bottom-end'
                            onClickOutside={handleClickNotifyBtn}
                            render={attrs => (
                                <NotifyPopper />
                            )}
                        >
                            <div className="icon-wrap notify notification" onClick={handleClickNotifyBtn}>
                                <RiNotification4Line className="icon"/>
                            </div>
                        </Tippy>

                        <div className="icon-wrap">
                            <BiUser className="icon"/>
                        </div>

                        <div className="icon-wrap">
                            <BsThreeDotsVertical className="icon"/>
                        </div>
                    </div>
                </div>


            </Container>
        </HeaderBar>
     );
}
 
export default Header;

const HeaderBar = styled.div`

height: var(--header-height);

width: 100%;
background-color: var(--primary_admin);
display: flex;
align-items: center ;
justify-content: center;


`

const Container = styled.div<ContainerStyleProps>`
width: 100%;
height: 100%;
display: flex;
align-items: center;
gap: 10px;
/* grid-template-columns:  5% 75% 20%;; */

    .wrap-select{
        width: 35px;
        height: 35px;
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: all .1s ease-in-out;
        ${({sidebarOpen}) =>  sidebarOpen ? `background-color: var(--semi-primary_admin);` : `` }

        
        .select {
            font-size: 25px;
            pointer-events: auto;
        }
    }
    .header-body{ 
        flex-grow: 1;
        .wrap-search-bar{
        font-size:1.4rem;
        position: relative;
        -webkit-transition: all .5s ease-in-out;
        transition: all .5s ease-in-out;
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 25px;
        border: 2.5px solid white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        &:hover {
            width: 300px!important;
            cursor: pointer;
            
        }

        &:hover input {
            display: block;
        }

        input{
            position: absolute;
            width: 100%;;
            height: 80%;
            line-height: 30px;
            outline: 0;
            border: none;
            display: none;
            font-size: 1em;
            border-radius: 20px;
            padding: 0 20px;
            background-color: transparent;
            transition: all .5 ease-in-out;

            &:not(:placeholder-shown) {
                display: block;
                
            }
        }




        /* width: ; */
        .wrap-icon{
            box-sizing: border-box;
            flex-shrink: 0;
    /* position: absolute; */
    color: #07051a;
    text-align: center;
    font-size: 1.2em;
    transition: all .5s ease-in-out;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: var(--secondary_admin);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99;
            .search {
                font-size: 25px;
                color: var(--white-color);
            }
    }}
    }
    .header-end{
        display: flex;
        align-items: center;
        width: 200px;
        height: 100%;
        justify-content: space-evenly;
        justify-self: flex-end;

        .icon-box{
            width: 100%;
            display: flex;
            justify-content: space-evenly;

            .icon-wrap{
                position: relative;
                transition: all .2s ease-in-out;
                width: 35px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                will-change: background-color;
                

                &.notify {
                   
                   &:after{
                        content: '';
                        background-color: var(--notify-color);
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        position: absolute;
                        right: 5px;
                        top: 4px;
                        z-index: 99;
                   }
               }

               &.notification{
                ${({notifyModal}) => notifyModal ? 'background-color: var(--semi-primary_admin);': ''}
               }

                .icon{
                    font-size: 25px;
                }
            }
            

        }

    }


`