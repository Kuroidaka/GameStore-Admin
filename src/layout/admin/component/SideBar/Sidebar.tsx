import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Tippy from '@tippyjs/react/headless';
import { FC, useRef, useState } from "react";

import { img } from "~/assert/img";
import NavItem from "./NavItem";
import AdminOption from "./AdminOption";
import { NavList } from "./NavList";
import config from "~/config";
import Avatar from "~/component/Avatar/Avatar";

interface SidebarProps {
    sideBarRef: React.RefObject<HTMLDivElement>,
    sidebarOpen: Boolean
}
interface SidebarStyleProps {
    sidebarOpen: Boolean
}

const Sidebar:FC<SidebarProps> = (props) => {
    const { sideBarRef, sidebarOpen } = props
    const location = useLocation()
    const avatarRef = useRef< HTMLImageElement>(null)
    const adminNavRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    // console.log(location.pathname);
    // console.log(activeItem);
    
    // const { title } = useParams


    const handleClickAdminInfo = () => {
        adminNavRef.current?.classList.toggle('show')
    }

    const handleClickLogo = () => {
        navigate(config.adminRoutePath.home )
    }


    return ( 
        <SidebarStyle ref={sideBarRef} sidebarOpen={sidebarOpen}>
            <header >
                <img src={img.logo} alt="logo"  onClick={handleClickLogo}/>
            </header>
        <Container>
            <div className="info">

            {/* just active when sidebar's width is being shrunk */}
                <Tippy  
                interactive={true}
                offset={[0,15]}
                placement='right-start'
                render={attrs => (
                    !sidebarOpen && <AdminOption handleClickAdminInfo={handleClickAdminInfo} adminNavRef={adminNavRef} />
                )}>
                    
                    <Avatar ref={avatarRef} src={img.defaultAvatar} width={sidebarOpen? '62px': '43px'} />
                </Tippy>

               {sidebarOpen && <AdminOption handleClickAdminInfo={handleClickAdminInfo} adminNavRef={adminNavRef} />}

            </div>

            <Content >
                <div className="navigation">

                   {sidebarOpen && <h6>Navigation</h6>}

                    {
                        NavList.map(({title, id, Icon, route}, idx) => {

                            return (
                                <div key={id}>
                                    <NavItem  
                                        route={route}
                                        title={title} 
                                        sidebaropen={sidebarOpen.toString()}
                                        active={route === location.pathname ? "true" : "false"}>
                                        <Icon />
                                    </NavItem>
                                </div>
                            )
                        })
                    }

                </div>
            </Content>
        </Container>

        </SidebarStyle>
     );
}
 
export default Sidebar;

const SidebarStyle = styled.div<SidebarStyleProps>`
    max-width: 225px;
    width: 100%;
    height: calc(100% - var(--header-height));
    background-color: var(--primary_admin);
    transition: width .2s ease-in-out;

    header{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary_admin);
        height: var(--header-height);
        img{
            width: ${({ sidebarOpen }) => sidebarOpen ? '68px' : '50px'};
            border-radius: 42px;
            cursor: pointer;

        }
    }

    .info {
        margin: 32px 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;

        .avatar-wrap {
            cursor: pointer;
            margin: 32px 0 10px;
            width: 62px;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid var(--secondary_admin);
            background-color: var(--primary_admin);
            img{
                width: 100%;
            }
        }
        
        
    }   
`

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: var(--third_admin);
    border-top-right-radius: 20px;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
`

const Content = styled.div `
    background-color: var(--third_admin);
    z-index: 99;
    .navigation{
        padding: 16px 0;

        h6{
            padding: 0 16px;  
            margin: 0 0 8px;
            color : var(--title-color) ;
        }

    }

    div {
        width: 100%;
    }
`