import React, { useContext } from 'react';
import './ChangeClass.css';
import { KshManagerContext } from '../KshManager';
import Input from './Input';

export default function ChangeClass() {
  const ksh = useContext(KshManagerContext)
  const options = ksh.settings.teacherView.value ? Object.keys(ksh.todaysSubjectsTeacher) : ksh.everyClass;
  if (!ksh.isKSHLoaded()) return <div>Intranet laden...</div>;
  
  return (
    <div className='change-class box'>
      <div className='change-class title'>Wähle deine Klasse</div>
      <Input type='select' value={ksh.settings.currentClass.value} setValue={ksh.setSettings} valueId='currentClass' options={options} className='change-class-select'/>

      {/* <div className='change-class save-button select' onClick={() => {ksh.navigate('/'); log('saving', selectedOption); ksh.setCurrentClass(selectedOption);}}><span className='select-text'>Speichern</span></div> */}
    </div>
  );
}
