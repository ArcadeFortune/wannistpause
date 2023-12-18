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
      
{/*       
        <div className="settings row">
          Autospeichern
          <div className='settings options'>
            <Input type='checkbox' value={ksh.autoSave} setValue={ksh.setAutoSave} className='settings checkbox' />
          </div>
        </div>

        <div className="settings row">
          Lehrermodus
          <div className='settings options'>
            <Input type='checkbox' value={ksh.contextMenu} setValue={ksh.setContextMenu} className='settings checkbox' />
          </div>
        </div>

        <div className="settings row">
          Spezieller Rechts-Click-Menü
          <div className='settings options'>
            <Input type='checkbox' value={ksh.contextMenu} setValue={ksh.setContextMenu} />
          </div>
        </div>

        <div className="settings row">
          YouTube Playlist
          <div className='settings options'>
            <Input type='text' value={ksh.YTURL} setValue={ksh.setYTURL} placeholder={'www.youtube.com/...'} />
          </div>
        </div> */}

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
