import React from 'react'
import '../css/squares.css'

function Squares({ value, status, revealTime, spot}) {
  const time = `${revealTime * spot}ms`
  return (
      <div className={`squares ${value && ("animation active")} ${status}`} style={{animationDelay: time}} >
        <div className="letters">
          {value}
        </div>
      </div>

  )
}

export default Squares