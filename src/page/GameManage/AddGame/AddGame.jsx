import React, { useState } from 'react'

const AddGame = () => {

  const [newGame, setNewGame] = useState({
        game_name :  "",
        release_date: "",
        developer: "",
        price: "",
        genre: "",
        platform: "",
        description: "",
      })  

  const inputData = [
    {
      name: "game_name",
      value: newGame.game_name
    },
    {
      name: "release_date",
      value: newGame.release_date
    },
    {
      name: "developer",
      value: newGame.developer
    },
    {
      name: "price",
      value: newGame.price
    },
    {
      name: "genre_name",
      value: newGame.genre
    },
    {
      name: "platform",
      value: newGame.platform
    },
    {
      name: "description",
      value: newGame.description
    },
  ]


    const handleInputValue = (e) => {
      const {name, value} = e.target

      setNewGame(prev => ({...prev, [name]: value}))

    }

    console.log(newGame)

  return (
    <div>

    
    </div>
  )
}

export default AddGame