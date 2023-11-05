export function CrossMark({ handleClick }) {

  return (
    <svg width="2em" height="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <line x1="4" y1="4" x2="28" y2="28" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      <line x1="28" y1="4" x2="4" y2="28" stroke="white" strokeWidth="8" strokeLinecap="round"/>

      <line x1="4" y1="4" x2="28" y2="28" stroke="black" strokeWidth="7" strokeLinecap="round"/>
      <line x1="28" y1="4" x2="4" y2="28" stroke="black" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
}
