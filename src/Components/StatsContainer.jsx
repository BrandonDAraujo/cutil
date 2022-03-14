import React from 'react'
import EqualizerRounded from '@mui/icons-material/EqualizerRounded';
import StatsModal from './StatsModal'

function StatsContainer({modal, openModal, GUESS_ROWS, todayOffset, setAlert, isLost, isWin, checkLetters, completeGuess}) {
    return (
        <>
            {modal && <div className="modalBackground" onClick={openModal}></div>}
            {modal && <StatsModal rows={GUESS_ROWS} todayOffset={todayOffset} setAlert={setAlert} gameFinished={isWin || isLost} checkLetters={checkLetters} guesses={completeGuess} />}
            <button className="statsButton" onClick={openModal}>
                <EqualizerRounded style={{ width: "42px", height: "42px" }} />
            </button>
        </>
    )
}

export default StatsContainer