import React, { useEffect } from 'react'
import '../css/keyboard.css'
import Key from './Key';
function Keyboard({ guess, onChar, onDel, onEnter, revealed, checkGuesses, completeGuess, revealTime, isWin}) {
    const checkStatus = checkGuesses(completeGuess)
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Backspace") {
                onDel(e.key)
            }
            else if (e.key === "Enter") {
                onEnter()
            }
            else {
                onChar(e.key)
            }
        }
        window.addEventListener("keydown", onKey)
        return () => {
            window.removeEventListener("keydown", onKey)
        };
    }, [onChar, onDel, onEnter]);
    return (
        <div className="keyboard-center">
            <div className="keyboard-row">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(letter => (
                    <Key
                    letter={letter} 
                    key={letter} 
                    onChar={onChar} 
                    onEnter={onEnter} 
                    status={checkStatus[letter.toLowerCase()]} 
                    revealed={revealed}
                    revealTime={revealTime}
                    isWin={isWin}
                    />
                ))}
            </div>
            <div className="keyboard-row">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(letter => (
                    <Key 
                    letter={letter} 
                    key={letter} 
                    onChar={onChar} 
                    onEnter={onEnter} 
                    status={checkStatus[letter.toLowerCase()]}
                    revealed={revealed}
                    revealTime={revealTime}
                    isWin={isWin}/>
                    
                ))}
            </div>
            <div className="keyboard-row">
                <Key
                    keyType={"long"}
                    letter={"Backspace"}
                    onDel={onDel}
                />
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(letter => (
                    <Key 
                    letter={letter} 
                    key={letter} 
                    onChar={onChar} 
                    onEnter={onEnter} 
                    status={checkStatus[letter.toLowerCase()]}
                    revealed={revealed}
                    revealTime={revealTime}
                    isWin={isWin}/>
                ))}
                <Key
                    keyType={"long"}
                    letter={"✔"}
                    onEnter={onEnter}
                />
            </div>

        </div>
    )
}

export default Keyboard