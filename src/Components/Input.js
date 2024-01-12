import { useRef } from "react";
import  "./Input.css";
import { pad } from "../importantFunctions";


export default function Input({ type, value, setValue, defaultValue, valueId, specialAction, options, optionsValueCounter, className, placeholder, min, max }) {
  const booleanRef = useRef(null)

  if (!specialAction) specialAction = () => {};

  function handleBooleanClick(e) {
    if (booleanRef.current) {
      booleanRef.current.checked = !booleanRef.current.checked;
    }

    // unfocus the button
    e.target.blur();
    setValue(!value, valueId)
  }

  if (type === 'checkbox') {
    return (
      <label style={{position: 'relative'}}>
        <input type="checkbox" ref={booleanRef} className="pomodoro boolean-input-hidden" id="myCheckbox" onChange={() => {console.log(value); setValue(!value, valueId)}} defaultChecked={value}/>
        <input type="text" placeholder={value ? '': 'Nein'} value={value ? 'Ja':''} className={`boolean-input ${className}`} tabIndex={-1} onClick={(e) => {handleBooleanClick(e); specialAction()}} readOnly/>
      </label>
    )
  }

  if (type === 'text') {
    return (
      <input tabIndex={1} type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value, valueId)} className={`text-input ${className}`} />    
    )
  }

  if (type === 'select') {
    return (
      <select tabIndex={1} value={value} onChange={(e) => setValue(optionsValueCounter ? parseInt(e.target.value) : e.target.value, valueId)} className={`select-input ${className}`}>
        {options.map((option, index) => (
          <option key={option} value={optionsValueCounter ? index : option}> {/* doing parseInt() here instead does NOTHING */}
            {option}
          </option>
        ))}
      </select>
    )
  }

  if (type === 'number') {
    return (
      <input tabIndex={1} type="number" min={min || 0} max={max || 99999} placeholder={placeholder} value={!value ? ' ' : value.length === 0 ? value : pad(value)} onChange={(e) => setValue(e.target.value, valueId)} className={`number-input ${className}`} onFocus={() => {if (value === "") setValue(defaultValue)}}/>    
    )
  }

  // default
  return (
    <div>no correct type defined</div>
  )
}