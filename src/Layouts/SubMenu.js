import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import AboutMe from "../Components/AboutMe"
import TimeTable from "../Components/TimeTable"

import './Menu.css';
import Settings from "../Components/Settings";

export default function SubMenu() {
  const ksh = useContext(KshManagerContext)

    switch (ksh.subMenuContent) {
      case '':
        return <div>No sub-menus were selected.</div>;
      case 'aboutme':
        return <AboutMe />
      case 'timetable':
        return <TimeTable/>
      case 'settings':
        return <Settings/>
      default:
        return <div>This sub-menu does not exist.</div>;
    }
}
