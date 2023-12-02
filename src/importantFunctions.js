import moment from "moment";
import log from "./log";

export function pad(num) { // turns 1 into 01
  return String(parseInt(num)).padStart(2, "0");
}

export function renderTime({ remainingTime }) { // what a mess xd
  if (remainingTime === 0) return <div className="timer">Pause!</div>;

  // Create a moment duration from the remaining time
  const duration = moment.duration(remainingTime, 'seconds');

  // Format the duration
  const formattedTime = `${pad(parseInt(duration.hours()) + parseInt(duration.days() * 24))}:${pad(duration.minutes())}:${pad(duration.seconds())}`;
  const formattedTimeWithoutHours = `${pad(duration.minutes())}:${pad(duration.seconds())}`;
  return (
    <div className="timer">
      <div className="timer-text">Nur noch</div>
      <div className="value">{remainingTime >= 3600 ? formattedTime : formattedTimeWithoutHours}</div>
      <div className="timer-text">{remainingTime >= 3600 ? 'Stunden' : 'Minuten'}</div>
    </div>
  );
}

export function parseTodaysSubjectsHTML(todaysSubjectsHTML) {
  let todaysSubjects = {};

  for (let oneClass of todaysSubjectsHTML) {
    const className = oneClass.querySelector('th').innerText.trim() // 'I1a'

    // clone the node so we can remove elements without affecting the original
    let filteredSubjects = oneClass.cloneNode(true) 

    // remove the th element
    filteredSubjects.removeChild(filteredSubjects.querySelector('th'))

    // remove the deleted lessons
    filteredSubjects.querySelectorAll('.ttp-mod-deleted').forEach(lesson => lesson.remove());

    // turn the node into an array
    filteredSubjects = [...filteredSubjects.children].map(lesson => lesson.innerText.trim().split('\n\n'));

    // // remove lessons ["Kraft", "#", "Box"]
    // filteredSubjects = filteredSubjects.filter(lesson => JSON.stringify(lesson.innerText.trim().split('\n\n')) !== 'Kraft' && lesson !== '#' && lesson !== 'Box')
    filteredSubjects = filteredSubjects.map(lessonArray => {
      if (lessonArray.length > 3) {
        // hardcode-remove lesson 'Kraft # Box' if they collide with other lessons
        return lessonArray.filter(lesson => lesson !== 'Kraft' && lesson !== '#' && lesson !== 'Box');
      }
      return lessonArray;
    });

    // save the array to the todaysSubjects object
    todaysSubjects[className] = filteredSubjects
  }

  return todaysSubjects
}

export function cleanTimeStamps(timeStamps) {
  let timestamps = [];
  for (let range of timeStamps) {
      let times = range.trim().split(' - ');
      timestamps.push(times[0], times[1]);
  }
  return timestamps;
}


export function getActiveInterval(currentTime, currentDate, everyTimeStamp, todaysSubjects) {
  let prevEnd = null;
  let nextStart = null;
  let prevInterval = null;
  let found = false;
  let i = 0

  // set i to the first time a lesson starts
  for (let j = 0; j < everyTimeStamp.length; j++) {
    if (JSON.stringify(todaysSubjects[j]) !== '[""]') {i = j; break;}
  }
  
  // Function to combine date and time
  const combineDateTime = (time) => {
    return moment(`${currentDate} ${time}`, 'DD. MMMM YYYY HH:mm');
  };

  // Check if currentTime is before the first interval.
  const [firstStart] = everyTimeStamp[i].trim().split(' - ').map(t => combineDateTime(t));
  if (currentTime.isBefore(firstStart)) {
    return { current: { start: currentTime, end: firstStart }, timeIndex: i, breakTime: true };
  }

  for (i; i < everyTimeStamp.length; i++) {
    const interval = everyTimeStamp[i];
    const [start, end] = interval.trim().split(' - ').map(t => combineDateTime(t));

    if (found) {
      return { current: prevInterval, timeIndex: i, breakTime: false };
    }

    // Check if currentTime is between the end of the previous interval and the start of the current.
    if (prevEnd && currentTime.isBetween(prevEnd, start, null, '[)')) {
      nextStart = start; // The start of the next interval after the gap.
      break; // We found the gap, break the loop.
    }

    // Check if currentTime is within the current interval.
    if (currentTime.isBetween(start, end, null, '[)')) {
      found = true;
      prevInterval = { start, end };
    }

    // Update prevEnd for the next iteration to check gaps.
    prevEnd = end;
  }

  // check if the current time is after the last interval
  if (found && !nextStart) {
    return { current: prevInterval, timeIndex: i };
  }

  // If currentTime falls within a gap, return the gap information.
  if (nextStart) {
    return { current: { start: prevEnd, end: nextStart }, timeIndex: i, breakTime: true };
  }

  // If no conditions met, currentTime is not within any intervals or gaps.
  return 0;
}

export function getNextSubject(timeIndex, todaysSubjects) {
  const currentClassList = todaysSubjects

  if (timeIndex > currentClassList.length - 1) return {subject: "FREI!!!"}; // if the current time is after the last lesson, return a free lesson

  const nextLessonArray = currentClassList[timeIndex] //example: ['E', 'sor', '203']

  log('Die nächste Lektion ist:', nextLessonArray)
  if (JSON.stringify(nextLessonArray) === '[""]') { // '[""]' this needs to be perfectly like this lol
    return {subject: "FREI!!!"};
  } else {
    return {subject: nextLessonArray[0], teacher: nextLessonArray[1], room: nextLessonArray[2]};
  }
}

export function getCurrentClass(todaysSubjects, currentClass) {
  
  return todaysSubjects[currentClass || 'I3a'];
}

export function getYTId(url) {
  // function to get the youtube id from the url.
  // takes a string as an argument
  // returns and object with the id and the type of url (playlist or video)

  // check if the url is a playlist
  const playlistRegex = /list=([a-zA-Z0-9_-]{34})/g;
  const playlistMatch = playlistRegex.exec(url);
  if (playlistMatch) {
    return {id: playlistMatch[1], type: 'playlist'};
  }

  // check if the url is a video
  const videoRegex = /v=([a-zA-Z0-9_-]{11})/g;
  const videoMatch = videoRegex.exec(url);
  if (videoMatch) {
    return {id: videoMatch[1], type: 'video'};
  }

  // should be able to extract id from this url: https://youtu.be/WDISdIhIv6o?si=70ViJPThsG-ky8W1
  const shortVideoRegex = /youtu.be\/([a-zA-Z0-9_-]{11})/g;
  const shortVideoMatch = shortVideoRegex.exec(url);
  if (shortVideoMatch) {
    return {id: shortVideoMatch[1], type: 'video'};
  } 

  // if the url is neither a playlist nor a video, return false
  return false;
}