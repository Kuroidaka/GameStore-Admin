import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface NavItemProps {
    title: string,
    children: ReactNode,
    sidebaropen: string,
    active?: string | undefined,
    route: string
}

interface NavItemStyles {
    to: string
    active: string | undefined
    sidebaropen: string
    
}

const NavItem:FC<NavItemProps> = (props) => {
    const { title, children, active, sidebaropen, route } = props

    

    return ( 
        <Item to={route} active={active} sidebaropen={sidebaropen} >
            {children}
            {sidebaropen === 'true' && <span >{title}</span>}
        </Item>            
    );
}
 
export default NavItem;


const Item = styled(Link)<NavItemStyles>`

    display: flex;
    align-items: center;
    justify-content: ${({sidebaropen}) => sidebaropen === 'true' ? `flex-start` : `center`};
    padding: 9.44px;
    color: var(--side-bar-normal-text);
    cursor: pointer;

    svg{
        font-size: 20px;
       
    }
    span{
        padding-left: 8px;
        font-size: 12px;
    }

    ${({ active }) => active === 'true' && `
        background-color: var(--secondary_admin);
        color: var(--white-color);
        font-weight: 600;
        border-radius: 11px;
    `}
`