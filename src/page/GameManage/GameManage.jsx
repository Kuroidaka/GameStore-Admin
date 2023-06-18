
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import GameManageHeader from "./Component/GameManageHeader";
import GameList from "./Component/GameList";
import { mockGames } from "../../component/mockData";
import { productApi } from "~/api/product.api";
import { GameProvider } from "~/Context/Game.context";

const GameManage = () => {
  return (
    <GameProvider>
      <Container>
        <GameManageHeader />
        <GameListContainer className="grid">
          <GameList className="card col-5 mx-7 my-4" style={{height: "75vh"}}/>
        </GameListContainer>
      </Container>
    </GameProvider>
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
