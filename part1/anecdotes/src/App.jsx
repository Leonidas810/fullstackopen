import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState({
    all: new Array(anecdotes.length).fill(0),
    fav: null,
  });
  const [selected, setSelected] = useState(0);

  const handleOnClickAnecdote = (e) => {
    e.preventDefault();
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleOnClickVote = (e) => {
    e.preventDefault();
    setVotes((prevState) => {
      const newAll = [...prevState.all];
      newAll[selected] += 1;
      let newFav = prevState.fav===null ? 0 : prevState.fav;
      for (let i = 0; i < newAll.length; i++) {
        if (newAll[newFav] < newAll[i]) newFav = i;
      }
      const newState = { all: newAll, fav: newFav };
      return newState;
    });
  };

  return (
    <>
      <div>
        <p> {anecdotes[selected]}</p>
        <p>{votes.all[selected]}</p>
        <button onClick={handleOnClickVote}>Vote</button>
      </div>
      <button onClick={handleOnClickAnecdote}>Next anecdote</button>
      <br />
      {votes.fav!==null ? (
        <>
          <p> {anecdotes[votes.fav]}</p>
          <p>{votes.all[votes.fav]}</p>
        </>
      ) : (
        <div>Sin votos registrados</div>
      )}
    </>
  );
};

export default App;
