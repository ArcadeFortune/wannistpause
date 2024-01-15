import { FaLink } from "react-icons/fa6";
import log from "../log";

export default function CopyLink({ link }) {
  log('Möchtest du diesen Link kopieren: ', link);
  return <FaLink title="Link kopieren" onClick={() => navigator.clipboard.writeText(link)} />
}