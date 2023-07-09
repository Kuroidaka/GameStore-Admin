import { productApi } from "~/api/product.api";

const { createContext, useEffect, useState } = require("react");

const GameContext = createContext()

export const GameProvider = ({ children }) => {

    const [list, setList] = useState([])

    useEffect(() => {
        getGame()
    }, []);

    const getGame = () => {
        productApi.getProduct()
        .then(({data}) => {
            setList(data)
        })
    }

    const contextValue = {
        gameList: list,
        setGameList: setList,
        getGameList: getGame
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext