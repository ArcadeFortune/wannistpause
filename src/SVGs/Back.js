import { MdArrowBackIosNew } from "react-icons/md";

export default function Back() {
  return <MdArrowBackIosNew title="Zurück" onClick={() => window.history.back()} />
}
