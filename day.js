// Today as 1,440 squares, one per minute (one block a minute), filled up to the visitor's clock.
// An illustration of the rhythm until mainnet runs; later it can show real blocks from a node.
(() => {
  const grid = document.querySelector("[data-day]");
  const count = document.querySelector("[data-count]");
  if (!grid) return;

  const BLOCKS_PER_DAY = 1440;
  const REWARD = 10;
  const number = new Intl.NumberFormat("en-US");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cells = [];
  const squares = document.createDocumentFragment();
  for (let i = 0; i < BLOCKS_PER_DAY; i++) {
    const cell = document.createElement("i");
    squares.appendChild(cell);
    cells.push(cell);
  }
  grid.appendChild(squares);

  const minuteOfDay = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  let filled = 0; // cells[0 .. filled) are painted as past
  let current = -1;

  function show(minute) {
    if (minute < filled) { // a new day began
      for (let i = 0; i < filled; i++) cells[i].className = "";
      filled = 0;
    }
    for (; filled < minute; filled++) cells[filled].className = "past";
    if (current >= 0 && current !== minute && cells[current].className === "now") cells[current].className = "past";
    cells[minute].className = "now";
    current = minute;
    if (count) {
      count.innerHTML = `block <b>${number.format(minute + 1)}</b> of 1,440 · ${number.format(minute * REWARD)} TC`;
    }
  }

  // On load, sweep through the day so far, then keep time.
  const target = minuteOfDay();
  if (still || target === 0) {
    show(target);
  } else {
    const started = performance.now();
    const duration = 900;
    const step = (time) => {
      const progress = Math.min(1, (time - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      show(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // Browsers pause animation frames in background tabs: make sure the day is shown anyway.
    setTimeout(() => show(minuteOfDay()), duration + 100);
  }

  const tick = () => {
    show(minuteOfDay());
    setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
  };
  setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
})();
