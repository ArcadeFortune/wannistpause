import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'

function getActiveInterval(currentTime, everyTimeStamp) {
  for (const interval of everyTimeStamp) {
    const [start, end] = interval.trim().split(' - ').map(t => moment(t, 'HH:mm'));
    if (currentTime.isBetween(start, end, null, '[)')) {
      return { start, end };
    }
  }
  return null;
}

const CountdownComponent = ({everyTimeStamp}) => {
  const [timerFinished, setTimerFinished] = useState(false);
  // const currentTime = moment()
  const currentTime = moment('08:29', 'HH:mm')
  const activeInterval = getActiveInterval(currentTime, everyTimeStamp);
  if (!activeInterval) return (<div>Kein Unterricht</div>);

  const durationInSeconds = activeInterval.end.diff(currentTime, 'seconds');
  return (
    <>
    <CountdownCircleTimer
      isPlaying
      strokeWidth={30}
      size={300}
      colors={["#A30000", "#ff2626", "#F7B801", "#00d619", "#00d619"]}
      colorsTime={[2700*0.87, 2700*0.75, 2700*0.5, 2700*0.25, 0]}
      
      duration={2700}
      initialRemainingTime={durationInSeconds}
      onComplete={() => setTimerFinished(true)}
    >
      {renderTime}
    </CountdownCircleTimer>

    {timerFinished && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} />}
    </>
  );
}

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Pause!</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{moment.utc(remainingTime*1000).format('mm:ss')}</div>
      <div className="text">minutes</div>
    </div>
  );
};

export default CountdownComponent;