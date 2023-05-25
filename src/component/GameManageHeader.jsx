import React from "react";
import styled from "styled-components/macro";

const GameManageHeader = () => {
  return (
    <Header>
      <HeaderContent>
        <HeaderText>Game Products</HeaderText>
        <ButtonWrapper>
          <Button>Import</Button>
          <Button>Export</Button>
        </ButtonWrapper>
      </HeaderContent>
      <OptionsWrapper>
        <Options>
          <OptionCell>
            <Option>Overview</Option>
          </OptionCell>
          <OptionCell>
            <Option>New Game</Option>
          </OptionCell>
          <OptionCell>
            <Option>Analytics</Option>
          </OptionCell>
          <OptionCell>
            <Option>Settings</Option>
          </OptionCell>
        </Options>
      </OptionsWrapper>
    </Header>
  );
};

export default GameManageHeader;

const Header = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const HeaderText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-left : 4rem;
  color: #333333;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  font-size: 1.3rem;
  color: #ffffff;
  background-color: #333333;
  border: none;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  &:first-child {
    margin-right: 1rem;
  }
  &:hover {
    background-color: #555555;
  }
`;

const OptionsWrapper = styled.div`
  background-color: #f5f5f5;

`;

const Options = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  margin-left: 3.5rem;
`;

const OptionCell = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #f5f5f5;
  &:hover {
    border-bottom: 3px solid #ff7f50;
  }
`;

const Option = styled.div`
  font-size: 1.5rem;
  color: #666666;
  margin-right: 2rem;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;
