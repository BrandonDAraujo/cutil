import React from 'react'
import Squares from './Squares'

function CompleteRow({ guess, checkLetters, revealTime}) {

    const guessArr = [...Array.from(guess.toUpperCase())]
    const status = checkLetters(Array.from(guess))
    return (
        <div className="guessRow">
            {guessArr.map((e, i) => (
                <Squares
                value={e} 
                key={i} 
                status={status[i]} 
                revealTime={revealTime}
                spot={i}/>
            ))}
        </div>
    )
}

export default CompleteRow