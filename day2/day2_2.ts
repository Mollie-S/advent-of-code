import * as fs from "fs";

let text: string = fs.readFileSync("input/day2_input.txt", "utf8");
const commands = text.split("\n").map((str) => str.split(" "));

// console.log(commands);

let horizontal = 0;
let finalDepth = 0;

let aim = 0;
for (let i = 0; i < commands.length; ++i) {
    const direction: string = commands[i][0];
    const value: number = parseInt(commands[i][1], 10);
    if (direction === "forward") {
        horizontal += value;
        let depth = aim * value;
        finalDepth += depth;
    } else if (direction === "up") {
        aim -= value;
    } else {
        aim += value;
    }
}
const finalAnswer = horizontal * finalDepth;

// console.log(horizontal);
// console.log(finalDepth);
console.log(finalAnswer);
