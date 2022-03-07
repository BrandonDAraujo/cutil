import React from 'react'
import Squares from './Squares'

function EmptyRow({guessColumn}) {
    const emptyRows = [...Array(guessColumn)]
    return (
        <div>
            <div className="guessRow">
                {emptyRows.map((_, i) => (
                    <Squares key={i} />
                ))}
            </div>
        </div>
    )
}

export default EmptyRow