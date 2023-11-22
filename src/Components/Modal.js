import { useContext, useState } from "react"
import { KshManagerContext } from "../KshManager"
import './Modal.css';

import ChangeClass from "./ChangeClass";
import log from "../log";

export default function Modal({content}) {  
  const ksh = useContext(KshManagerContext)
  
  return (
    <div className={`modal ${content.length !== 0 ? ' open' : ' close'}`}>
      <div className={`${content.length !== 0 ? ' open' : ' close'} modal overlay`} onClick={() => {ksh.setModalContent('')}}></div>
      <div className={`${content.length !== 0 ? ' open' : ' close'} modal box`}>
      <div className={`${content.length !== 0 ? ' open' : ' close'} modal close-button`} onClick={() => {ksh.setModalContent('')}}>x</div>

      <ModalContent />
      </div>
    </div>
  )
}

function ModalContent() {
  // copied from SubMenu.js
  const ksh = useContext(KshManagerContext)

  switch (ksh.modalContent) {
    case '':
      return <div></div>
    case 'changeclass':
      return <ChangeClass />
    default:
      return <div>Something went wrong, no modals were selected</div>;
  }
}