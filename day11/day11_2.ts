import * as fs from "fs";

const inputString: string = fs.readFileSync("day11/day11_input1.txt", "utf-8");

const octopuses: number[][] = inputString
    .split("\n")
    .map((s) => s.split("").map(Number));

let flashesCounter: number = 0;
let synchronized: boolean = false;

function floodfill(y: number, x: number, flashesCheckMap: number[][]) {
    if (flashesCheckMap[y][x] === 1) {
        return;
    }
    if (octopuses[y][x] === 9) {
        octopuses[y][x] = 0;
        flashesCounter++;
    } else {
        octopuses[y][x]++;
        return;
    }
    flashesCheckMap[y][x] = 1;
    if (y >= 1) floodfill(y - 1, x, flashesCheckMap);
    if (x >= 1) floodfill(y, x - 1, flashesCheckMap);
    if (y < 9) floodfill(y + 1, x, flashesCheckMap);
    if (x < 9) floodfill(y, x + 1, flashesCheckMap);
    if (y >= 1 && x >= 1) floodfill(y - 1, x - 1, flashesCheckMap);
    if (y < 9 && x >= 1) floodfill(y + 1, x - 1, flashesCheckMap);
    if (y < 9 && x < 9) floodfill(y + 1, x + 1, flashesCheckMap);
    if (y >= 1 && x < 9) floodfill(y - 1, x + 1, flashesCheckMap);
}

for (let i = 1; !synchronized; ++i) {
    let flashesCheckMap: number[][] = Array(10)
        .fill(0)
        .map((row) => Array(10).fill(0));
    for (let y = 0; y < 10; ++y) {
        for (let x = 0; x < 10; ++x) {
            floodfill(y, x, flashesCheckMap);
        }
    }

    let counter: number = 0;
    for (let octopus of octopuses) {
        if (octopus.every((octo) => octo === 0)) {
            counter += 0;
        } else counter += 1;
    }
    if (counter === 0) synchronized = true;
    console.log(i);
    // console.log(octopuses);
}

// console.log(flashesCounter);
