import React, { useContext } from "react";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components/macro";
import { mockGameData } from "../../../assert/mockData";
import GameContext from "~/Context/Game.context";
import { formatDate } from "~/utils";
import { API_BASE_URL } from "~/config/api";
import { Tag } from 'primereact/tag';
import { useNavigate } from "react-router";
import config from "~/config";


const GameList = ({ className, style }) => {

  const { gameList } = useContext(GameContext)

  const { gameDetail } = config.adminRoutePath

  const navigate = useNavigate()

  const handleClickGameDetail = (id) => {
    console.log(id)

    navigate(`${gameDetail}/${id}`)
  }

  return (
    <GameListContainer className={className} style={style}>
      {gameList && gameList.map((game) =>{
       return (
        <GameSquare key={game.id}>
          <div className="flex flex-column mr-4 w-5">
            <GameLogo src={`${API_BASE_URL}file/image/${game.imageList[0].filepath}`} alt="Game Logo" />
            <GamePlatform className="flex flex-wrap flex-start gap-2">{
            game.platform && game.platform.split(',').map(tag => (
              <Tag severity="info" value={tag}></Tag>
            ))
            }</GamePlatform>
          </div>
          <GameInfo>
            <GameTitle>{game.game_name}</GameTitle>
            {/* <GameDescription>{game.description}</GameDescription> */}
            <GameDetails>
              <GameDate>Create: {formatDate(game.release_date)}</GameDate>
              <GameDate>Last Modified: {formatDate(game.updated_at)}</GameDate>
              <SettingsButton onClick={() => handleClickGameDetail(game.id)}>
                <SettingsIcon />
              </SettingsButton>
            </GameDetails>
          </GameInfo>
        </GameSquare>
      )})}
    </GameListContainer>
  );
};

export default GameList;



const GameListContainer = styled.div`

  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  gap: 22;
`;

const GameSquare = styled.div`
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 1.5rem;
    border: 1px solid rgb(206 206 206);
    width: 49%;
    height: 150px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const GameLogo = styled.img`
  width: auto;
  height: 60px;
  object-fit: contain;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
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
  width:auto;
  text-align: center;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap
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
  right: 2rem;
  width: 4rem;
  top: 2rem;
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