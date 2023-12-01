import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

import './WannIstPause.css';


export default function WannIstPause() {
  const ksh = useContext(KshManagerContext);

  return (
    <div className="full-title">
      <a href="https://wannistpause.vercel.app" tabIndex={-1}>
        <span className='url'>https://</span><span className='title'>
          <span>{ksh.isBreakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span>
        <span className='url'>.vercel.app</span>
      </a>
    </div>
  )
}