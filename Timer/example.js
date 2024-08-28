import Timer from "./Timer.js";

const timer = new Timer(1, 30, 0); // Create a timer with 1 hour, 30 minutes, and 0 seconds

timer.onUpdate = (time) => {
  console.log(`${time.hours}:${time.minutes}:${time.seconds}`); // Log the current time
};

timer.onEnd = () => {
  console.log("Timer has ended!");
};

timer.start(); // Start the timer
