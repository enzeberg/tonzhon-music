const toMinAndSec = (seconds) => {
  seconds = Math.floor(seconds);
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;
  if (minutes < 10) {
    minutes =`0${minutes}`;
  }
  if (seconds < 10) {
    seconds =`0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export {
  toMinAndSec
};