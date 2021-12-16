import * as fs from "fs";
import { setgroups } from "process";
const str: string = fs.readFileSync("day7/input1.txt", "utf-8");
// parsing data into an array of ints:
const crabPositions: number[] = str.split(",").map((el) => parseInt(el, 10));
// defining the array size:
const largestPosition: number = crabPositions.reduce(
    (prev, next) => (next > prev ? next : prev),
    0
);
// fill array with crab positions:
let positionsList = new Array(largestPosition + 1).fill(0).map((pos, idx) => {
    for (const crab of crabPositions) {
        if (idx === crab) pos++;
    }
    return pos;
});

console.log(positionsList);

let densityMap: number[] = [];
for (let i = 0; i < positionsList.length; ++i) {
    let fuel: number = 0;
    let steps: number = 0;
    for (let j = 0; j < positionsList.length; ++j) {
        if (positionsList[j] != 0) {
            steps = Math.abs(j - i) * positionsList[j];
            fuel += steps;
        }
        // console.log(": ", i, " | ", j, "steps: ", steps, "| fuel:", fuel);
    }
    densityMap.push(fuel);
}

const lowestFuel = Math.min(...densityMap);
//
// console.log(largestPosition);
// console.log(densityMap);
console.log(lowestFuel);
