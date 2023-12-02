import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import './Modal.css';

import ChangeClass from "../Components/ChangeClass";
import Pomodoro from "../Components/Pomodoro";

export default function Modal({content}) {  
  const ksh = useContext(KshManagerContext)
  
  return (
    <div className={`${content.length !== 0 ? 'open ' : 'close '}modal`}>
      <div className={`${content.length !== 0 ? 'open ' : 'close '}modal overlay`} onClick={() => {ksh.navigate('/')}}></div>
      <div className={`${content.length !== 0 ? 'open ' : 'close '}modal box`}>
        <div className='modal close-button' onClick={() => {ksh.navigate('/')}}>x</div>
        <ModalContent modalContent={content}/>
      </div>
    </div>
  )
}

function ModalContent({modalContent}) {
  // copied from SubMenu.js

  switch (modalContent) {
    case '':
      return <div></div>
    case 'changeclass':
      return <ChangeClass />
    case 'pomodoro':
      return <Pomodoro />
    default:
      return <div>Something went wrong, no modals were selected</div>;
  }
}
