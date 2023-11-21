import { useContext } from "react"
import { KshManagerContext } from "../KshManager"
import AboutMe from "./AboutMe"
import TimeTable from "./TimeTable"

import './Menu.css';

export default function SubMenu() {
  const ksh = useContext(KshManagerContext)

    switch (ksh.subMenuContent) {
      case '':
        return <div>nix</div>
      case 'aboutme':
        return <AboutMe />
      case 'timetable':
        return  <div className="time-table-div">
                  <TimeTable/>
                </div>
      default:
        return <div>Something went wrong, no sub-menus were selected</div>;
    }
}