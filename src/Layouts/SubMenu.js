import './Menu.css';

import AboutMe from "../Components/AboutMe"
import TimeTable from "../Components/TimeTable"
import Settings from "../Components/Settings";

export default function SubMenu({subMenuContent}) {

  return (
    // <div className='sub-menu'>
      // <div className='sub-menu title'>Untermenü</div>
      // <div className='sub-menu content'>
      <div className={`sub-menu${subMenuContent.length !== 0 ? ' open' : ''}`}>

        <SubMenuContent subMenuContent={subMenuContent}/>
        </div>
  )
}

function SubMenuContent({subMenuContent}) {
    switch (subMenuContent) {
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
