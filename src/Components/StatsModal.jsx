import React, {useRef} from 'react'
import '../css/statsModal.css'
import { Transition } from 'react-transition-group'

function StatsModal({ rows, gameFinished, checkLetters, guesses, setAlert, todayOffset, modal}) {
    const stats = JSON.parse(localStorage.getItem("stats"))
    const games = stats && stats.length
    const winsArray = stats && stats.filter(item => (
        item.won === true
    ))
    const wins = stats && winsArray.length
    const winRate = (wins / games) ? Math.floor((wins / games) * 100) : 0
    const winObject = {}
    const duration = 300
    const nodeRef = useRef(null)
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        transform: "translateY(-60%)",
        opacity: 0,
        pointerEvents: "none"
    }

    const transitionStyles = {
        entering: { opacity: 1, transform: "translateY(-50%)" },
        entered: { opacity: 1, transform: "translateY(-50%)", pointerEvents: "all"},
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };


    winsArray && winsArray.forEach(e => {
        if (winObject[e.complete_guesses.length]) {
            winObject[e.complete_guesses.length] += 1
        } else {
            winObject[e.complete_guesses.length] = 1
        }
    })

    const share = () => {
        let board = `Cutil #${todayOffset} ${guesses.length}/${rows}\n`
        guesses.forEach(x => {
            checkLetters(Array.from(x)).forEach(y => {
                switch (y) {
                    case "correct":
                        board += "🟩"
                        break
                    case "includes":
                        board += "🟨"
                        break
                    case "not":
                        board += "⬜"
                        break
                    default:
                        break
                }
            })
            board += "\n"
        })
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)){
            navigator.share({
                text: board
              }).then(() => {
                setAlert({
                    "message": "Copied!",
                    "duration": 1500
                  })
              })
            }else{
                navigator.clipboard.writeText(board).then(
                    success =>setAlert({
                        "message": "Copied!",
                        "duration": 1500
                      }),
                    err => console.log("error copying text")
                );
            }
    }

    return (
        <Transition in={modal} timeout={duration} nodeRef={nodeRef}>
            {state => (
        <div className="statsModal" ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className="numberStats">
                <div className="gamesContainer">
                    <div className="gamesStats">
                        {games}
                    </div>
                    <div className="games">
                        Games
                    </div>
                </div>
                <div className="winRateContainer">
                    <div className="winRateStats">
                        {winRate}%
                    </div>
                    <div className="winRate">
                        Win %
                    </div>
                </div>
            </div>
            {gameFinished && <button className="shareButton" onClick={share}>SHARE</button>}
            <div className="graphContainer">
                {[...Array(rows)].map((_, y) => (
                    <div className="statLine" key={y}>
                        <div>
                            {y + 1}
                        </div>
                        {winObject[y] && <div className="line" style={{ height: `${Math.floor((winObject[y] / wins) * 100)}%` }}>
                            <div className="inlineNumber">{winObject[y]}</div>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
            )}
        </Transition>
    )
}

export default StatsModal