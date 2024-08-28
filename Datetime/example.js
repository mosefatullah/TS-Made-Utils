import Datetime from "./Datetime";

const datetime1 = new Datetime();
console.log(datetime1.getDate()); // Output: Current date in "en-US" format (e.g., Tuesday, August 27, 2024)
console.log(datetime1.getTime()); // Output: Current time in "en-US" format (e.g., 11:23 AM)

const datetime2 = new Datetime("en-GB"); // Create instance with British English locale
console.log(datetime2.getDate()); // Output: Current date in "en-GB" format
