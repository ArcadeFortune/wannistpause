import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'
import { getActiveInterval, renderTime } from './importantFunctions';


const CountdownComponent = ({everyTimeStamp}) => {
  const [totalDuration, setTotalDuration] = useState(null); // either 45 minutes or 10 minutes
  const [activeInterval, setActiveInterval] = useState(null); // get the two timestamps of the current interval
  const [remainingTime, setRemainingTime] = useState(null); // remaining time of the current interval [seconds]
  const [timerFinished, setTimerFinished] = useState(false); // to procc the confetti
  const [nextSubject, setNextSubject] = useState('dummy subject'); // to display the next subject
  const [a, setA] = useState(0); // to refresh the useState

  useEffect(() => {
    if (everyTimeStamp.length === 0) return; // needs to load data
    // const currentTime = moment('08:35:55', 'HH:mm:ss') // for testing
    const currentTime = moment(); // sets current time
    setActiveInterval(getActiveInterval(currentTime, everyTimeStamp)); // finds current interval

    if (!activeInterval) { 
      if (a < 5) setA((prevA) => prevA + 1);
      return;
    } // needs to refresh setState

    setTotalDuration(activeInterval.current.end.diff(activeInterval.current.start, 'seconds')) // sets the duration of the current interval either 45 minutes or 10 minutes
    setRemainingTime(activeInterval.current.end.diff(currentTime, 'seconds')) // sets the remaining time of the current interval
  }, [everyTimeStamp, timerFinished, a]);

  if (everyTimeStamp.length === 0) return <div>Intranet laden...</div>;
  if (activeInterval === 0) return <div className='countdown'>Kein Unterricht!</div>; // badly solved
  if (!totalDuration) return <div>Zeit rechnen...</div>;
  if (!activeInterval) return <div className='countdown'>Kein Unterricht!</div>;

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
          onComplete={handleComplete}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default CountdownComponent;
