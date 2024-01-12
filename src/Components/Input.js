import { useRef } from "react";
import  "./Input.css";
import { pad } from "../importantFunctions";


export default function Input({ type, value, setValue, defaultValue, valueId, options, className, placeholder, min, max }) {
  const booleanRef = useRef(null)

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
        <input type="text" placeholder={value ? '': 'Nein'} value={value ? 'Ja':''} className={`boolean-input ${className}`} tabIndex={-1} onClick={handleBooleanClick} readOnly/>
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
      <select tabIndex={1} value={value} onChange={(e) => {setValue(e.target.value, valueId)}} className={`select-input ${className}`}>
        {options.map(option => (
          <option key={option} value={option}>
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