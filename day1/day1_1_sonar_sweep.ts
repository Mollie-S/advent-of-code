import * as fs from "fs";

let text = fs.readFileSync("input/day1_input.txt", "utf8");

// console.log(text);

function createListOfDepths(): number[] {
    const depths: number[] = text
        .split("\n")
        .map((depth) => parseInt(depth, 10));
    return depths;
}

function calculateDepthIncreaseNumber(depths: number[]): number {
    let count = 0;
    for (let i = 0; i < depths.length; ++i) {
        if (depths[i] > depths[i - 1]) count++;
    }
    return count;
}

const depthsList: number[] = createListOfDepths();

// console.log(depthsList);
const depthIncreaseNumber: number = calculateDepthIncreaseNumber(depthsList);

console.log(depthIncreaseNumber);
