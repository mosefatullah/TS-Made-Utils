class Datetime {
 private now: () => Date;
 private locale: string;

 constructor(locale = "en-US") {
  this.now = () => new Date();
  this.locale = locale;
 }

 getDate(): string {
  return this.now().toLocaleString(this.locale, {
   weekday: "long",
   year: "numeric",
   month: "long",
   day: "numeric",
  });
 }

 getTime(): string {
  return this.now().toLocaleString(this.locale, {
   hour: "numeric",
   minute: "numeric",
   second: "numeric",
   hour12: true,
  });
 }
}

export default new Datetime();
