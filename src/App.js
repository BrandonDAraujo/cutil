import './app.css'
import Title from './Components/Title'
import GuessGrid from './Components/GuessGrid';
import Keyboard from './Components/Keyboard';
import { validWords } from './words/All_Words';
import { useState, useEffect } from 'react';
function App() {
  const GUESS_ROWS = 6;
  const GUESS_COLUMNS = 4;
  const REVEAL_TIME = 500;

  const [guess, setGuess] = useState('')
  const [completeGuess, setCompleteGuess] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const [word, setWord] = useState("")

  useEffect(() => {

    const setLocalStorage = (prop) => {
      localStorage.setItem("game", JSON.stringify({
        ...JSON.parse(localStorage.getItem("game")),
        ...prop
      }))
    }

    if (isWin) {
      console.log("won")
      setLocalStorage({"won": true})
      return
    }
    else if (isLost) {
      console.log("lost")
      setLocalStorage({"lose": true})
      return
    }
  }, [isWin, isLost])


  useEffect(() => {
    const todayOffset = Math.floor((Date.now() - new Date(2022, 2, 6)) / 1000 / 60 / 60 / 24)
    setWord(validWords[todayOffset])
    const storageGame = JSON.parse(localStorage.getItem("game"))
    if(!(new Date().setHours(0, 0, 0, 0) === storageGame["timestamp"]) || !storageGame ){
        localStorage.setItem("game", JSON.stringify({
        ...storageGame,
        "timestamp": new Date().setHours(0, 0, 0, 0)
      }))
      return
    }
    setCompleteGuess(storageGame["complete_guesses"])
    if (storageGame["won"]) {
      setIsWin(true)
    } else if (storageGame["lose"]) {
      setIsLost(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("game", JSON.stringify({
      ...JSON.parse(localStorage.getItem("game")),
      "complete_guesses": completeGuess
    }))
    setRevealed(true)
    setTimeout(() => {
      setRevealed(false)
    }, REVEAL_TIME * GUESS_COLUMNS)
  }, [completeGuess])

  const checkGuesses = (guessList) => {
    let wordsObj = {}
    guessList.forEach(guess => {
      Array.from(guess).forEach((e, i) => {
        if (!word.includes(e)) return wordsObj[e] = "Not"

        if (word[i] === e) {
          return wordsObj[e] = "Correct"
        }
        if (wordsObj[e] !== "Correct") return wordsObj[e] = "Includes"
      })
    })
    return wordsObj
  }

  const checkLetters = (guess) => {
    const letterStatus = [...Array(GUESS_COLUMNS)]
    guess.forEach((e, i) => {
      if (e === word[i]) {
        letterStatus[i] = 'correct'
        return
      }
    })
    guess.forEach((e, i) => {
      if (letterStatus[i]) return
      if (word.includes(e)) {
        letterStatus[i] = "includes"
      } else {
        letterStatus[i] = "not"
      }
    })
    return letterStatus
  }

  const onChar = (key) => {
    if (guess.length + 1 > GUESS_COLUMNS) return
    if (!key.toUpperCase().match(/^[A-Z]$/)) return
    if (isWin || isLost) return
    setGuess(`${guess}${key}`.toLowerCase())
  }

  const onDel = () => {
    if (guess.length < 0) return
    setGuess(guess.slice(0, -1))
  }
  const onEnter = () => {
    if (isWin || isLost) return
    if (guess.length !== GUESS_COLUMNS) return
    if (guess === word) {
      setIsWin(true)
    }
    else if (completeGuess.length + 1 === GUESS_ROWS) {
      setIsLost(true)
    }
    setCompleteGuess([...completeGuess, guess])
    setGuess('')
    setRevealed(true)
    setTimeout(() => {
      setRevealed(false)
    }, REVEAL_TIME * GUESS_COLUMNS)
  }

  return (
    <div className="App">
      <Title />
      <GuessGrid
        guess={guess}
        guessRow={GUESS_ROWS}
        guessColumn={GUESS_COLUMNS}
        completeGuesses={completeGuess}
        checkLetters={checkLetters}
        revealTime={REVEAL_TIME}
        isWin={isWin}
      />
      <Keyboard
        onChar={onChar}
        onDel={onDel}
        onEnter={onEnter}
        revealed={revealed}
        checkGuesses={checkGuesses}
        completeGuess={completeGuess}
        revealTime={REVEAL_TIME * GUESS_COLUMNS}
      />
    </div>
  );
}

export default App;
