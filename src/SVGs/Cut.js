import { IoIosCut } from "react-icons/io";
import { copyText } from "../importantFunctions";

export default function Cut({ text }) {
  return <IoIosCut onClick={async () => { await navigator.clipboard.writeText(text); console.log(`Schneide den Text '${text}'.`); }}/>
}