import React, { useState, useEffect, useContext } from "react";
import CountdownComponent from "./Components/Countdown";
import "./App.css";
import './Components/Menu.css';

import { BurgerMenu } from "./SVGs/BurgerMenu";
import { Menu } from "./Components/Menu";
import { KshManagerContext } from "./KshManager";
import ChangeClass from "./Components/ChangeClass";
import TimeTable from "./Components/TimeTable";
import Log from "./log";

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
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedOption, setSavedOption] = useState(null);

  const handleSave = (option) => {
    setSavedOption(option);
  };
  
  return (
    <div className="App"> 
      <header className="App-header">
        <ChangeClass
          options={ksh.everyClass} 
          onSave={handleSave} 
          onClose={() => setIsModalOpen(false)}
        />
        
        {savedOption && <p>Saved Option: {savedOption}</p>}
        <BurgerMenu handleClick={ksh.handleBurgerClick} className={`${ksh.isChangeClassOpen ? 'blur ' : ''}${ksh.isTimeTableOpen ? 'move ' : ''}full-title burger-menu`}></BurgerMenu>

        <div className={`menu-main${ksh.isMenuOpen ? ' open' : ''}${ksh.isTimeTableOpen ? ' move' : ''}`} onClick={ksh.handleBurgerClick}></div>
        <div className={`menu${ksh.isMenuOpen ? ' open' : ''}${ksh.isTimeTableOpen ? ' move' : ''}${ksh.isMenuAndTimeTableOpen ? ' close-right' : ''}`}>
          <div className={`${ksh.isChangeClassOpen ? 'blur ' : ''}menu-content`}>
            <span className="title">Menü</span>
            <BurgerMenu handleClick={ksh.handleBurgerClick} className="burger-menu"></BurgerMenu>
            <Menu/>
          </div>
        </div>
        
        {/* Stundenplan */}
        <div className={`menu-timetable ${ksh.isTimeTableOpen ? 'move' : ''}`}>
          <TimeTable/>
        </div>

        <div className={`${ksh.isChangeClassOpen ? 'blur ' : ''}full-title`} onClick={() => {window.location.href = window.location.href = 'https://wannistpause.vercel.app';}}><span className='url'>https://</span><span className='title'><span>{ksh.isBreakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span><span className='url'>.vercel.app</span></div>
        <CountdownComponent className={`${ksh.isChangeClassOpen ? 'blur' : ''}`}></CountdownComponent>
      </header>
    </div>
  );
}

export default App;
