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

// GPT4: in javascript, i have an object, where each value is an array, and in each array, there are a specific amount of nested arrays, though, the amount of nested arrays are common through every value. meaning, every value has one array with the same amount of nested arrays. in every nested array contains a combination of three letters as the second element (index [1])
// for example like the following object:
// const obj = {
//   key1: [['a', 'abc'], ['b', 'xyz']],
//   key2: [['c', 'def'], ['d', 'abc']],
//   key3: [[""],['e','def']],
// };
// notice how the 'abc' and 'def' appears twice. my object, with real data, is similarly built, meaning the three letters (always in index [1]) can appear multiple times, but never in the same index.
// now, i need an alternate version of that same object, where the three letters become the keys, and their values will be the arrays in which those letters appear in, the order of the arrays where they appear in, is kept, and if the three letters do not have any appearance in an index, it would be an empty array ([""]). it is imperative that any information of the nested arrays are kept ('a', 'b', etc.) as well as every value having the same amount of arrays. the key, where the three letters appear in, will be the index[1] of the nested array. in this example, the object would have the 'abc' as the first key, with the value as the two arrays in which those letters appeared, in the first nested array of the new object, having the information 'a' as the index[0] and 'key1' as the index[1], and in the second nested array, having 'd' as the index[0] and 'key2' as the index[1]. and so on.
// how would the new alternate object look like in this case?
export function getEveryTeacherSubject(todaysSubjectsObj) {
  const obj = todaysSubjectsObj;
  const transformedObj = {};

  // Iterate over each key-value pair in the original object
  for (const key in obj) {
    obj[key].forEach((nestedArray, index) => {
      const letterCombo = nestedArray[1];
      
      if (!letterCombo) return;
      
      // Initialize the arrays for each letter combination if not already present
      if (!transformedObj[letterCombo]) {
        transformedObj[letterCombo] = Array(obj[key].length).fill([""]);
      }
  
      // Replace the empty array with the new array containing relevant data
    transformedObj[letterCombo][index] = [nestedArray[0], key, ...nestedArray.slice(2)];
    });
  }

  return transformedObj;
}

// write me a javascript function to sort an object alphabetical
export function sortObj(obj) {
  const sortedObj = {};
  Object.keys(obj).sort().forEach(key => {
      sortedObj[key] = obj[key];
  });
  return sortedObj;
}

export function cleanTimeStamps(timeStamps) {
  let timestamps = [];
  for (let range of timeStamps) {
      let times = range.trim().split(' - ');
      timestamps.push(times[0], times[1]);
  }
  return timestamps;
}

export function getActiveInterval(currentTime, currentDate, everyTimeStamp, todaysSubjects, currentClass) {
  currentClass = currentClass || 'I3a';
  let prevStart = null;
  let prevEnd = null;
  let i = 0  

  // Function to combine date and time
  const combineDateTime = (time) => {
    return moment(`${currentDate} ${time}`, 'DD. MMMM YYYY HH:mm');
  };

  // handle times before the first lesson //
  // set i to the first time a lesson starts
  for (let j = 0; j < everyTimeStamp.length; j++) {
    if (JSON.stringify(todaysSubjects[currentClass][j]) !== '[""]') {i = j; break;}
  }    
  // Check if currentTime is before the first interval.
  const [firstStart] = everyTimeStamp[i].trim().split(' - ').map(t => combineDateTime(t));
  if (currentTime.isBefore(firstStart)) {
    return { current: { start: currentTime, end: firstStart }, timeIndex: i, breakTime: true };
  }

  // loop through every school lesson until it finds the current lesson with the current time
  for (i; i < everyTimeStamp.length; i++) {
    const interval = everyTimeStamp[i];
    const [start, end] = interval.trim().split(' - ').map(t => combineDateTime(t)); // start and end times for the current interval

    // Check if currentTime is between the end of the previous interval and the start of the current (breaktime).
    if (prevEnd && currentTime.isBetween(prevEnd, start, null, '[)')) {
      // if the next lesson is not a lesson (=== '[""]'), set the 'end' of the break to the start of the next real lesson (!== '[""]')
      const nextLesson = todaysSubjects[currentClass][i];
      let startOfNextLesson = start;
      if (JSON.stringify(nextLesson) === '[""]') {
        for (let j = i + 1; j < everyTimeStamp.length; j++) {
          if (JSON.stringify(todaysSubjects[currentClass][j]) !== '[""]') {
            startOfNextLesson = combineDateTime(everyTimeStamp[j].trim().split(' - ')[0]);
            i = j;
            prevEnd = prevStart;
            break;
          }
        }
      }

      // return the break information
      return { current: { start: prevEnd, end: startOfNextLesson }, timeIndex: i, breakTime: true }
    }
    
    // Check if currentTime is within the current interval. (in a lesson)
    if (currentTime.isBetween(start, end, null, '[)')) {
      // if currently, there is no lesson (=== '[""]'), set the 'end' of the lesson to the start of the next real lesson (!== '[""]')
      const currentLesson = todaysSubjects[currentClass][i];
      let endOfCurrentBreak = end;
      if (JSON.stringify(currentLesson) === '[""]') {
        for (let j = i + 1; j < everyTimeStamp.length; j++) {
          if (JSON.stringify(todaysSubjects[currentClass][j]) !== '[""]') {
            endOfCurrentBreak = combineDateTime(everyTimeStamp[j].trim().split(' - ')[0]);
            i = j;
            break;
          }
        }
      }

      const currentInterval = { start, end: endOfCurrentBreak };
      return { current: currentInterval, timeIndex: i + 1, breakTime: false };
    }
    
    // Update prevEnd for the next iteration to check gaps.
    prevStart = start;
    prevEnd = end;
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