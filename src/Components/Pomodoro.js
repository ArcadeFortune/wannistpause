import { useContext, useState } from 'react';
import './Pomodoro.css';
import { KshManagerContext } from '../KshManager';
import { pad } from '../importantFunctions';

export default function Pomodoro() {
  const ksh = useContext(KshManagerContext)
  const [goal, setGoal] = useState('')
  const placeholderGoal = 'Hausaufgaben'
  const [durationHour, setDurationHour] = useState('')
  const [durationMinute, setDurationMinute] = useState('')
  const [durationSecond, setDurationSecond] = useState('')
  const [musik , setMusik] = useState(false)

  return (
    <div className='pomodoro box'>
      <div className='title'>Pomodoro Timer</div>
      <div className='pomodoro setting'>
        <div className='pomodoro label'>Dein Ziel</div>
        <div className='pomodoro input'>
          <input type='text' placeholder={placeholderGoal} value={goal} onChange={e => setGoal(e.target.value)} className='pomodoro input-goal' />
        </div>
      </div>

      <div className='pomodoro setting'>
        <div>Dauer</div>
        <div className='pomodoro time'>
          <input type='number' min="0" placeholder="Std" value={durationHour.length === 0 ? durationHour : pad(durationHour)} onChange={e => setDurationHour(e.target.value)} className='pomodoro number-input' />
          <input type='number' min="1" placeholder="Min" max="59" value={durationMinute.length === 0 ? durationMinute : pad(durationMinute)} onChange={e => setDurationMinute(e.target.value)} className='pomodoro number-input' />
          <input type='number' min="1" placeholder="Sek" max="59" value={durationSecond.length === 0 ? durationSecond : pad(durationSecond)} onChange={e => setDurationSecond(e.target.value)} className='pomodoro number-input' />
        </div>
      </div>

      <div className='pomodoro setting'>
        <div>Musik</div>
        <div className='pomodoro input'>
          <input type='checkbox' />
        </div>
      </div>

      <div className='pomodoro setting'>
        <div>Musik</div>
        <div className='pomodoro input'>
          <input className={`pomodoro input-boolean${musik ? ' true' : ' false'}`}/>
          <input className={`pomodoro input-boolean${!musik ? ' true' : ' false'}`}/>
        </div>
      </div>

      <div>dauer pause</div>
      <div>auto neustart yes no</div>
      <div>wie oft?</div>
      {/* if goal is empty, use placeholder */}
      <div className='select' onClick={() => {ksh.startPomodoro({
        goal: goal || placeholderGoal,
        // if all duration inputs are empty, return 25 mins
        duration: (durationHour.length === 0 && durationMinute.length === 0 && durationSecond.length === 0) ? 1500 : (durationHour * 3600) + (durationMinute * 60) + (durationSecond * 1),
        })}}>Starten</div>
    </div>
  )
}