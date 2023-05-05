import React from 'react';
import styled from 'styled-components';
import SearchBox from '../component/SearchBox';
import Avatar from '../component/Avatar';

const HeaderLayout = (props) => {
  const { children } = props;

  return (
    <Container>
      <Header>
        <SearchBoxWrapper>
          <SearchBox />
        </SearchBoxWrapper>
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
      </Header>
      {children}
    </Container>
  );
};

export default HeaderLayout;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
`;
