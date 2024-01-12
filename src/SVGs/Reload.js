import { TbReload } from "react-icons/tb";

export default function Reload() {
  return <TbReload title="Neuladen" onClick={() => window.location.reload()} />
}
