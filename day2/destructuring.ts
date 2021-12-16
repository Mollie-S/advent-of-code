import * as fs from "fs";

let text: string = fs.readFileSync("day2/input.txt", "utf8");

let properties = text
    .split("\n")
    .map((keyVal) => {
        return keyVal.split(" ");
    })
    .map(([a, b]) => [a, parseInt(b, 10)]);

console.log(properties);
