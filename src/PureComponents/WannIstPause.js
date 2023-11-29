import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

export default function WannIstPause() {
  const ksh = useContext(KshManagerContext);

  return (
    <span className='title'><span>{ksh.isBreakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span>
  )
}