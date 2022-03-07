import React, { useState } from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace';
import '../css/key.css'

function Key({ letter, keyType = "key", onChar, onEnter, onDel, status, revealed, revealTime, isWin}) {
    const [animation, setAnimation] = useState(false)
    const [showStatus, setShowStatus] = useState(undefined)
    if(revealed){
        setTimeout(()=>{
            setShowStatus(status);
        }, revealTime)
    }

    const handleAnimation = () => {
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
        }, 100)
    }

    const onClick = e => {
        handleAnimation()
        e.currentTarget.blur()
        if(letter === "✔"){
            onEnter()
        }else if(letter === "Backspace"){
            onDel()
        }else{
            onChar(letter)
        }

    }
    return (
        <>
            <button onClick={onClick} className={`${keyType} ${showStatus} ${animation && "pressed"}`}>{
                letter === "Backspace" ? <BackspaceIcon fontSize="large"></BackspaceIcon> : letter
            }</button>
        </>
    )
}

export default Key