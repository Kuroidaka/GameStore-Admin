
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
          <GameListWrapper>
            <GameList className=""/>
          </GameListWrapper>
        </GameListContainer>
      </Container>
    </GameProvider>
  );
};

export default GameManage;

const Container = styled.div`
  /* display: flex;
  flex-direction: column; */

`;

const GameListContainer = styled.div`
  width: 100%;

`;

const GameListWrapper = styled.div`
  margin: 4rem;
  width: 100%;
  height: 70vh;
  padding: 20px;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`
