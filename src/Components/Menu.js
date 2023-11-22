import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export function Menu() {
  const ksh = useContext(KshManagerContext)
  return (
    <>
      <div onClick={() => {ksh.handleChangeClassClick(); ksh.setModalContent('changeclass')}}>Klasse Wechesln</div>
      <div onClick={() => {ksh.setSubMenuContent('timetable')}}>Stundenplan</div> {/* Stundenplan */}
      <div onClick={() => {ksh.setSubMenuContent('aboutme')}}>Über mich</div>
      <div onClick={() => alert('bro da staht coming soon')}>Coming Soon...</div>
    </>
  )
}