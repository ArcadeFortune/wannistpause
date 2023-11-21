import { useContext, useEffect } from "react"
import { KshManagerContext } from "../KshManager"
import './ContextMenu.css'
import { Menu } from "./Menu"

export default function ContextMenu() {
  const ksh = useContext(KshManagerContext)

  useEffect(() => {
    console.log(ksh.contextMenuCoords)
  }, [ksh.contextMenuCoords])

  return (
    <div className={`context-menu main${ksh.isContextMenuOpen ? " open" : " close"}`} style={{top: ksh.contextMenuCoords.y, left: ksh.contextMenuCoords.x}}>
      <div className="context-menu header">Context menu</div>
      <div className="context-menu divider"></div>
      <div className="context-menu content">
        <Menu/>
      </div>
    </div>
  )
}