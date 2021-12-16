import * as fs from "fs";
import { setgroups } from "process";
const str: string = fs.readFileSync("day7/input.txt", "utf-8");

const crabPositions: number[] = str.split(",").map((el) => parseInt(el, 10));

const largestPosition: number = crabPositions.reduce(
    (prev, next) => (next > prev ? next : prev),
    0
);

let positionsList = Array(largestPosition + 1).fill(0);
for (let i = 0; i < positionsList.length; ++i) {
    for (let crab of crabPositions) {
        if (crab === i) {
            positionsList[i]++;
        }
    }
}

function calcFuel(steps: number) {
    let fuel = 0;
    while (steps > 0) {
        fuel += steps;
        steps--;
    }
    console.log(fuel);

    return fuel;
}

let densityMap: number[] = [];
for (let i = 0; i < positionsList.length; ++i) {
    let fuel: number = 0;
    let totalFuel: number = 0;
    let steps: number = 0;
    for (let j = 0; j < positionsList.length; ++j) {
        if (positionsList[j] != 0) {
            steps = Math.abs(j - i);
            fuel = calcFuel(steps);
            totalFuel += fuel * positionsList[j];
        }
        // console.log(
        //     ": ",
        //     i,
        //     " | ",
        //     j,
        //     "steps: ",
        //     steps,
        //     "| fuel:",
        //     fuel,
        //     "| totalFuel: ",
        //     totalFuel
        // );
    }
    densityMap.push(totalFuel);
    // if (i === 6) break;
}

const lowestFuel = densityMap.reduce((prev, next) =>
    prev < next ? prev : next
);

console.log(positionsList);
// console.log(densityMap);
console.log(lowestFuel);
