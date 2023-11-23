import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export default function Menu() {
  const ksh = useContext(KshManagerContext)
  return (
    <>
      <div onClick={() => {ksh.setModalContent('changeclass')}}>Klasse Wechesln</div>
      <div onClick={() => {ksh.setSubMenuContent('timetable')}}>Stundenplan</div> {/* Stundenplan */}
      <div onClick={() => {ksh.setModalContent('pomodoro')}}>Pomodoro</div>
      <div onClick={() => {ksh.setSubMenuContent('aboutme')}}>Über mich</div>
      <div><a href='https://wannistpause-git-develpoment-arcadefortune.vercel.app/'>Preview</a></div>
      <div onClick={() => alert('bald kann man die einstellungen ändern, yay!')}>Coming Soon...</div>
    </>
  )
}