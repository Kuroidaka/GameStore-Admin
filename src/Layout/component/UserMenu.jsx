import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faMoon } from '@fortawesome/free-solid-svg-icons';

const UserMenu = () => {
  
  
  return (
    <PopperUserMenu>
      <MenuItem>
        <StyledIcon icon={faUser}></StyledIcon>
        <MenuLabel>Profile</MenuLabel>
      </MenuItem>
      <MenuItem>
        <StyledIcon icon={faCog}></StyledIcon>
        <MenuLabel>Setting</MenuLabel>
      </MenuItem>
      <MenuItem>
        <StyledIcon icon={faMoon}></StyledIcon>
        <MenuLabel>Theme</MenuLabel>
      </MenuItem>
      <MenuItem>
        <StyledIcon icon={faSignOutAlt}></StyledIcon>
        <MenuLabel>Sign Out</MenuLabel>
      </MenuItem>
    </PopperUserMenu>
  );
};

export default UserMenu;

export const PopperUserMenu = styled.div`
  border-radius: 10px;
  position: absolute;
  margin-top: 0.9rem;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 99;
  &:before{
    content:'';

    height: 2.5rem;
    position: absolute;
    left:0;
    right: 0;
    transform:translateY(-100%);
  }
`;


const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
  &:first-child{
    border-radius: 10px 10px 0px 0px;
  };
    &:last-child{
    border-radius: 0px 0px 10px 10px;
  }

`;

const MenuLabel = styled.span`
  color: #333333;
  font-size: 16px;
  font-weight: 500;
`;


const StyledIcon = styled(FontAwesomeIcon)`
  padding-right: 10px;
`;
