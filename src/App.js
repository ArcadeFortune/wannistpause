import React, { useState, useEffect, useContext } from "react";
import CountdownComponent from "./Components/Countdown";
import "./App.css";
import './Components/Menu.css';

import { BurgerMenu } from "./Components/BurgerMenu";
import { Menu } from "./Components/Menu";
import { KshManagerContext } from "./KshManager";

function App() {
  const test = useContext(KshManagerContext);
  const [ksh, setKsh] = useState({});
  const [breakTime, setBreakTime] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen)
  }

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

        // grab all the subjects
        const everyClass = Array.from(
          kshdocument.querySelectorAll(".ttp-line")
        ).map((line) => line);
        
        // grab the general timestamps
        const timeStamps = Array.from(
          kshdocument.querySelectorAll(".ttp-timespan")
        ).map((timeStamp) => timeStamp.innerHTML);
        setKsh({
          ...ksh,
          timestamps: timeStamps,
          everyClass: everyClass,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App"> 
      <header className="App-header">
        
        <BurgerMenu handleClick={handleClick} className="full-title burger-menu"></BurgerMenu>

        <div className={`menu ${isOpen ? 'open' : ''}`}>
          <div className="menu-content">
            <BurgerMenu handleClick={handleClick} className="burger-menu"></BurgerMenu>
            <Menu/>
          </div>
        </div>
        <div className='full-title' onClick={() => {window.location.href = window.location.href = 'https://wannistpause.vercel.app';}}><span className='url'>https://</span><span className='title'><span>{breakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span><span className='url'>.vercel.app</span></div>
        <CountdownComponent ksh={ksh} setBreakTime={setBreakTime}></CountdownComponent>
      </header>
    </div>
  );
}

export default App;
