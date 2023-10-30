import React, { useState, useEffect } from 'react';
import CountdownComponent from './Countdown';
import './App.css';

function App() {
  const [everyTimeStamp, setEveryTimeStamp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://intranet.tam.ch/ksh/public/timetable/daily-class-schedule");
        const data = await response.text();
        const parser = new DOMParser();
        const kshdocument = parser.parseFromString(data, 'text/html');

        const timeStamps = Array.from(kshdocument.querySelectorAll('.ttp-timespan')).map(
          (timeStamp) => timeStamp.innerHTML
        );

        setEveryTimeStamp(timeStamps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          {everyTimeStamp ? <div><CountdownComponent everyTimeStamp={everyTimeStamp}></CountdownComponent></div> : null}
      </header>
    </div>
  );
}

export default App;
