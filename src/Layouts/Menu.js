import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

// edit here your menu items
export default function Menu() {
  const ksh = useContext(KshManagerContext)

  const menuItems = [
    {name: 'Klasse Wechesln', onClick: () => {ksh.setModalContent('changeclass')}},
    {name: 'Stundenplan', onClick: () => {ksh.setSubMenuContent('timetable')}},
    !ksh.pomodoro.isRunning ? {name: 'Pomodoro', onClick: () => {ksh.setModalContent('pomodoro')}} : {name: 'Pomodoro Stoppen', onClick: () => {ksh.stopPomodoro(); ksh.handlePlayYT(false);}},
    {name: 'Über mich', onClick: () => {ksh.setSubMenuContent('aboutme')}},
    {name: 'Einstellungen', onClick: () => {ksh.setSubMenuContent('settings');}},
    {name: 'Vorschau', onClick: () => {console.log('bye!')}, link: 'https://wannistpause-git-develpoment-arcadefortune.vercel.app/'},
  ]
  

  return (
    <>
      {menuItems.map((item, index) => {
        // special case for links
        if (item.link) {
          return <div key={index}><a tabIndex={-1} href={item.link}>{item.name}</a></div>
        }

        // default case
        return <div key={index} onClick={item.onClick}>{item.name}</div>
      })}
    </>
  )
}
