import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import config from '~/config';



const SideBarLayout = (props) => {

    const { dashboard, admin, gameManage, order } = config.adminRoutePath
    const menuItems = [
        { id: 1, label: 'Dashboard', link: dashboard  },
        { id: 2, label: 'Game', link: gameManage },
        { id: 3, label: 'Admin', link: admin },
        { id: 4, label: 'Order', link: order },
        { id: 5, label: 'Customer', link: '' },
        { id: 6, label: 'Notification', link: '' },
    ];

  return (
    <SideBar>


        <SidebarMenu>
            {menuItems.map((menuItem) => (
            <SidebarMenuItem key={menuItem.id}>
                <SidebarLink to={menuItem.link}>{menuItem.label}</SidebarLink>
            </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </SideBar>
  );
};

export default SideBarLayout;

const SideBar = styled.div `
    width: 15%;
    height: calc( 100vh - var(--header-height));
    background-color: var(--second-color);
    padding: 20px;

`

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-size: 14px;
font-weight: 700;

  &:hover {
    background-color: #ddd;
  }
`;