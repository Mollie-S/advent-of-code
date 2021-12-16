import * as fs from "fs";
const inputString = fs.readFileSync("day12/day12_input2.txt", "utf-8");
const input = inputString.split("\n").map((str) => str.split("-"));
console.log("input", input);
let pathCombinations = {};
input.forEach((path) => {
    const fillCombinations = (key, value) => {
        if (key === "end" || value === "start")
            return;
        if (key in pathCombinations) {
            pathCombinations[key].push(value);
        }
        else
            pathCombinations[key] = [value];
    };
    let [first, second] = path;
    fillCombinations(first, second);
    fillCombinations(second, first);
});
console.log(pathCombinations);
let uniquePathsList = [];
let pathCounter = 0;
function traverseGrath(cave, visitedSmallCaves, uniquePath) {
    if (cave === "end") {
        uniquePath.push("end");
        uniquePathsList.push(uniquePath);
        pathCounter++;
        // console.log("visitedSmallCaves after end", visitedSmallCaves);
        return;
    }
    uniquePath.push(cave);
    for (let adjacentCave of pathCombinations[cave]) {
        if (!visitedSmallCaves.has(adjacentCave)) {
            if (adjacentCave === adjacentCave.toLowerCase())
                visitedSmallCaves.add(adjacentCave);
            traverseGrath(adjacentCave, visitedSmallCaves, [...uniquePath]);
        }
        else {
            continue;
        }
        visitedSmallCaves.delete(adjacentCave);
    }
}
let visitedSmallCaves = new Set();
traverseGrath("start", visitedSmallCaves, []);
// console.log("uniquePathsList", uniquePathsList);
console.log(pathCounter);
