import * as fs from "fs";
const inputString = fs.readFileSync("day13/day13_input1.txt", "utf-8");
let [dotsMapStrings, instructionsStrings] = inputString
    .split("\n\n")
    .map((str) => str.split("\n"));
// console.log("instructionsStrings", instructionsStrings);
const dotsMap = dotsMapStrings.map((coordinates) => coordinates.split(",").map((el) => parseInt(el, 10)));
const instructions = instructionsStrings.map((str) => {
    const m = str.match(/(x|y)\W(\d+)$/);
    if (m !== null)
        return [m[1], m[2]];
});
let dots = {};
let lineAxis = -1;
instructions[0][0] === "x" ? (lineAxis = 0) : (lineAxis = 1);
const lineNumber = parseInt(instructions[0][1], 10);
console.log("lineAxis", lineAxis);
console.log("lineNumber", lineNumber);
dotsMap.forEach((coordinates) => {
    if (coordinates[lineAxis] > lineNumber) {
        let newCoord = lineNumber - (coordinates[lineAxis] - lineNumber);
        console.log("old", coordinates[lineAxis], "newCoord", newCoord);
        coordinates[lineAxis] = newCoord;
    }
    const x = coordinates[0];
    const y = coordinates[1];
    const key = `${x}, ${y}`;
    if (key in dots)
        dots[key]++;
    else
        dots[key] = 1;
});
// dotsMap.forEach(([x, y]) => {
//     const markDot = (x: number, y: number) => {
//         const key = `${x}, ${y}`;
//         if (key in dots) dots[key]++;
//         else dots[key] = 1;
//     };
//     markDot(x, y);
console.log("dots", dots);
// console.log("input", dotsMap);
console.log("instructions", instructions);
const num = Object.keys(dots).length;
console.log(num);
