import { FaLink } from "react-icons/fa6";

export default function CopyLink({ link }) {
  console.log('link: ', link);
  return <FaLink title="Link kopieren" onClick={() => navigator.clipboard.writeText(link)} />
}