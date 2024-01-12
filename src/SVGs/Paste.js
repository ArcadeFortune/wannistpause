import { LuYoutube } from "react-icons/lu";
import { useContext } from "react";
import { KshManagerContext } from "../KshManager";

export default function Paste({ text: url }) {
  const ksh = useContext(KshManagerContext);
  return <LuYoutube onClick={(e) => { e.preventDefault(); ksh.setSettings(url, 'YTURL'); console.log(`Verwende nun die neue YouTube URL: '${url}'.`); }} title="Benutze deine YouTube Musik als Hintergrundsmusik im Pomodoro Timer."/>
}