import React from 'react';
import styled from 'styled-components';
import SearchBox from '../component/SearchBox';
import Avatar from '../component/Avatar';
import UserMenu, { PopperUserMenu } from '../component/UserMenu';
import { icon } from '../assert/icon/icon';

const HeaderLayout = (props) => {


  return (
      <Header>
        <SearchBoxWrapper>
          <SearchBox />
        </SearchBoxWrapper>

        <ActionWrapper>
          <icon.notification />
          <icon.message />

        </ActionWrapper>

        <AvatarWrapper> 
          <Avatar />
          <UserMenu />
        </AvatarWrapper>
      </Header>
  );
};

export default HeaderLayout;


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: var(--header-height);
    width: 100vw;
    position: relative;
    z-index: 99;
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100%;
  justify-content: center;
  margin-left : 10rem;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  &:hover ${PopperUserMenu} {
    display: block;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 25px;
  margin-right: 20px;
  svg {
    cursor: pointer;
    &:nth-child(1), &:nth-child(2) {
      
    }

    &:nth-child(1) {
      font-size: 30px;
    } 
    
    &:nth-child(2) {
      font-size: 28px;
    }

  }
`