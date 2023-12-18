import moment from "moment";
import 'moment/locale/de'; // Import German locale
import { getActiveInterval, getNextSubject, getCurrentClass, cleanTimeStamps } from "./importantFunctions";
import { useEffect, useRef, useState } from "react";
import log from "./log";
import { useLocation, useNavigate } from "react-router-dom";
import menuItems from "./menuItems";
import allSettings from "./settings";


export default function useKSHManager() {
	// data relevant variables
  const [date, setDate] = useState(moment().day()); // will be overwritten
	const [timeStamps, setTimeStamps] = useState(null); // general timestamps
	const [timeStampsClean, setTimeStampsClean] = useState(null); // perhaps useless
	const [todaysSubjects, setTodaysSubjects] = useState(null); // all the subjects
	const [everyClass, setEveryClass] = useState([]); // all the classes as a string list [for the dropdown menu]
	const [currentClass, setCurrentClass] = useState(localStorage.getItem("currentClass") || ""); // school class selected by the user

	// website relevant variables
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenuContent, setSubMenuContent] = useState(""); // the content of the submenu
	const [modalContent, setModalContent] = useState(""); // the content of the modal
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuCoords, setContextMenuCoords] = useState({ x: 0, y: 0 });
	const [isBreakTime, setIsBreakTime] = useState(false); // to change the title
	const navigate = useNavigate() // https://stackoverflow.com/a/70274942
	const location = useLocation() // https://stackoverflow.com/a/60736742

	// const [pomodoro, setPomodoro] = useState(JSON.parse(window.localStorage.getItem("pomodoro")) || {}); // pomodoro settings
	const [pomodoro, setPomodoro] = useState({}); // pomodoro settings
	const [YTKey, setYTKey] = useState(0);
	const YTPlayerRef = useRef(null); // youtube player

	// user experience relevant variables
	const [settings, setSettings] = useState(JSON.parse(window.localStorage.getItem('settings')) || allSettings); // user settings

	// timer relevant variables
	const [timerKey, setTimerKey] = useState(0); // to restart the timer
	const [refreshTimer, setRefreshTimer] = useState(0); // to restart the timer. also useEffect is kinda annoying
	const [activeInterval, setActiveInterval] = useState(0); // get the two timestamps of the current interval (in moment object)
	const [totalDuration, setTotalDuration] = useState(null); // either 45 minutes or 10 minutes
	const [remainingTime, setRemainingTime] = useState(null); // remaining time of the current interval [seconds]
	const [timerFinished, setTimerFinished] = useState(false); // to procc the confetti
	const [nextSubject, setNextSubject] = useState({}); // to display the next subject

	function customNavigate(path) {
		if (path === location.pathname) navigate('/'); // if the user clicks on the same link
		else navigate(path);
	}
	
	function cleanUpTimeStamps(timeStamps) {
		setTimeStampsClean(cleanTimeStamps(timeStamps));
	}
	
	function saveCurrentClass(currentClass) {
		localStorage.setItem("currentClass", currentClass);
		setCurrentClass(currentClass);
  }

	function saveSetting(newValue, key) {
		const updatedSettings = {
      ...settings,
      [key]: {
        ...settings[key],
        value: newValue,
      },
    };

    // Update local storage
    localStorage.setItem('settings', JSON.stringify(updatedSettings));

    // Update state
    setSettings(updatedSettings);
	}
	

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
		if (settings.contextMenu === false) return; // if the user disabled the context menu, show the normal context menu
		e.preventDefault();
		if (modalContent.length === 0) { // disable the context menu in the modal
      if (!isContextMenuOpen) setContextMenuCoords({ x: e.clientX, y: e.clientY }); // only change the coords when the user opens the context menu
			setIsContextMenuOpen(!isContextMenuOpen);
		}
	}

	function handleTimerComplete() {
		if (!pomodoro.isRunning) {

			// normal timer
			log("fertig!");
			log("Die Jetztige Zeit ist nun:", moment().format("HH:mm:ss"));
			setRefreshTimer(refreshTimer + 1);

			setTimerFinished(true);
			setTimeout(() => {
				setTimerFinished(false);
			}, 4000); // confetti refresh

		} else {

			// pomodoro timer
			if (pomodoro.isWorking) {
				// set the timer to breaktime
				log('Pause!')
				setRemainingTime(pomodoro.breakDuration);
				setTotalDuration(pomodoro.breakDuration);
				setIsBreakTime(true); // to change the title
				restartTimer();
				handlePlayYT(false); // pause the music

			} else {

				if (pomodoro.repeatedSoFar >= pomodoro.repeatAmount) {
					// stop the timer
					stopPomodoro();
					return;
				}

				// add one repetition
				setPomodoro(prevPomodoro => ({
					...prevPomodoro, 
					repeatedSoFar: prevPomodoro.repeatedSoFar + 1
				}));
				
				// set the timer to worktime
				setRemainingTime(pomodoro.duration);
				setTotalDuration(pomodoro.duration);
				setIsBreakTime(false); // to change the title
				restartTimer();
				handlePlayYT(true); // play the music
				
			}
			
			// set breaktime or not
			setPomodoro(prevPomodoro => ({...prevPomodoro, isWorking: !pomodoro.isWorking}));			
		}
	}

	function handlePlayYT(forceVar) {
		// btw the 'pomodoro' variable is undefined here, thankfully it is not needed here
		const player = YTPlayerRef.current;
		
		if (!player.G) return log('player not ready yet')
		if (forceVar === true) {player.playVideo(); return}
		if (forceVar === false) {player.pauseVideo(); return}

		// toggle play / pause
		if (player.getPlayerState() === 1) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}

	function handleUpdateYT() {
		setYTKey(prevYTKey => prevYTKey + 1);
	}

  function handleSubMenuChange(newContent) {
    // whenever a user clicks on a sub menu (example: aboutme), it would set current the subMenuContent ("") to the newContent ("aboutme")
 		// if the user clicks on a different sub menu (example: "timetable"), it would reset the subMenuContent ("aboutme") and then set it to the newContent ("timetable")
		// to let the animation play
		setSubMenuContent("");
		// run this function after 0.1 seconds
		setTimeout(() => {
			setSubMenuContent(newContent);
		}, subMenuContent.length === 0 ? 0 : 200); // need to wait for the previous sub menu to close IF there was one.

		// finally close the side menu if it is open
		if (isMenuOpen) setIsMenuOpen(false);

		return newContent;
  }

	function handleModalChange(newContent) {
		setModalContent(newContent);
		
		// close the side menu if it is open
		if (isMenuOpen) setIsMenuOpen(false);

		return newContent;
  }

	function showContent(content) {
		// example: content = { name: "Stundenplan", content: "timetable", type: "submenu" }
		if (!content) { setSubMenuContent(''); setModalContent(''); return; } // if the user is on the homepage, set the current view to the default view

		if (content.type === 'modal') {
			handleModalChange(content.content);
		} else if (content.type === 'submenu') {
			handleSubMenuChange(content.content);
		}
	}

	function startPomodoro(settings) {
		settings = {...settings, startedTime: moment(), isRunning: true, isWorking: true, repeatedSoFar: 0}
		log('Starte Pomodoro Timer mit folgenden Einstellungen', settings)
		// save the settings to localstorage
		// window.localStorage.setItem("pomodoro", JSON.stringify(settings)) //temporary
		setPomodoro(settings)
		setModalContent("");

		// set the timer
		setRemainingTime(settings.duration);
		setTotalDuration(settings.duration);
		setIsBreakTime(false); // to change the title
		restartTimer();
		if (settings.musik) handlePlayYT(true); // play the music
	}

	// future: maybe remeber the previous pomodoro settings
	function stopPomodoro() {
		// remove from localstorage
		// window.localStorage.removeItem("pomodoro") //temporary
		setPomodoro({})

		configureTimer(moment());
		restartTimer();
	}

	function restartTimer(shouldRefresh=true) {
		if (shouldRefresh) navigate('/')
		setTimerKey(timerKey + 1);
		// setTimerFinished(false);
	}

	function configureTimer() {
		// determine the current time
		const currentTime = process.env.NODE_ENV === 'development' ? moment('12:55:00', 'HH:mm:ss') : moment();// for testing
    currentTime.add(1, 'seconds'); // perhaps this will fix everything
    log('Zurzeit ist es:', currentTime.format('HH:mm:ss'))

		log("Schulzeiten: ", JSON.stringify(timeStamps));
		const i = getActiveInterval(currentTime, date, timeStamps, todaysSubjects, currentClass);
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

		restartTimer(false);
	}

	useEffect(() => {
		if (location.pathname === '/') {
			showContent(); // homepage
		}

		// show the content of the spcecific menu item.
		menuItems.forEach((item) => {
			if (location.pathname === `/${item.content}`) {
				showContent(item);
				return;
			}
		})
		
	}, [location.pathname]);

	// return every variable
	return {
    date, setDate,
		timeStamps, setTimeStamps,
		timeStampsClean, setTimeStampsClean: cleanUpTimeStamps,
		todaysSubjects, setTodaysSubjects,
		everyClass, setEveryClass,
		currentClass, setCurrentClass: saveCurrentClass,
		isMenuOpen, setIsMenuOpen,
    subMenuContent, setSubMenuContent: handleSubMenuChange,
		modalContent, setModalContent: handleModalChange,
		isContextMenuOpen, setIsContextMenuOpen,
		contextMenuCoords, setContextMenuCoords,
		pomodoro, setPomodoro,
		YTKey, setYTKey,
		YTPlayerRef,
		settings, setSettings: saveSetting,
		timerKey, setTimerKey,
		refreshTimer, setRefreshTimer,
		activeInterval, setActiveInterval,
		isBreakTime, setIsBreakTime,
		totalDuration, setTotalDuration,
		remainingTime, setRemainingTime,
		timerFinished, setTimerFinished,
		nextSubject, setNextSubject,
		navigate: customNavigate,
		isKSHLoaded,
		isActiveInterval,
		handleBurgerClick,
		handleContextMenuRightClick,
		handleContextMenuLeftClick,
		handleTimerComplete,
		handlePlayYT,
		handleUpdateYT,
		showContent,
		startPomodoro,
		stopPomodoro,
		restartTimer,
		configureTimer,
	};
}
