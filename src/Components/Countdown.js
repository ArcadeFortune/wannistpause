/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Countdown.css';
import Confetti from 'react-confetti'
import { renderTime } from '../importantFunctions';
import { KshManagerContext } from '../KshManager';


const CountdownComponent = ({ className }) => {
  const ksh = useContext(KshManagerContext);

  useEffect(() => {
    if (!ksh.isKSHLoaded()) {
      return;
    } // needs to load data

    ksh.configureTimer();
  }, [ksh.timeStamps, ksh.settings.currentClass.value, ksh.settings.teacherView.value, ksh.refreshTimer]);


  if (!ksh.isKSHLoaded()) return <div>Intranet laden...</div>;
  if (!ksh.isActiveInterval() && !ksh.pomodoro.isRunning) return <><div className='countdown'>Kein Unterricht!</div><Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} /></>;

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
            {ksh.pomodoro.musik && !ksh.isBreakTime && ( 
              <>
                <span className='pomodoro'>Musik</span>
                {ksh.YTPlayerRef.current && ksh.YTPlayerRef.current.G && (
                  <span key={ksh.YTKey} className='pomodoro information'>{ksh.YTPlayerRef.current.getVideoData().title || 'Laden...'}</span>
                )}
              </>
            )}
          </>
        )}

        {!ksh.pomodoro.isRunning && (
          <>
            <div className='currentClass'>{ksh.settings.teacherView.value ? 'Lehrer' : 'Klasse'}: <br></br><span className='currentSelectedClass information'>{ksh.settings.currentClass.value}</span></div>
            <div className='nextSubject'>Nächstes Fach: <br></br><span className='subject information'>{ksh.nextSubject.subject}{ksh.nextSubject.room && <span>, {ksh.nextSubject.room}</span>} </span></div>
          </>
        )}
      </div>        
    </>
  );
}

export default CountdownComponent;
