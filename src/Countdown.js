import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'
import { getActiveInterval, getNextSubject, renderTime } from './importantFunctions';


const CountdownComponent = ({ksh, setBreakTime}) => {
  const [activeInterval, setActiveInterval] = useState(0); // get the two timestamps of the current interval (in moment object)
  const [totalDuration, setTotalDuration] = useState(null); // either 45 minutes or 10 minutes
  const [remainingTime, setRemainingTime] = useState(null); // remaining time of the current interval [seconds]
  const [timerFinished, setTimerFinished] = useState(false); // to procc the confetti
  const [nextSubject, setNextSubject] = useState({subject: "dummy subject", room: '100'}); // to display the next subject
  useEffect(() => {

    console.log('Intranet laden...')
    if (Object.keys(ksh).length === 0) {
      console.log('Noch keine Daten.')
      return;
    } // needs to load data
    console.log('Intranet erfolgreich geladen!')

    const currentTime = process.env.NODE_ENV === 'development' ? moment('08:39:55', 'HH:mm:ss') : moment();// for testing
    console.log('Zurzeit ist es:', currentTime.format('HH:mm:ss'))

    setActiveInterval(getActiveInterval(currentTime, ksh.timestamps)); // finds current interval
    const actvIntvl = getActiveInterval(currentTime, ksh.timestamps); // useEffect() does not save variables changed with setState().
    if (actvIntvl === 0) {console.log('kei Schuel!'); return}; // 0 means it is outside of the timetable
    setBreakTime(actvIntvl.breakTime); // is it breaktime?
    console.log('Dies ist zwischen:', actvIntvl.current.start.format('HH:mm:ss'), '-', actvIntvl.current.end.format('HH:mm:ss'))

    setTotalDuration(actvIntvl.current.end.diff(actvIntvl.current.start, 'seconds')) // sets the duration of the current interval either 45 minutes or 10 minutes
    console.log('Das dauert genau:', actvIntvl.current.end.diff(actvIntvl.current.start, 'seconds'), 'Sekunden')

    setRemainingTime(actvIntvl.current.end.diff(currentTime, 'seconds')) // sets the remaining time of the current interval
    console.log('Es bleiben noch:', actvIntvl.current.end.diff(currentTime, 'seconds'), 'Sekunden')

    setNextSubject(getNextSubject(actvIntvl.timeIndex, ksh.timestamps, ksh.everyClass, 'I3a')) // sets the next subject
    console.log('Die nächste Lektion ist:', getNextSubject(actvIntvl.timeIndex, ksh.timestamps, ksh.everyClass, 'I3a').subject, getNextSubject(actvIntvl.timeIndex, ksh.timestamps, ksh.everyClass, 'I3a').room ? ', im Raum: ' + getNextSubject(actvIntvl.timeIndex, ksh.timestamps, ksh.everyClass, 'I3a').room : '')
  }, [ksh]);

  const handleComplete = () => {
    console.log('finished!')
    console.log('Die Jetztige Zeit ist nun:', moment().format('HH:mm:ss'))

    setTimerFinished(true)    
    setTimeout(() => {
      setTimerFinished(false);
    }, 4000); // confetti refresh

    return { shouldRepeat: true }
  };

  if (Object.keys(ksh).length === 0) return <div>Intranet laden...</div>;
  if (activeInterval === 0) return <><div className='countdown'>Kein Unterricht!</div><Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} /></>;

  return (
    <>
      

      {timerFinished && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} />}

      {<div className='countdown'>
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
        <div className='nextSubject'>Nächstes Fach: <br></br><span className='subject'>{nextSubject.subject}{nextSubject.room && <span>, {nextSubject.room}</span>} </span></div>
      </div>}        
    </>
  );
}

export default CountdownComponent;
