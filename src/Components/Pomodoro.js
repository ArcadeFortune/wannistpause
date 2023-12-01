import { useContext, useState } from "react";
import "./Pomodoro.css";
import { KshManagerContext } from "../KshManager";
import Input from "../Components/Input";

export default function Pomodoro() {
	const ksh = useContext(KshManagerContext);
	const [goal, setGoal] = useState("");
	const [durationHour, setDurationHour] = useState("");
	const [durationMinute, setDurationMinute] = useState("");
	const [durationSecond, setDurationSecond] = useState("");
  const [breakDurationHour, setBreakDurationHour] = useState("");
  const [breakDurationMinute, setBreakDurationMinute] = useState("");
  const [breakDurationSecond, setBreakDurationSecond] = useState("");
  const [repeatAmount, setRepeatAmount] = useState("");
	const [musik, setMusik] = useState(false);


	return (
		<div className="pomodoro box">
			<div className="title">Pomodoro Timer</div>
			<div className="pomodoro setting">
				Dein Ziel
				<div className="pomodoro input">
          <Input type='text' value={goal} setValue={setGoal} placeholder={'z.B. Hausaufgaben'}/>
				</div>
			</div>

			<div className="pomodoro setting">
				Dauer
        <div className="pomodoro input">
          <div className="pomodoro time">
            <Input type='number' min="0" placeholder="Std" value={durationHour} setValue={setDurationHour} className={'pomodoro number-input'}/>
            <Input type='number' min="0" placeholder="Min" max="59" value={durationMinute} setValue={setDurationMinute} className={'pomodoro number-input'} defaultValue={25}/>
            <Input type='number' min="1" placeholder="Sek" max="59" value={durationSecond} setValue={setDurationSecond} className={'pomodoro number-input'}/>
          </div>
        </div>
			</div>

      <div className="pomodoro setting">
				Pausendauer
        <div className="pomodoro input">
          <div className="pomodoro time">
            <Input type='number' min="0" placeholder="Std" value={breakDurationHour} setValue={setBreakDurationHour} className={'pomodoro number-input'}/>
            <Input type='number' min="0" placeholder="Min" max="59" value={breakDurationMinute} setValue={setBreakDurationMinute} className={'pomodoro number-input'} defaultValue={5}/>
            <Input type='number' min="1" placeholder="Sek" max="59" value={breakDurationSecond} setValue={setBreakDurationSecond} className={'pomodoro number-input'}/>
          </div>
        </div>
			</div>

      <div className="pomodoro setting">
        Iterationen
        <div className="pomodoro input">
          <Input type='number' min="0" max="99999" value={repeatAmount} setValue={setRepeatAmount} placeholder="0"/>
        </div>
      </div>

			<div className="pomodoro setting">
        Musik
        <div className="pomodoro input">
          <Input type='checkbox' value={musik} setValue={setMusik}/>
        </div>
			</div>

			<button
        href=""
				className="select"
				onClick={() => {
					ksh.startPomodoro({
						goal: goal || 'Hausaufgaben',
						// if all duration inputs are empty, return 25 mins
						duration: (durationHour.length === 0 || parseInt(durationHour) === 0) && (durationMinute.length === 0 || parseInt(durationMinute) === 0) && (durationSecond.length === 0 || parseInt(durationSecond) === 0) ? 1500 : durationHour * 3600 + durationMinute * 60 + durationSecond * 1,
            breakDuration: (breakDurationHour.length === 0 || parseInt(breakDurationHour) === 0) && (breakDurationMinute.length === 0 || parseInt(breakDurationMinute) === 0) && (breakDurationSecond.length === 0 || parseInt(breakDurationSecond) === 0) ? 300 : breakDurationHour * 3600 + breakDurationMinute * 60 + breakDurationSecond * 1,
            repeatAmount: repeatAmount.length === 0 ? 0 : parseInt(repeatAmount),
            musik: musik,
          });
				}}>
				Starten
			</button>
		</div>
	);
}
