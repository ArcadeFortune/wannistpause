import { useContext, useEffect, useRef, useState } from "react"
import { KshManagerContext } from "../KshManager"
import './ContextMenu.css'
import Menu from "../Layouts/Menu"
import Copy from "../SVGs/Copy"
import Paste from "../SVGs/Paste"
import Cut from "../SVGs/Cut"
import { getYTId } from "../importantFunctions"
import Back from "../SVGs/Back"
import Forward from "../SVGs/Forward"
import Reload from "../SVGs/Reload"
import Home from "../SVGs/Home"
import CopyLink from "../SVGs/CopyLink"

export default function ContextMenu() {
  const [highlightedText, setHighlightedText] = useState('');
  const [readText, setReadText] = useState('');
  const [isCopyable, setIsCopyable] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('');
  const [isYTLink, setIsYTLink] = useState(false);
  const ref = useRef(null);
  const ksh = useContext(KshManagerContext)

  useEffect(() => {
    // save the highlighted text
    setIsCopyable(false);
    setIsYTLink(false);
    setHoveredLink('');
    if (window.getSelection().toString()) {
      setHighlightedText(window.getSelection().toString());
      setIsCopyable(true);
    }
    
    // if there is a hovered link, show the copy link button
    if (ksh.hoveredLink) {
      setHoveredLink(ksh.hoveredLink);
      setIsCopyable(false);
    }

    // save the clipboard text
    try {
      navigator.clipboard.readText().then((data) => {
        setReadText(data);
        
        // if readText is a valid youtube link, show the paste button
        if (getYTId(data)) {
          setIsYTLink(true);
        }
      });
    } catch (error) {
      console.error("Don't use firefox, I can't see what you have copied.")
    }
      
    // adjust the position of the context menu, incase of overflow
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        ksh.setContextMenuCoords({x: window.innerWidth - rect.width - 50, y: ksh.contextMenuCoords.y})
      }
      if (rect.bottom > window.innerHeight) {
        ksh.setContextMenuCoords({x: ksh.contextMenuCoords.x, y: window.innerHeight - rect.height - 50})
      }
    }
  }, [ksh.contextMenuCoords])


  return (
    <div className={`context-menu main${ksh.isContextMenuOpen ? " open" : " close"}`} style={{top: ksh.contextMenuCoords.y, left: ksh.contextMenuCoords.x}} ref={ref}>
      <div className="context-menu header">
        {isYTLink && ( <Paste text={readText}/> )}
        {isCopyable && ( <Copy text={highlightedText}/> )}
        {hoveredLink && ( <CopyLink link={hoveredLink}/> )}
        <Back/>
        {ksh.location.pathname === '/' ? (
          <Reload/>
        ) : (
          <Home/>
        )}

        <Forward/>
        {/* <Cut text={highlightedText}/>  */}
      </div>
      <div className="context-menu divider"></div>
      <div className="context-menu content">
        <Menu/>
      </div>
    </div>
  )
}
