/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import './Countdown.css';
import Confetti from 'react-confetti'
import { renderTime } from '../importantFunctions';
import { KshManagerContext } from '../KshManager';
import log from '../log';


const CountdownComponent = ({ className }) => {
  const ksh = useContext(KshManagerContext);

  useEffect(() => {
    log('Intranet laden...')
    if (!ksh.isKSHLoaded()) {
      log('Noch keine Daten.')
      return;
    } // needs to load data
    log('Intranet erfolgreich geladen!')

    ksh.configureTimer();
  }, [ksh.timeStamps, ksh.currentClass, ksh.refreshTimer]);


  if (!ksh.isKSHLoaded()) return <div>Intranet laden...</div>;
  if (!ksh.isActiveInterval()) return <><div className='countdown'>Kein Unterricht!</div><Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={700} /></>;

  return (
    <>
      {ksh.timerFinished && document.hasFocus()&& <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
       
      <div key={ksh.timerKey} className={`${className} countdown`}>
        <CountdownCircleTimer
          key={ksh.timerKey}
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
        {ksh.pomodoro.isRunning && (
          <>
            <div className='title'>Pomodoro Timer</div>
            <div className='pomodoro subtitle'>- {ksh.pomodoro.goal} -</div>
            <span className='pomodoro'>Musik</span>
            {ksh.YTPlayerRef.current && ksh.YTPlayerRef.current.G && <span key={ksh.YTKey} className='pomodoro information'>{ksh.YTPlayerRef.current.getVideoData().title}</span>}
          </>
        )}
        {!ksh.pomodoro.isRunning && (
          <>
            <div className='currentClass'>Klasse: <br></br><span className='currentSelectedClass information'>{ksh.currentClass}</span></div>
            <div className='nextSubject'>Nächstes Fach: <br></br><span className='subject information'>{ksh.nextSubject.subject}{ksh.nextSubject.room && <span>, {ksh.nextSubject.room}</span>} </span></div>
          </>
        )}
      </div>        
    </>
  );
}

export default CountdownComponent;
