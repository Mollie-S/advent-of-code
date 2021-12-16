import * as fs from "fs";
let text = fs.readFileSync("input/day1_input.txt", "utf8");
// console.log(text);
function createListOfDepths() {
    const depths = text
        .split("\n")
        .map((depth) => parseInt(depth, 10));
    return depths;
}
function calculateDepthIncreaseNumber(depths) {
    let count = 0;
    for (let i = 0; i < depths.length; ++i) {
        if (depths[i] > depths[i - 1])
            count++;
    }
    return count;
}
const depthsList = createListOfDepths();
// console.log(depthsList);
const depthIncreaseNumber = calculateDepthIncreaseNumber(depthsList);
console.log(depthIncreaseNumber);
