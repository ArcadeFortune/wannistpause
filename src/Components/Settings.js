import './Settings.css';
import Input from './Input';
import { useContext } from 'react';
import { KshManagerContext } from '../KshManager';


export default function Settings() {
  const ksh = useContext(KshManagerContext);

  return (
    <div className='settings'>
      <div className="settings title">Einstellungen</div>
      <br />
      <div className="settings content">
    {console.log(ksh.settings)}
      {
      Object.keys(ksh.settings).map((settingId) => (
        // ksh.settings.map((setting, index) => (
          <div key={settingId} className="settings row">
          {ksh.settings[settingId].viewName}
          <div className='settings options'>
            <Input type={ksh.settings[settingId].type} value={ksh.settings[settingId].value} setValue={ksh.setSettings} valueId={settingId}/>
          </div>
        </div>
      ))}

        <div className="settings divider"></div>

        <div className="settings row">
          Einstellungen zurücksetzen
          <div className='settings options'>
            <Input type='checkbox' value={''} setValue={() => { localStorage.clear(); window.location.href = '/'; }} className={'fatal'} />
          </div>
        </div>

        <button
          href=""
          className="select"
          onClick={() => {
            ksh.navigate('/settings')
          }}>
          Okay
        </button>
      </div>
    </div>
  )
}
