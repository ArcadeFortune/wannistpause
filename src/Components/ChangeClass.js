import React, { useContext, useState } from 'react';
import './ChangeClass.css';
import { KshManagerContext } from '../KshManager';
import log from '../log';

export default function ChangeClass() {
  const ksh = useContext(KshManagerContext)
  const originalOption = ksh.currentClass; // this is the option that was selected when the modal was opened
  const [selectedOption, setSelectedOption] = useState(ksh.currentClass);
  const options = ksh.everyClass;

  return (
    <>
        <div className={`change-class title`}>Klasse wechseln</div>
        <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} className='change-class-select'>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={`change-class save-button select`} onClick={() => {ksh.setModalContent(''); log('saving', selectedOption); ksh.saveCurrentClass(selectedOption); ksh.handleChangeClassClick()}}><span className='select-text'>Speichern</span></div>
  </>
  );
}


