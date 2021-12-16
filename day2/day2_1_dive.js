import * as fs from "fs";
let text = fs.readFileSync("input/day2_input.txt", "utf8");
const commands = text.split("\n").map((str) => str.split(" "));
// console.log(commands);
let horizontal = 0;
let finalDepth = 0;
for (let i = 0; i < commands.length; ++i) {
    const direction = commands[i][0];
    const unitsNum = parseInt(commands[i][1], 10);
    if (direction === "forward") {
        horizontal += unitsNum;
    }
    else if (direction === "up") {
        finalDepth -= unitsNum;
    }
    else {
        finalDepth += unitsNum;
    }
}
const finalAnswer = horizontal * finalDepth;
// console.log(horizontal);
// console.log(finalDepth);
console.log(finalAnswer);
