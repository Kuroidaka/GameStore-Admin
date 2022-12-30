import { FC, Fragment, ReactNode, useRef, useState } from "react";
import styled from 'styled-components'

import Header from '../component/Header/Header'
import Sidebar from "../component/SideBar/Sidebar";

interface HeaderSideBarProps {
    children: ReactNode
}
export interface inputWrapRefProps extends React.RefObject<HTMLFormElement>{}

export interface sideBarRefProps  {}

const HeaderSideBar:FC<HeaderSideBarProps> = ({children}) => {
    const sideBarRef = useRef<HTMLDivElement>(null)
    const [sidebarOpen, setSidebarOpen] = useState<Boolean>(true)

 

    // Change the sidebar width
    const handleClickSelectBtn = (inputWrapRef: inputWrapRefProps) => {

        if(sidebarOpen) {
            sideBarRef.current?.setAttribute('style', 'width: 5%')
            setSidebarOpen(false)


        }
        else {
            sideBarRef.current?.setAttribute('style', 'width: 100%')
            setSidebarOpen(true)
        } 

    }

    return (  
    <Container>
        <Sidebar sideBarRef={sideBarRef} sidebarOpen={sidebarOpen} />

        <Content>
            <Header handleClickSelectBtn={handleClickSelectBtn} sidebarOpen={sidebarOpen}/>
            <div className="overlay"></div>
            <div className="body">
                {children}
            </div>
        </Content>


    </Container>
    );
}
 
export default HeaderSideBar;

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

const Content = styled.div`
    width: 100%;
    height: 100%;

    .overlay {
        height: var(--overlay-height);
        width: 100%;
        background-color: var(--primary_admin);
        border-radius: 0 0 100% 100%/0 0 3vw 3vw;
    }

    .body{
        margin-top: calc(0px - var(--overlay-height));
    }
`