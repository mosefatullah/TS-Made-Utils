import Stopwatch from './Stopwatch.js';

const stopwatch = new Stopwatch();

stopwatch.onUpdate = (time) => {
  console.log(`${time.hours}:${time.minutes}:${time.seconds}`);
};

stopwatch.start();
