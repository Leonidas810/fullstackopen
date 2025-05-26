import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";
import "./App.css";

function App() {
  const initialOptions = [
    {
      name: "Good",
      points: 0,
    },
    {
      name: "Neutral",
      points: 0,
    },
    {
      name: "Bad",
      points: 0,
    },
  ];

  const [opinions, setOpinions] = useState(initialOptions);

  const handleSetOpinion = (opinionIndex) => {
    setOpinions((prevState) =>
      prevState.map((e, i) =>
        i === opinionIndex ? { ...e, points: e.points + 1 } : e
      )
    );
  };

  return (
    <>
      <h1>Give a feedback</h1>
      <div className="buttons-container">
        {opinions.map((e, i) => (
          <Button key={i} onClick={() => handleSetOpinion(i)}>
            {e.name}
          </Button>
        ))}
      </div>
      <h2>Statistics</h2>
      <Statistics opinions={opinions} />
    </>
  );
}

export default App;
