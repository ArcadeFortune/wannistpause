import React, { useState, useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'
import { getActiveInterval, getNextSubject, renderTime } from '../importantFunctions';
import { KshManagerContext } from '../KshManager';


const CountdownComponent = ({ className }) => {
  const ksh = useContext(KshManagerContext);

  useEffect(() => {
    console.log('Intranet laden...')
    if (!ksh.isKSHLoaded()) {
      console.log('Noch keine Daten.')
      return;
    } // needs to load data
    console.log('Intranet erfolgreich geladen!')

    const currentTime = process.env.NODE_ENV === 'development' ? moment('08:39:55', 'HH:mm:ss') : moment();// for testing
    console.log('Zurzeit ist es:', currentTime.format('HH:mm:ss'))

    ksh.configureTimer(currentTime);
  }, [ksh.timeStamps, ksh.currentClass]);


  if (!ksh.isKSHLoaded()) return <div>Intranet laden...</div>;
  if (!ksh.isActiveInterval()) return <><div className='countdown'>Kein Unterricht!</div><Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} /></>;

  return (
    <>
      {ksh.timerFinished && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} />}
      {<div className={`${className} countdown`}>
        <CountdownCircleTimer
          isPlaying
          strokeWidth={30}
          size={300}
          colors={["#A30000", "#ff2626", "#F7B801", "#00d619", "#00d619"]}
          colorsTime={[2700*0.87, 2700*0.75, 2700*0.5, 2700*0.25, 0]}

          duration={ksh.totalDuration}
          initialRemainingTime={ksh.remainingTime}
          onComplete={ksh.handleTimerComplete}
        >
          {renderTime}
        </CountdownCircleTimer>
        <div className='nextSubject'>Nächstes Fach: <br></br><span className='subject'>{ksh.nextSubject.subject}{ksh.nextSubject.room && <span>, {ksh.nextSubject.room}</span>} </span></div>
      </div>}        
    </>
  );
}

export default CountdownComponent;
