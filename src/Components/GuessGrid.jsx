import React from 'react'
import '../css/guessGrid.css'
import GuessRow from './GuessRow';
import CompleteRow from './CompleteRow';
import EmptyRow from './EmptyRow';


function GuessGrid({ guess, guessRow, guessColumn, completeGuesses, checkLetters, revealTime}) {
  const guessArr = Array.from(guess.toUpperCase())
  const emptyRows = !(completeGuesses.length >= guessRow) ? [...Array(guessRow - 1 - completeGuesses.length)] : []
  return (
    <div className="grid">
      <div className="GuessGrid">
        {completeGuesses.map((e, i) => (
          <CompleteRow
            guess={e}
            key={i}
            checkLetters={checkLetters}
            revealTime={revealTime}
          />
        ))}
        {completeGuesses.length < guessRow && <GuessRow guess={guessArr} guessColumn={guessColumn} />}
        {emptyRows.map((_, i) => (
          <EmptyRow key={i} guessColumn={guessColumn} />
        ))}
      </div>
    </div>
  )
}

export default GuessGrid