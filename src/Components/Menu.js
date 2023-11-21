import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export function Menu() {
  const ksh = useContext(KshManagerContext)
  return (
    <>
      <div onClick={ksh.handleChangeClassClick}>Klasse Wechesln</div>
      <div onClick={ksh.handleTimeTableClick}>{ksh.isTimeTableOpen ? 'Wann ist Pause' : 'Stundenplan'}</div> {/* Stundenplan */}
      <div onClick={() => {ksh.handleSubMenuClick(); ksh.setSubMenuContent('aboutme')}}>Über mich</div>
      <div onClick={() => alert('bro da staht coming soon')}>Coming Soon...</div> {/* Stundenplan */}
    </>
  )
}