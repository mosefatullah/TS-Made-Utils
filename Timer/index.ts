type OnTimerUpdate = (timer: GetTimer) => void;
export type GetTimer = {
 hours: string;
 minutes: string;
 seconds: string;
};

export default class Timer {
 public onUpdate: OnTimerUpdate = () => {};
 public onEnd = () => {};

 private hours: number;
 private minutes: number;
 private seconds: number;
 private isRunning = false;
 private interval: number | null = null;

 constructor(hours: number = 0, minutes: number = 0, seconds: number = 0) {
  this.hours = hours;
  this.minutes = minutes;
  this.seconds = seconds;
 }

 private startTimer() {
  if (!this.isRunning) {
   this.isRunning = true;
   this.updateTime();
   this.interval = window.setInterval(() => {
    this.updateTime();
   }, 1000);
  }
 }
 private stopTimer(): void {
  if (this.isRunning) {
   this.isRunning = false;
   if (this.interval !== null) {
    clearInterval(this.interval);
    this.interval = null;
   }
  }
 }
 private updateTime(): void {
  this.onUpdate(this.get());
  if (this.seconds > 0) {
   this.seconds--;
  } else if (this.minutes > 0) {
   this.seconds = 59;
   this.minutes--;
  } else if (this.hours > 0) {
   this.seconds = 59;
   this.minutes = 59;
   this.hours--;
  } else {
   this.stopTimer();
   this.onEnd();
  }
 }
 private formatTime(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
 }

 public start(): void {
  this.startTimer();
 }

 public resume(): void {
  this.startTimer();
 }

 public pause(): void {
  this.stopTimer();
 }

 public reset(): void {
  this.stopTimer();
  this.seconds = 0;
  this.minutes = 0;
  this.hours = 0;
  this.onUpdate(this.get());
 }

 public get(): GetTimer {
  return {
   hours: this.formatTime(this.hours),
   minutes: this.formatTime(this.minutes),
   seconds: this.formatTime(this.seconds),
  };
 }
}
