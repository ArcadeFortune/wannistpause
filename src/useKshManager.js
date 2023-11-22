import moment from "moment";
import 'moment/locale/de'; // Import German locale
import { getActiveInterval, getNextSubject, getCurrentClass, cleanTimeStamps } from "./importantFunctions";
import { useState } from "react";
import log from "./log";

export default function useKSHManager() {
	// data relevant variables
  const [date, setDate] = useState(moment().day()); // will be overwritten
	const [timeStamps, setTimeStamps] = useState(null); // general timestamps
	const [timeStampsClean, setTimeStampsClean] = useState(null); // perhaps useless
	const [todaysSubjects, setTodaysSubjects] = useState(null); // all the subjects
	const [todaysSubjectsClass, setTodaysSubjectsClass] = useState(null); // all the subjects of the current class
	const [todaysSubjectsClassHTML, setTodaysSubjectsClassHTML] = useState(null); // all the subjects of the current class
	const [everyClass, setEveryClass] = useState([]); // all the classes as a string list [for the dropdown menu]
	const [currentClass, setCurrentClass] = useState(localStorage.getItem("currentClass") || "I3a"); // school class selected by the user

	// website relevant variables
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuContent, setSubMenuContent] = useState(""); // the content of the submenu
	const [modalContent, setModalContent] = useState(""); // the content of the modal
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuCoords, setContextMenuCoords] = useState({ x: 0, y: 0 });
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

	function handleContextMenuLeftClick(e) {
		if (isContextMenuOpen) {
			// setContextMenuCoords({ x: e.clientX, y: e.clientY });
			setIsContextMenuOpen(false);
		}
	}

	function handleContextMenuRightClick(e) {
		e.preventDefault();
		if (modalContent.length === 0) { // disable the context menu in the modal
      if (!isContextMenuOpen) setContextMenuCoords({ x: e.clientX, y: e.clientY }); // only change the coords when the user opens the context menu
			setIsContextMenuOpen(!isContextMenuOpen);
		}
	}

	function handleTimerComplete() {
		log("fertig!");
		log("Die Jetztige Zeit ist nun:", moment().format("HH:mm:ss"));
		setRefreshTimer(refreshTimer + 1);

		setTimerFinished(true);
		setTimeout(() => {
			setTimerFinished(false);
		}, 4000); // confetti refresh
	}

  function saveTodaysSubjects(todaysSubjects) {
    let todaysClassSubjectsList = [];
		const currentClassSubjects = getCurrentClass(todaysSubjects, currentClass);
		currentClassSubjects.forEach((subject) => {
			todaysClassSubjectsList.push(subject.innerText.trim().split("\n\n"));
		});

    setTodaysSubjects(todaysSubjects);
		setTodaysSubjectsClass(todaysClassSubjectsList);
		// setTodaysSubjectsClassHTML(getCurrentClass(todaysSubjects, currentClass));
		setTodaysSubjectsClassHTML(currentClassSubjects);
  }


	function saveCurrentClass(currentClass) {
    // i am aware this is redundant to the function above, but the the parameters 'todaysSubjects' and 'currentClass' change in both scenarios.
    let todaysClassSubjectsList = [];
		const currentClassSubjects = getCurrentClass(todaysSubjects, currentClass);
		currentClassSubjects.forEach((subject) => {
			todaysClassSubjectsList.push(subject.innerText.trim().split("\n\n"));
		});

    setTodaysSubjects(todaysSubjects);
		setTodaysSubjectsClass(todaysClassSubjectsList);
		// setTodaysSubjectsClassHTML(getCurrentClass(todaysSubjects, currentClass));
		setTodaysSubjectsClassHTML(currentClassSubjects);

		localStorage.setItem("currentClass", currentClass);
		setCurrentClass(currentClass);
  }

  function handleSubMenuChange(newContent) {
    // whenever a user clicks on a sub menu (example: about me), it would set the subMenuContent ("") to the newContent ("aboutme")
    if (newContent === subMenuContent) {
      // if the user clicks on the same sub menu ("aboutme") again, it would reset the subMenuContent ("aboutme")
      setSubMenuContent("");
    } else {
      // if the user clicks on a different sub menu (example: "timetable"), it would reset the subMenuContent ("aboutme") and then set it to the newContent ("timetable")
      setSubMenuContent("");
      // run this function after 0.1 seconds
      setTimeout(() => {
        setSubMenuContent(newContent);
      }, subMenuContent.length === 0 ? 0 : 200); // need to wait for the previous sub menu to close IF there was one.
    }
  }

	function handleModalChange(newContent) {
		// pastet from handleSubMenuChange()
    if (newContent === modalContent) {
      setModalContent("");
    } else {
			setModalContent(newContent);
    }
  }

	function startPomodoro(settings) {
		log(settings)
	}

	function restartTimer() {
		setTimerKey(timerKey + 1);
		// setTimerFinished(false);
	}

	function configureTimer(currentTime) {
		log("Schulzeiten: ", JSON.stringify(timeStamps));
		const i = getActiveInterval(currentTime, date, timeStamps, todaysSubjectsClass);
		setActiveInterval(i); // finds current interval

		if (i === 0) {
			log("keine Schule!");
			return;
		} // 0 means it is outside of the timetable

		setIsBreakTime(i.breakTime); // is it breaktime?
		log("Dies ist zwischen:", i.current.start.format("HH:mm:ss"), "-", i.current.end.format("HH:mm:ss"));

		setTotalDuration(i.current.end.diff(i.current.start, "seconds")); // sets the duration of the current interval either 45 minutes or 10 minutes
		log("Das dauert genau:", i.current.end.diff(i.current.start, "seconds"), "Sekunden");

		setRemainingTime(i.current.end.diff(currentTime, "seconds")); // sets the remaining time of the current interval
		log("Es bleiben noch:", i.current.end.diff(currentTime, "seconds"), "Sekunden");

		setNextSubject(getNextSubject(i.timeIndex, getCurrentClass(todaysSubjects, currentClass))); // sets the next subject

		restartTimer();
	}

	function cleanUpTimeStamps(timeStamps) {
		setTimeStampsClean(cleanTimeStamps(timeStamps));
	}

	// return every variable
	return {
    date, setDate,
		timeStamps, setTimeStamps,
		timeStampsClean, setTimeStampsClean: cleanUpTimeStamps,
		todaysSubjects, setTodaysSubjects: saveTodaysSubjects,
		todaysSubjectsClass, setTodaysSubjectsClass,
		todaysSubjectsClassHTML, setTodaysSubjectsClassHTML,
		everyClass, setEveryClass,
		currentClass, saveCurrentClass,
		isMenuOpen, setIsMenuOpen,
    subMenuContent, setSubMenuContent: handleSubMenuChange,
		modalContent, setModalContent: handleModalChange,
		isContextMenuOpen, setIsContextMenuOpen,
		contextMenuCoords, setContextMenuCoords,
		timerKey, setTimerKey,
		refreshTimer, setRefreshTimer,
		activeInterval, setActiveInterval,
		isBreakTime, setIsBreakTime,
		totalDuration, setTotalDuration,
		remainingTime, setRemainingTime,
		timerFinished, setTimerFinished,
		nextSubject, setNextSubject,
		isKSHLoaded,
		isActiveInterval,
		handleBurgerClick,
		handleContextMenuRightClick,
		handleContextMenuLeftClick,
		handleTimerComplete,
		startPomodoro,
		restartTimer,
		configureTimer,
	};
}
