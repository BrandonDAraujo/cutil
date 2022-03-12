import React from 'react'

function StatsModal() {
    const stats = JSON.parse(localStorage.getItem("stats"))
    const games = stats && stats.length
    const winsArray = stats && stats.filter(item => (
        item.won === true
    ))
    const wins = winsArray.length
    const winRate = (wins / games) ? Math.floor((wins / games)*100) : 0
    
    const winObject = {}
    
    winsArray.forEach(e => {
        if(winObject[e.complete_guesses.length]){
            winObject[e.complete_guesses.length] +=1
        }else{
            winObject[e.complete_guesses.length] = 1
        }
    })
    console.log(winObject)

    return (
        <div>
            Wins: {wins} Winrate: {winRate}%
        </div>
    )
}

export default StatsModal