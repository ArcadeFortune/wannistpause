import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export function Menu() {
  const ksh = useContext(KshManagerContext)
  return (
    <>
      <div onClick={ksh.handleChangeClassClick} onContextMenu={(e) => {e.preventDefault(); ksh.handleChangeClassClick()}}>Klasse Wechesln</div>
      <div onClick={ksh.handleTimeTableClick} onContextMenu={(e) => {e.preventDefault(); ksh.handleTimeTableClick()}}>{ksh.isTimeTableOpen ? 'Wann ist Pause' : 'Stundenplan'}</div> {/* Stundenplan */}
      <div onClick={() => alert('bro da staht coming soon')} onContextMenu={(e) => {e.preventDefault(); alert('bro da staht coming soon')}}>Coming Soon...</div> {/* Stundenplan */}
    </>
  )
}