import React, { useState } from "react"
import "./App.css"
import Square from "./components/Square"
import Instructions from "./components/Instructions"



const App = () => {
  const [board, setBoard] = useState([
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
  ])
  const [treasureLocation, setTreasureLocation] = useState(Math.floor(Math.random() * board.length))

  const [bombLocation, setBombLocation] = useState( Math.floor(Math.random() * board.length))

  const [counter, setCounter] = useState(5)

  const [gameOver, setGameOver] = useState(false)

  const resetGame = () => {
    // Setting the counter back to 0 after clicking button.
    setCounter(5)
    // 
    setGameOver(false)
    setBoard([ 
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
    ])

    setTreasureLocation(Math.floor(Math.random() * board.length))
    setBombLocation(Math.floor(Math.random() * board.length))
  }

  const handleSquareClick = (clickedSquareindex) => {
    // While loop to repeat function until bomb and treasure are at seperate locations.
    while (treasureLocation === bombLocation){
      handleSquareClick()
    }
    let updatedBoard = [...board]

    if (counter === 0){
      gameOver = true
    }

    if (clickedSquareindex === treasureLocation) {
      updatedBoard[clickedSquareindex] = "👑"
      setGameOver(true)
      alert ("Congrats, you get to live, for now ")
    } else if (clickedSquareindex === bombLocation) {
      updatedBoard[clickedSquareindex] = "☠️"
      setGameOver(true)
      alert ("You're dead.")
    } else {
      updatedBoard[clickedSquareindex] = "😧"
      setCounter(counter - 1)
    }
   
    setBoard(updatedBoard);
  }


  return (
    <>
      <h1>Treasure Hunt Game</h1>
      <div className="how-to">
        <Instructions />
      </div>
      <div className="board">
        {board.map((value, index) => {
          return (
            <Square
              value={value}
              index={index}
              handleSquareClick={handleSquareClick}
              key={index}
              gameOver={gameOver}
            />
          )
        })}
      </div>
        <div className='counter-box'>Attempts remaining:{counter}</div>
        <button onClick={resetGame}>Click here to play again.</button>
    </>
  )
}

export default App;
