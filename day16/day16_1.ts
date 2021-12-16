import * as fs from "fs";

const text: string = fs.readFileSync("input/day16_testinput.txt", "utf-8");

const matrix: number[][] = text
    .split("\n")
    .map((line) => line.split("").map((num) => parseInt(num, 10)));

// console.log(matrix);
