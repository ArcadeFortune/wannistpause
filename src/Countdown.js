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
  let prevEnd = null;
  let nextStart = null;
  let prevInterval = null;
  let found = false;

  for (let i = 0; i < everyTimeStamp.length; i++) {
    const interval = everyTimeStamp[i];
    const [start, end] = interval.trim().split(' - ').map(t => moment(t, 'HH:mm'));

    if (found) {
      // console.log({ current: prevInterval, next: { start, end } })
      return { current: prevInterval };
    }

    // Check if currentTime is between the end of the previous interval and the start of the current.
    if (prevEnd && currentTime.isBetween(prevEnd, start, null, '[)')) {
      nextStart = start; // The start of the next interval after the gap.
      break; // We found the gap, break the loop.
    }

    // Check if currentTime is within the current interval.
    if (currentTime.isBetween(start, end, null, '[)')) {
      found = true;
      prevInterval = { start, end };
    }

    // Update prevEnd for the next iteration to check gaps.
    prevEnd = end;
  }

  // check if the current time is after the last interval
  if (found && !nextStart) {
    console.log('is after the last interval')
    return { current: prevInterval, next: null };
  }

  // does not work
  // check if the current time is before the first interval
  // if (!found && !prevEnd) {
  //   console.log('is before the first interval')
  //   return { current: null, next: null, gap: { after: nextStart } };
  // }

  
  // If currentTime falls within a gap, return the gap information.
  if (nextStart) {
    // console.log({ current: { start: prevEnd, end: nextStart }, next: { start: nextStart }, gap: { before: prevEnd, after: nextStart } })
    return { current: { start: prevEnd, end: nextStart } };
  }

  // If no conditions met, currentTime is not within any intervals or gaps.
  return 0;
}


const CountdownComponent = ({everyTimeStamp}) => {
  const [totalDuration, setTotalDuration] = useState(null); // either 45 minutes or 10 minutes
  const [activeInterval, setActiveInterval] = useState(null); // get the two timestamps of the current interval
  const [remainingTime, setRemainingTime] = useState(null); // remaining time of the current interval [seconds]
  const [timerFinished, setTimerFinished] = useState(false); // to procc the confetti
  const [a, setA] = useState(0); // to refresh the useState

  useEffect(() => {
    if (everyTimeStamp.length === 0) return; // needs to load data
    const currentTime = moment('08:39:55', 'HH:mm:ss') // for testing
    // const currentTime = moment(); // sets current time
    setActiveInterval(getActiveInterval(currentTime, everyTimeStamp)); // finds current interval

    if (!activeInterval)  { 
      if (a > 5) setA((prevA) => prevA + 1);
      return;
    } // needs to refresh setState

    setTotalDuration(activeInterval.current.end.diff(activeInterval.current.start, 'seconds')) // sets the duration of the current interval either 45 minutes or 10 minutes
    setRemainingTime(activeInterval.current.end.diff(currentTime, 'seconds')) // sets the remaining time of the current interval
  }, [everyTimeStamp, timerFinished, a]);

  if (everyTimeStamp.length === 0) return <div>Intranet laden...</div>;
  if (activeInterval === 0) return <div>Kein Unterricht!</div>; // badly solved
  console.log('totalDuration:', totalDuration/60, 'minutes') 
  if (!totalDuration) return <div>Zeit rechnen...</div>;
  if (!activeInterval) return <div>Kein Unterricht!</div>;

  const handleComplete = () => {
    console.log('finished!')

    setTimerFinished(true)    
    setTimeout(() => {
      setTimerFinished(false);
    }, 4000); // confetti refresh

    return { shouldRepeat: true }
  };

  return (
    <>
      {timerFinished && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} />}
      <div className='countdown'>
        <CountdownCircleTimer
          isPlaying
          strokeWidth={30}
          size={300}
          colors={["#A30000", "#ff2626", "#F7B801", "#00d619", "#00d619"]}
          colorsTime={[2700*0.87, 2700*0.75, 2700*0.5, 2700*0.25, 0]}
                  
          duration={totalDuration}
          initialRemainingTime={remainingTime}
          // initialRemainingTime={5} // for testing
          onComplete={handleComplete}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default CountdownComponent;
