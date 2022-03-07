import React from 'react'
import Squares from './Squares'
import '../css/guessRow.css'

function GuessRow({ guessColumn, guess }) {
  const emptySquares = [...Array(guessColumn - guess.length)]
  return (
    <div className="guessRow">
      {guess.map((e, i) => (
        <Squares value={e} key={i}/>
      ))}
      {emptySquares.map((_, i) => (
        <Squares key={i} />
      ))}
    </div>
  )
}

export default GuessRow