import React from 'react';
import styled from 'styled-components/macro';

const UserMenu = () => {
  return (
    <PopperUserMenu>
      <MenuItem>
        <MenuLabel>Profile</MenuLabel>
      </MenuItem>
      {/* <Box>
        <div className="box1"></div>
      </Box> */}
      <MenuItem>
        <MenuLabel>Setting</MenuLabel>
      </MenuItem>
      <MenuItem>
        <MenuLabel>Theme</MenuLabel>
      </MenuItem>
      <MenuItem>
        <MenuLabel>Sign Out</MenuLabel>
      </MenuItem>
    </PopperUserMenu>
  );
};

export default UserMenu;

export const PopperUserMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 99;
  overflow: hidden; 

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
`;

const MenuLabel = styled.span`
  color: #333333;
  font-size: 16px;
  font-weight: 500;
`;

const Box = styled.div`
  background-color:  red;
  width: 30px;
  height: 30px;

  .box1{
    background-color:  blue;
  width: 15px;
  height: 15px;

  }
`