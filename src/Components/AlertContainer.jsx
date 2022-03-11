import React from 'react'
import Alert from './Alert'
import '../css/alertContainer.css'

function AlertContainer({
    duration,
    alert

}) {
  return (
    <div className="alertContainer">
        <Alert
            duration={duration}
            alert={alert}
        />
    </div>
  )
}

export default AlertContainer