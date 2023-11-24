import { useContext, useState } from "react";
import "./Pomodoro.css";
import { KshManagerContext } from "../KshManager";
import { pad } from "../importantFunctions";
import log from "../log";

export default function Pomodoro() {
	const ksh = useContext(KshManagerContext);
	const [goal, setGoal] = useState("");
	const placeholderGoal = "Hausaufgaben";
	const [durationHour, setDurationHour] = useState("");
	const [durationMinute, setDurationMinute] = useState("");
	const [durationSecond, setDurationSecond] = useState("");
  const [breakDurationHour, setBreakDurationHour] = useState("");
  const [breakDurationMinute, setBreakDurationMinute] = useState("");
  const [breakDurationSecond, setBreakDurationSecond] = useState("");
  const [repeatAmount, setRepeatAmount] = useState("");
	const [musik, setMusik] = useState(true);


  function handleBooleanClick(e) {
    var checkbox = document.getElementById('myCheckbox');
    checkbox.checked = !checkbox.checked;
    // unfocus the button
    e.target.blur();
    setMusik(!musik)
  }

	return (
		<div className="pomodoro box">
			<div className="title">Pomodoro Timer</div>
			<div className="pomodoro setting">
				Dein Ziel
				<div className="pomodoro input">
					<input tabIndex={1} type="text" placeholder={placeholderGoal} value={goal} onChange={(e) => setGoal(e.target.value)} className="pomodoro input-goal" />
				</div>
			</div>

			<div className="pomodoro setting">
				Dauer
        <div className="pomodoro input">
          <div className="pomodoro time">
            <input type="number" min="0" placeholder="Std" value={durationHour.length === 0 ? durationHour : pad(durationHour)} onChange={(e) => setDurationHour(e.target.value)} className="pomodoro number-input" />
            <input type="number" min="0" placeholder="Min" max="59" value={durationMinute.length === 0 ? durationMinute : pad(durationMinute)} onChange={(e) => setDurationMinute(e.target.value)} onFocus={() => {if (durationMinute === "") setDurationMinute(25)}} className="pomodoro number-input" />
            <input type="number" min="1" placeholder="Sek" max="59" value={durationSecond.length === 0 ? durationSecond : pad(durationSecond)} onChange={(e) => setDurationSecond(e.target.value)} className="pomodoro number-input" />
          </div>
        </div>
			</div>

      <div className="pomodoro setting">
				Pausendauer
        <div className="pomodoro input">
          <div className="pomodoro time">
            <input type="number" min="0" placeholder="Std" value={breakDurationHour.length === 0 ? breakDurationHour : pad(breakDurationHour)} onChange={(e) => setBreakDurationHour(e.target.value)} className="pomodoro number-input" />
            <input type="number" min="0" placeholder="Min" max="59" value={breakDurationMinute.length === 0 ? breakDurationMinute : pad(breakDurationMinute)} onChange={(e) => setBreakDurationMinute(e.target.value)} onFocus={() => {if (breakDurationMinute === "") setBreakDurationMinute(5)}} className="pomodoro number-input" />
            <input type="number" min="1" placeholder="Sek" max="59" value={breakDurationSecond.length === 0 ? breakDurationSecond : pad(breakDurationSecond)} onChange={(e) => setBreakDurationSecond(e.target.value)} className="pomodoro number-input" />
          </div>
        </div>
			</div>

      <div className="pomodoro setting">
        Iterationen
        <div className="pomodoro input">
          <input type="number" min="0" placeholder="0" value={repeatAmount} onChange={(e) => setRepeatAmount(e.target.value)} className="pomodoro number-input" />
        </div>
      </div>

			{/* <div className="pomodoro setting">
        Musik
        <label style={{position: 'relative'}}>
          <input type="checkbox" className="pomodoro boolean-input hidden" id="myCheckbox" defaultChecked/>
          <input type="text" placeholder={musik ? '': 'Nein'} value={musik ? 'Ja':''} className="pomodoro number-input" tabIndex={-1} onClick={handleBooleanClick} readOnly/>
        </label>
			</div> */}

			<button
        href=""
				className="select"
				onClick={() => {
					ksh.startPomodoro({
						goal: goal || placeholderGoal,
						// if all duration inputs are empty, return 25 mins
						duration: durationHour.length === 0 && durationMinute.length === 0 && durationSecond.length === 0 ? 1500 : durationHour * 3600 + durationMinute * 60 + durationSecond * 1,
            breakDuration: breakDurationHour.length === 0 && breakDurationMinute.length === 0 && breakDurationSecond.length === 0 ? 300 : breakDurationHour * 3600 + breakDurationMinute * 60 + breakDurationSecond * 1,
            repeatAmount: repeatAmount.length === 0 ? 0 : parseInt(repeatAmount),
            musik: musik,
          });
				}}>
				Starten
			</button>
		</div>
	);
}