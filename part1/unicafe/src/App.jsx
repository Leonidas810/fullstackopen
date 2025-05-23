import { useState } from 'react'
import Button from './components/Button'
import "./App.css"

function App() {
  const initialOptions = [{
    name: "Good",
    points: 0
  },
  {
    name: "Neutral",
    points: 0
  },
  {
    name: "Bad",
    points: 0
  }]

  const [opinions, setOpinions] = useState(initialOptions)

  const handleSetOpinion = (opinionIndex) => {
    setOpinions((prevState) =>
      prevState.map((e, i) => (i === opinionIndex
        ? { ...e, points: e.points + 1 }
        : e)
      )
    )
  }
  const total = opinions.reduce((acc, e) => acc + e.points, 0);
  const score = opinions.reduce((acc, e) => {
    if (e.name === "Good") return acc + e.points;
    else if (e.name === "Bad") return acc - e.points;
    else return acc;
  }, 0);

  return (
    <>
      <h1>Give a feedback</h1>
      <div className='buttons-container'>
        {opinions.map((e, i) => (
          <Button
            key={i}
            onClick={() => handleSetOpinion(i)}>
            {e.name}
          </Button>
        ))}
      </div>
      <h2>Statistics</h2>
      {opinions.map((e, i) => (
        <div key={i}>{e.name} - {e.points}</div>
      ))}
      <div>All - {total}</div>
      <div>Average - {score / total}</div>
      <div>Positive {(opinions[0].points / total) * 100}%</div>

    </>
  )
}

export default App
