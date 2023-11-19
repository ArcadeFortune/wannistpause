import React, { useContext, useState } from 'react';
import './ChangeClass.css';
import { CrossMark } from '../SVGs/CrossMark';
import { KshManagerContext } from '../KshManager';
import log from '../log';

export default function ChangeClass({ options }) {
  const ksh = useContext(KshManagerContext)
  const originalOption = ksh.currentClass; // this is the option that was selected when the modal was opened
  const [selectedOption, setSelectedOption] = useState(ksh.currentClass);

  return (
    <div className={`change-class ${ksh.isChangeClassOpen ? 'open' : 'close'}`}>
      <div className={`${ksh.isChangeClassOpen ? 'open' : 'close'} change-class overlay`} onClick={() => {if (ksh.isChangeClassOpen) {log('Schliesse mit Klasse:', originalOption); ksh.saveCurrentClass(originalOption); setSelectedOption(originalOption); ksh.handleChangeClassClick()}log('why u spamclicking like that')}}></div>
      <div className={`${ksh.isChangeClassOpen ? 'open' : 'close'} change-class modal`}>
      <div className={`${ksh.isChangeClassOpen ? 'open' : 'close'} change-class close-button`} onClick={() => {log('Schliesse mit Klasse:', originalOption); ksh.saveCurrentClass(originalOption); setSelectedOption(originalOption); ksh.handleChangeClassClick()}}>x</div>
        <div className={`${ksh.isChangeClassOpen ? 'open' : 'close'} change-class title`}>Klasse wechseln</div>
        <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} className='change-class-select'>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={`${ksh.isChangeClassOpen ? 'open' : 'close'} change-class save-button select`} onClick={() => { log('saving', selectedOption); ksh.saveCurrentClass(selectedOption); ksh.handleChangeClassClick()}}><span className='select-text'>Speichern</span></div>
      </div>
    </div>
  );
}


