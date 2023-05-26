import React from 'react';
import styled from 'styled-components/macro';
import HeaderLayout from './Header';
import SideBarLayout from './Sidebar';


const MainLayout = (props) => {
  const { children } = props;

  return (
    <Container>
      <HeaderLayout />

      <Main>
        <SideBarLayout />
        <Content>
          {children}
        </Content>
      </Main>
    </Container>
  );
};

export default MainLayout;


const Container = styled.div`
width: 100vw;
height: 100vh;
`;

const Main = styled.div`
display: flex;
flex-direction: row;
`

const Content = styled.div `
  width: 85%;
`