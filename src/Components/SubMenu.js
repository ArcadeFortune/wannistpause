import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import AboutMe from "./AboutMe"

export default function SubMenu() {
  const ksh = useContext(KshManagerContext)

    switch (ksh.subMenuContent) {
      case '':
        return <div>nix</div>
      case 'aboutme':
        return <AboutMe />
      case 'menu1':
        return <div>s</div>;
      default:
        return <div>Something went wrong, no sub-menus were selected</div>;
    }
}