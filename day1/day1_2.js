import * as fs from "fs";
let text = fs.readFileSync("input/day1_input.txt", "utf8");
const depthsList = text.split("\n").map((depth) => parseInt(depth, 10));
// console.log(depthsList);
// every time we need to compare element wth the one which index is 3 higher
//as the two elements in between are the same in both sums:
let groupsIncreaseCount = 0;
const lastIndex = depthsList.length;
for (let i = 0; i < lastIndex; ++i) {
    if (i + 3 < lastIndex && depthsList[i + 3] > depthsList[i]) {
        groupsIncreaseCount++;
    }
}
console.log(groupsIncreaseCount);
