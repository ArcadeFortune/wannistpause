import React, { useState, useEffect } from "react";
import CountdownComponent from "./Countdown";
import "./App.css";

function App() {
  const [ksh, setKsh] = useState({});
  const [breakTime, setBreakTime] = useState(false);

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
        <div className='full-title' onClick={() => {window.location.href = window.location.href = 'https://wannistpause.vercel.app';}}><span className='url'>https://</span><span className='title'><span>{breakTime ? <span>Es</span> : <span>Wann</span>}</span>IstPause</span><span className='url'>.vercel.app</span></div>
        <CountdownComponent ksh={ksh} setBreakTime={setBreakTime}></CountdownComponent>
      </header>
    </div>
  );
}

export default App;
