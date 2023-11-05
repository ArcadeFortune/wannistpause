import moment from "moment";
import { getActiveInterval, getNextSubject } from "./importantFunctions";
import { useState } from "react";

export default function useKSHManager() {
  // data relevant variables
  const [timeStamps, setTimeStamps] = useState(null); // general timestamps
  const [todaysSubjects, setTodaysSubjects] = useState(null); // all the subjects
  const [everyClass, setEveryClass] = useState([]); // all the classes as a string list [for the dropdown menu]
  const [currentClass, setCurrentClass] = useState(localStorage.getItem('currentClass') || 'I3a'); // school class selected by the user

  // website relevant variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChangeClassOpen, setIsChangeClassOpen] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  // timer relevant variables
  const [timerKey, setTimerKey] = useState(0); // to restart the timer
  const [refreshTimer, setRefreshTimer] = useState(0); // to restart the timer. also useEffect is kinda annoying
  const [activeInterval, setActiveInterval] = useState(0); // get the two timestamps of the current interval (in moment object)
  const [totalDuration, setTotalDuration] = useState(null); // either 45 minutes or 10 minutes
  const [remainingTime, setRemainingTime] = useState(null); // remaining time of the current interval [seconds]
  const [timerFinished, setTimerFinished] = useState(false); // to procc the confetti
  const [nextSubject, setNextSubject] = useState({}); // to display the next subject

  function isKSHLoaded() {
    return timeStamps != null && todaysSubjects != null;
    // return timeStamps && everyClass; // if / else
  }

  function isActiveInterval() {
    return activeInterval !== 0;
  }

  function handleBurgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleChangeClassClick() {
    setIsChangeClassOpen(!isChangeClassOpen);
  }
  
  function handleTimerComplete() {
    console.log("fertig!");
    console.log("Die Jetztige Zeit ist nun:", moment().format("HH:mm:ss"));
    setRefreshTimer(refreshTimer + 1);


    setTimerFinished(true);
    setTimeout(() => {
      setTimerFinished(false);
    }, 4000); // confetti refresh

  }

  function saveCurrentClass(currentClass) {
    localStorage.setItem('currentClass', currentClass);
    setCurrentClass(currentClass);
  }

  function restartTimer() {
    setTimerKey(timerKey + 1);
    // setTimerFinished(false);
  }

  function configureTimer(currentTime) {
    console.log("timeStamps: ", timeStamps);
    const i = getActiveInterval(currentTime, timeStamps);
    setActiveInterval(i); // finds current interval

    if (i === 0) {
      console.log("keine Schule!");
      return;
    } // 0 means it is outside of the timetable

    setIsBreakTime(i.breakTime); // is it breaktime?
    console.log(
      "Dies ist zwischen:",
      i.current.start.format("HH:mm:ss"),
      "-",
      i.current.end.format("HH:mm:ss")
    );

    setTotalDuration(i.current.end.diff(i.current.start, "seconds")); // sets the duration of the current interval either 45 minutes or 10 minutes
    console.log(
      "Das dauert genau:",
      i.current.end.diff(i.current.start, "seconds"),
      "Sekunden"
    );

    setRemainingTime(i.current.end.diff(currentTime, "seconds")); // sets the remaining time of the current interval
    console.log(
      "Es bleiben noch:",
      i.current.end.diff(currentTime, "seconds"),
      "Sekunden"
      );
      
    setNextSubject(getNextSubject(i.timeIndex, timeStamps, todaysSubjects, currentClass)); // sets the next subject
    
    restartTimer();
  }

  // return every variable
  return {
    timeStamps, setTimeStamps,
    todaysSubjects, setTodaysSubjects,
    everyClass, setEveryClass,
    currentClass, saveCurrentClass,
    isMenuOpen, setIsMenuOpen,
    isChangeClassOpen, setIsChangeClassOpen,
    timerKey, setTimerKey,
    refreshTimer, setRefreshTimer,
    activeInterval, setActiveInterval,
    isBreakTime, setIsBreakTime,
    totalDuration, setTotalDuration,
    remainingTime, setRemainingTime,
    timerFinished, setTimerFinished,
    nextSubject, setNextSubject,
    restartTimer,
    isKSHLoaded,
    isActiveInterval,
    handleBurgerClick,
    handleChangeClassClick,
    configureTimer,
    handleTimerComplete,
  };
}
