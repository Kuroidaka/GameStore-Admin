import React from "react";

import SearchBar from "../../../component/SearchBar";
import SortOptions from "../../../component/SortOptions";
import ShowOptions from "../../../component/ShowOptions";

import styled from "styled-components/macro";
import Button from "~/component/Button";
import config from "~/config";
import { useNavigate } from "react-router";

const GameManageHeader = () => {

  const { addGame } = config.adminRoutePath

  const navigate = useNavigate()

  const handleClickAddGame = (() => {
    navigate(`/${addGame}`)
  })
  return (
    <Header>
      <HeaderContent>
        <HeaderText>Game Management</HeaderText>
      </HeaderContent>
      <OptionsWrapper>
        <Options>
          <OptionCell>
            <Option>All Game</Option>
          </OptionCell>
          <OptionCell>
            <ShowOptions />
          </OptionCell>
          <OptionCell>
            <SortOptions />
          </OptionCell>
        </Options>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
        <ButtonWrapper>
        <Button title="ADD GAME"
          active={true}
          onClick={handleClickAddGame}
           />
      </ButtonWrapper>
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
  margin-left: 4rem;
  color: #333333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;


const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const Options = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
`;

const OptionCell = styled.li`
  background-color: #f5f5f5;
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

const SearchBarWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  margin: 0 1rem;
  margin-left: 5rem;
`;
