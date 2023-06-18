import React from "react";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components/macro";
import { mockGameData } from "../../../assert/mockData";


const GameList = ({ games }) => {
  return (
    <GameListContainer>
      {games.map((game) => (
        <GameSquare key={game.id}>
          <div>
            <GameLogo src={game.image} alt="Game Logo" />
            <GamePlatform>{game.platform}</GamePlatform>
          </div>
          <GameInfo>
            <GameTitle>{game.title}</GameTitle>
            <GameDescription>{game.description}</GameDescription>
            <GameDetails>
              <GameDate>Create: {game.createDate}</GameDate>
              <GameDate>Last Modified: {game.modifyDate}</GameDate>
              <SettingsButton>
                <SettingsIcon />
              </SettingsButton>
            </GameDetails>
          </GameInfo>
        </GameSquare>
      ))}
    </GameListContainer>
  );
};

export default GameList;



const GameListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameSquare = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid black;
  border-right: 1px solid black;
  width: 50%;
  height: 15rem;
  margin-left: 2rem;
`;

const GameLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
  border: 1px solid black;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  margin-left: 1rem;
`;

const GameTitle = styled.div`
  font-weight: bold;
  margin: 0;
`;

const GameDescription = styled.div`
  margin: 0;
  max-width: 300px;
  overflow-wrap: break-word;
`;

const GamePlatform = styled.div`
  margin-top: 0.5rem;
  width: 80px;
  background-color: red;
  color: white;
  text-align: center;
  padding: 0.5rem;
`;



const GameDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const GameDate = styled.div`
  margin-top: 2.5rem;
  margin-right: 1rem;
`;

const SettingsButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: 	#F8F8FF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
const SettingsIcon = styled(FiSettings)`
    width: 2rem;
    height: 2rem;
    font-size: 100px; /* Increase the font size for a larger icon */
`;