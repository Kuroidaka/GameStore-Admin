
import React from "react";
import styled from "styled-components/macro";
import GameManageHeader from "../../component/GameManageHeader";
import GameList from "../../component/GameList";
import { mockGames } from "../../component/mockData";

const GameManage = () => {
  return (
    <Container>
      <GameManageHeader />
      <GameListContainer>
        <GameList games={mockGames} />
      </GameListContainer>
    </Container>
  );
};

export default GameManage;

const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const GameListContainer = styled.div`
  flex: 1;
`;
