import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import AboutMe from "../Components/AboutMe"
import TimeTable from "../Components/TimeTable"

import './Menu.css';

export default function SubMenu() {
  const ksh = useContext(KshManagerContext)

    switch (ksh.subMenuContent) {
      case '':
        return <div>nix</div>
      case 'aboutme':
        return <AboutMe />
      case 'timetable':
        return <TimeTable/>
      default:
        return <div>Something went wrong, no sub-menus were selected</div>;
    }
}
