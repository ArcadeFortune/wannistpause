/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import CountdownComponent from "./Components/Countdown";
import "./App.css";
import "./Layouts/SubMenu.css"
import './Layouts/Menu.css';

import { BurgerMenu } from "./SVGs/BurgerMenu";
import { KshManagerContext } from "./KshManager";
import ContextMenu from "./Components/ContextMenu";

import Menu from "./Layouts/Menu";
import SubMenu from "./Layouts/SubMenu";
import Modal from "./Layouts/Modal";

function App() {
  const ksh = useContext(KshManagerContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://intranet.tam.ch/ksh/public/timetable/daily-class-schedule", {
            method: 'GET',
            headers: {
                'Accept-Language': 'de-DE,de;q=0.9' // This sets German as the preferred language
            }
        });
         
        const data = await response.text();
        const parser = new DOMParser();
        const kshdocument = parser.parseFromString(data, "text/html");

        // grab the general timestamps
        const timeStamps = Array.from(
          kshdocument.querySelectorAll(".ttp-timespan")
        ).map((timeStamp) => timeStamp.innerHTML);

        // grab all the subjects
        const todaysSubjects = Array.from(
          kshdocument.querySelectorAll(".ttp-line")
        ).map((line) => line);
        
        // grab every class as a string list
        const everyClass = Array.from(
          todaysSubjects.map((line) => line.querySelector('th').innerHTML)
        );

        // grab the current day of week
        const date = kshdocument.querySelector('h1').innerHTML.split(', ')[1]; // "20. November 2023"

        ksh.setDate(date);
        ksh.setTimeStamps(timeStamps);
        ksh.setTimeStampsClean(timeStamps);
        ksh.setTodaysSubjects(todaysSubjects);
        ksh.setEveryClass(everyClass);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App" onClick={ksh.handleContextMenuLeftClick} onContextMenu={ksh.handleContextMenuRightClick}> 
      <header className="App-header">
        <ContextMenu/>
        {/* Title */}
        <div className="full-title" onClick={() => {window.location.href = window.location.href = 'https://wannistpause.vercel.app';}}><span className='url'>https://</span><span className='title'><span>{ksh.isBreakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span><span className='url'>.vercel.app</span></div>
        
        {/* Modal */}
        <Modal content={ksh.modalContent}/>

        {/* Sub-Menu */}
        <div className={`sub-menu${ksh.subMenuContent.length !== 0 ? ' open' : ''}`}>
          <SubMenu/>
        </div>

        {/* Main Menu */}
        <BurgerMenu handleClick={ksh.handleBurgerClick} className="full-title burger-menu"></BurgerMenu>
        <div className={`menu-main${ksh.isMenuOpen ? ' open' : ''}`} onClick={ksh.handleBurgerClick}></div>
        <div className={`menu${ksh.isMenuOpen ? ' open' : ''}`}>
          <div className="menu-content">
            <span className="title">Menü</span>
            <BurgerMenu handleClick={ksh.handleBurgerClick} className="burger-menu"></BurgerMenu>
            <Menu/>
          </div>
        </div>

        {/* Countdown */}
        <CountdownComponent/>
      </header>
    </div>
  );
}

export default App;
