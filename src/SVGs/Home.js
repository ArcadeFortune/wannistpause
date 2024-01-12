import { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { KshManagerContext } from "../KshManager";

export default function Reload() {
  const ksh = useContext(KshManagerContext)
  return <IoHome title="Wann ist eigentlich Pause?" onClick={() => ksh.navigate('/')}/>
}
