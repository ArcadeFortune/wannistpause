import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'


function renderTime ({ remainingTime }) {
  if (remainingTime === 0) return <div className="timer">Pause!</div>;

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{moment.utc(remainingTime*1000).format('mm:ss')}</div>
      <div className="text">minutes</div>
    </div>
  );
};


function getActiveInterval(currentTime, everyTimeStamp) {
  let prevInterval = null;
  let found = false;
  for (const interval of everyTimeStamp) {
    const [start, end] = interval.trim().split(' - ').map(t => moment(t, 'HH:mm'));

    if (found) {
      return { current: prevInterval.current, next: { start, end } };
    }

    if (currentTime.isBetween(start, end, null, '[)')) {
      found = true;
      prevInterval = { current: { start, end }, next: null };
    }
  }

  return null;
}


const CountdownComponent = ({everyTimeStamp}) => {
  const [totalDuration, setTotalDuration] = useState(2700);  
  const [timerFinished, setTimerFinished] = useState(false);
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (timerFinished) {
      setTimeout(() => {
        setTimerFinished(false);
      }, 4000);
    }
  }, [totalDuration]);

  const handleComplete = () => {
    console.log('finished!')
    setTimerFinished(true)
    setKey((prevKey) => prevKey + 1)
    setTotalDuration((maxDuration) => maxDuration + 1)
  };
  
  const currentTime = moment('08:29', 'HH:mm')
  // const currentTime = moment()  
  
  var activeInterval = getActiveInterval(currentTime, everyTimeStamp);

  if (everyTimeStamp.length === 0) return <div>Loading...</div>;
  if (!activeInterval) return <div>Kein Unterricht!</div>;

  const durationInSeconds = activeInterval.current.end.diff(currentTime, 'seconds');
  

  return (
    <>
    <CountdownCircleTimer
      isPlaying
      strokeWidth={30}
      size={300}
      colors={["#A30000", "#ff2626", "#F7B801", "#00d619", "#00d619"]}
      colorsTime={[2700*0.87, 2700*0.75, 2700*0.5, 2700*0.25, 0]}
      
      key={key}
      duration={totalDuration}
      initialRemainingTime={durationInSeconds}
      // initialRemainingTime={5}
      onComplete={handleComplete}
    >
      {renderTime}
    </CountdownCircleTimer>

    {timerFinished && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} />}
    </>
  );
}

export default CountdownComponent;
