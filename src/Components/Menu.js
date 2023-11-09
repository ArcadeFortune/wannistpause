import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export function Menu() {
  const ksh = useContext(KshManagerContext)
  return (
    <>
      <div onClick={ksh.handleChangeClassClick}>Klasse Wechesln</div>
      <div onClick={() => window.location.href = 'https://intranet.tam.ch/ksh/public/timetable/daily-class-schedule'}>Stundenplan</div> {/* Stundenplan */}
      <div onClick={() => alert('bro da staht coming soon')}>Coming Soon...</div> {/* Stundenplan */}
    </>
  )
}