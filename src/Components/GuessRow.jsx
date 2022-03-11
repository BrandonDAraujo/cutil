import React from 'react'
import Squares from './Squares'
import '../css/guessRow.css'

function GuessRow({ guessColumn, guess, wiggle}) {
  const emptySquares = [...Array(guessColumn - guess.length)]
  return (
    <div className={`guessRow ${wiggle}`}>
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