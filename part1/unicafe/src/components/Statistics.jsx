import StatisticsLine from "./StatisticsLine";

const Statistics = ({ opinions }) => {
  const [total, score] = opinions.reduce(
    (acc, e) => {
      const [accTotal, accScore] = acc;
      const newTotal = accTotal + e.points;
      const newScore =
        e.name === "Good"
          ? accScore + e.points
          : e.name === "Bad"
          ? accScore - e.points
          : accScore;
      return [newTotal, newScore];
    },
    [0, 0]
  );

  return (
    <>
      {total === 0 ? (
        <>
          <div>No feedback given</div>
        </>
      ) : (
        <>
          <table>
            <tbody>
              {opinions.map((e, i) => (
                <StatisticsLine key={i} text={e.name} value={e.points} />
              ))}
              <StatisticsLine text={"All"} value={total} />
              <StatisticsLine text={"Average"} value={score / total} />
              <StatisticsLine
                text={"Positive"}
                value={`${(opinions[0].points / total) * 100}%`}
              />
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Statistics;
