import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => {

  return (
    <button onClick={onClick}>{text}</button>
  )
}

// const FeedbackPanel = ({panelText1, panelText2, panelText3}) => {

// }

const FeedbackItem = ({ text, num }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{num}</td>
    </tr>
  )
}

const Statistics = ({ goodNum, neutralNum, badNum }) => {
  const total = goodNum + neutralNum + badNum;

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  const average = ((goodNum + -1 * badNum) / total).toFixed(2);
  const positiveRate = total === 0 ? "0%" : (goodNum / total * 100).toFixed(2) + "%";

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <FeedbackItem text="Good" num={goodNum} />
          <FeedbackItem text="Neutral" num={neutralNum} />
          <FeedbackItem text="Bad" num={badNum} />
          <FeedbackItem text="All" num={total} />
          <FeedbackItem text="Average" num={average} />
          <FeedbackItem text="Positive" num={positiveRate} />
        </tbody>
      </table>
    </div>
  );
};


const App = () => {
  const siteTitle = "give feedback"

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text={siteTitle} />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Statistics goodNum={good} neutralNum={neutral} badNum={bad} />
    </div>
  )
}

export default App