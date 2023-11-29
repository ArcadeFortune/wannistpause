import './Settings.css';
import Input from './Input';
import { useContext } from 'react';
import { KshManagerContext } from '../KshManager';


export default function Settings() {
  const ksh = useContext(KshManagerContext);

  return (
    <div className='settings'>
      <div className="settings title">Einstellungen</div>
      <div className="settings content">
        <div className="settings row">
          Autospeichern
          <div className='settings options'>
            <Input value={ksh.autoSave} setValue={ksh.setAutoSave} type='checkbox' className='settings checkbox'/>
          </div>
        </div>
        <button
        href=""
				className="select"
				onClick={() => {
          ksh.setSubMenuContent('settings')
        }}>
				Okay
			</button>
      </div>
    </div>
  )
}