/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import CountdownComponent from "./Components/Countdown";
import "./App.css";
import "./Layouts/SubMenu.css"
import './Layouts/Menu.css';

import { BurgerMenu } from "./SVGs/BurgerMenu";
import { KshManagerContext } from "./KshManager";
import ContextMenu from "./Components/ContextMenu";

import { getEveryTeacherSubject, parseTodaysSubjectsHTML, sortObj } from "./importantFunctions";
import Menu from "./Layouts/Menu";
import SubMenu from "./Layouts/SubMenu";
import Modal from "./Layouts/Modal";
import log from "./log";
import WannIstPause from "./Components/WannIstPause";

export default function App({ currentView }) {
  const ksh = useContext(KshManagerContext);

  useEffect(() => {
    if (!ksh.currentClass || JSON.stringify(ksh.currentClass ) === '""') {
      ksh.navigate('/changeclass');
    } 
    
    const fetchData = async () => {
      try {
        log("Intranet laden...")
        const response = await fetch(
          "https://intranet.tam.ch/ksh/public/timetable/daily-class-schedule", {
            method: 'GET',
            headers: {
              'Accept-Language': 'de-DE,de;q=0.9', // This sets German as the preferred language
            }
          });
        log("Intranet erfolgreich geladet!")
          
        const data = await response.text();
        const parser = new DOMParser();
        const kshdocument = parser.parseFromString(data, "text/html");

        // grab the general timestamps
        const timeStamps = Array.from(
          kshdocument.querySelectorAll(".ttp-timespan")
        ).map((timeStamp) => timeStamp.innerHTML);

        // grab all the subjects
        const todaysSubjectsHTML = Array.from(
          kshdocument.querySelectorAll(".ttp-line")
        ).map((line) => line);

        // parse the subjects into an object
        const todaysSubjects = parseTodaysSubjectsHTML(todaysSubjectsHTML);
        
        const todaysSubjectsTeacher = sortObj(getEveryTeacherSubject(todaysSubjects));

        // grab every class as a string list
        const everyClass = Array.from(
          todaysSubjectsHTML.map((line) => line.querySelector('th').innerHTML)
        );

        // grab the current day of week
        const date = kshdocument.querySelector('h1').innerHTML.split(', ')[1]; // "20. November 2023"

        ksh.setDate(date);
        ksh.setTimeStamps(timeStamps);
        ksh.setTimeStampsClean(timeStamps);
        ksh.setTodaysSubjects(todaysSubjects);
        ksh.setEveryClass(everyClass);
        ksh.setTodaysSubjectsTeacher(todaysSubjectsTeacher);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App" onClick={ksh.handleContextMenuLeftClick} onContextMenu={ksh.handleContextMenuRightClick}> 
      <header className="App-header">
        {process.env.NODE_ENV === 'development' && <button onClick={() => console.log('settings:', ksh.todaysSubjectsTeacher)} style={{top:0, position: 'absolute'}}>Dev Button</button>}
        {/* Context Menu */}
        <ContextMenu/>

        {/* Title */}
        <div className="the-title">
          <WannIstPause/>
        </div>
        
        {/* Modal */}
        <Modal content={ksh.modalContent}/>

        {/* Sub-Menu */}
        <SubMenu subMenuContent={ksh.subMenuContent}/>

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
