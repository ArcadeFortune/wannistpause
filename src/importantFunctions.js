import React from "react";
import moment from "moment";


export function renderTime({ remainingTime }) {
  if (remainingTime === 0) return <div className="timer">Pause!</div>;

  return (
    <div className="timer">
      <div className="text">Nur no</div>
      <div className="value">{moment.utc(remainingTime * 1000).format('mm:ss')}</div>
      <div className="text">Minute</div>
    </div>
  );
}

export function getActiveInterval(currentTime, everyTimeStamp) {
  let prevEnd = null;
  let nextStart = null;
  let prevInterval = null;
  let found = false;

  for (let i = 0; i < everyTimeStamp.length; i++) {
    const interval = everyTimeStamp[i];
    const [start, end] = interval.trim().split(' - ').map(t => moment(t, 'HH:mm'));

    if (found) {
      // console.log({ current: prevInterval, next: { start, end } })
      return { current: prevInterval };
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
    return { current: prevInterval, next: null };
  }

  // does not work
  // check if the current time is before the first interval
  // if (!found && !prevEnd) {
  //   console.log('is before the first interval')
  //   return { current: null, next: null, gap: { after: nextStart } };
  // }
  // If currentTime falls within a gap, return the gap information.
  if (nextStart) {
    // console.log({ current: { start: prevEnd, end: nextStart }, next: { start: nextStart }, gap: { before: prevEnd, after: nextStart } })
    return { current: { start: prevEnd, end: nextStart } };
  }

  // If no conditions met, currentTime is not within any intervals or gaps.
  return 0;
}

export function getNextSubject(currentTime, timestamps, everyClass, currentClass) {
  // console.log(getCurrentClass(everyClass, currentClass))
  // console.log(everyClass)
  // console.log(currentClass)
  return {subject: "dummy subject1", room: '101'};
}

function getCurrentClass(everyClass, currentClass) {
  // for (let oneClass of everyClass) {
  //   console.log(oneClass)
  // }
  // return 'test'
}
