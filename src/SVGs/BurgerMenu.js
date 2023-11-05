export function BurgerMenu({ handleClick, className }) {

  return (
    <svg width="1em" height="1em" onClick={handleClick} className={className}>
      {/* <style>@import url('./Countdown.css');</style> */}
      <rect
        x="1"
        y="1"
        width="calc(1em - 2px)"
        height="calc(1em / 6)"
        fill="black"
        rx="2"
        className="text"
      />
      <rect
        x="1"
        y="calc(1em - 1em / 2 - 2px)" //this is inconsistent with the other rects
        width="calc(1em - 2px)"
        height="calc(1em / 6)"
        fill="black"
        rx="2"
        className="text"
      />
      <rect
        x="1"
        y="calc(1em - 1em / 6 - 1px)"
        width="calc(1em - 2px)"
        height="calc(1em / 6)"
        fill="black"
        rx="2"
        className="text"
      />
    </svg>
  );
}
