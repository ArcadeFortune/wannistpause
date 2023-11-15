// write me a react code that returns a table with one column. the rows should represents these times from this array: ["\n07:45 - 08:30 ","\n08:40 - 09:25 ","\n09:35 - 10:20 ","\n10:40 - 11:25 ","\n11:35 - 12:20 ","\n12:35 - 13:20 ","\n13:30 - 14:15 ","\n14:25 - 15:10 ","\n15:20 - 16:05 ","\n16:15 - 17:00 ","\n17:10 - 17:55 "] it is important that the rows that belong between two elements of the array should have the background color red.
import React, { useContext, useEffect } from 'react';
import { KshManagerContext } from '../KshManager';


export default function TimeTable() {
  const ksh = useContext(KshManagerContext)

  const calculateDuration = (time) => {
    const [start, end] = time.split(' - ');
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    return ((endHours * 60 + endMinutes) - (startHours * 60 + startMinutes));
  };

  return (
    <table>
      {ksh.timeStamps && (
      <tbody>
        {ksh.timeStamps.map((time, index) => {
          const duration = calculateDuration(time);

          return (
            <React.Fragment key={index}>
              <tr style={{ height: `${duration}px` }}>
                <td>{time}</td>
              </tr>
              {index < ksh.timeStamps.length - 1 && (
                <tr style={{ backgroundColor: 'red', height: `${calculateDuration(ksh.timeStamps[index + 1].split(' ')[0] + ' - ' + time.split(' ')[2]) * -1}px` }}>
                  <td></td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>)}
    </table>
  );
}