import { MdArrowForwardIos } from "react-icons/md";

export default function Forward() {
  return <MdArrowForwardIos title="Vorwärts" onClick={() => window.history.forward()} />
} 