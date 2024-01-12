import { useContext } from "react"
import { KshManagerContext } from "../KshManager"

export default function A({ href, children, ...props }) {
  const ksh = useContext(KshManagerContext)
  return (<a href={href} {...props} onMouseEnter={() => ksh.setHoveredLink(href)} onMouseLeave={() => ksh.setHoveredLink('')}>
      {children}
    </a>)
}