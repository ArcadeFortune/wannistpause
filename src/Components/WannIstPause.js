import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

import './WannIstPause.css';


export default function WannIstPause() {
  const ksh = useContext(KshManagerContext);

  return (
    <div className="full-title unhighlightable">
      <a href="https://wannistpause.vercel.app" tabIndex={-1}>
        <span className='url'>https://</span>
        <span className='title'>{ksh.isBreakTime ? 'Es' : 'Wann'}IstPause</span>
        <span className='url'>.vercel.app</span>
      </a>
    </div>
  )
}