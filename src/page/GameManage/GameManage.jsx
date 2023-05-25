import styled from "styled-components";
import GameManageHeader from "../../component/GameManageHeader";
import SearchBar from "../../component/SearchBar";
import GameList from "../../component/GameList";


const GameManage = () => {
    return ( 
        <Container>
            <GameManageHeader />
            <SearchBarWrapper>
                <SearchBar />
            </SearchBarWrapper>
            <GameListContainer>
                <GameList />
            </GameListContainer>
        </Container>
     );
}
 
export default GameManage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`;

const GameListContainer = styled.div`
  flex: 1;
`;