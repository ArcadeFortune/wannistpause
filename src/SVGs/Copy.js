import { LuClipboardCopy } from "react-icons/lu";
import { copyText } from "../importantFunctions";

export default function Copy({ text }) {
  return <LuClipboardCopy onClick={async () => { await navigator.clipboard.writeText(text); console.log(`Kopiere den Text '${text}'.`); }} title="Kopiere den ausgewählten Text"/>
}