import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import menuItems from "../menuItems"

// edit here your menu items
export default function Menu() {
  const ksh = useContext(KshManagerContext)

  return (
    <>
      {menuItems.map((item, index) => {
        // special case for links
        if (item.link) {
          return <div key={index}><a tabIndex={-1} href={item.link}>{item.name}</a></div>
        }
        
        // special case for pomodoro
        if (item.content === 'pomodoro') {
          if (ksh.pomodoro.isRunning) {
            return <div key={index} onClick={() => {ksh.stopPomodoro(); ksh.handlePlayYT(false);}}>{item.name} stoppen</div>
          }
        }

        // if ksh.settings.teacherView is true, can change teacher, rather than class
        if (item.content === 'changeclass') {
          return <div key={index} onClick={() => {ksh.navigate('/' + item.content)}}>{ksh.settings.teacherView.value ? 'Lehrer' : 'Klasse'} wechseln</div>
        }
        
        // default case
        return <div key={index} onClick={() => ksh.navigate('/' + item.content)}>{item.name}</div>
      })}
    </>
  )
}
