import * as fs from "fs";
const inputString = fs.readFileSync("day12/day12_input3.txt", "utf-8");
const input = inputString.split("\n").map((str) => str.split("-"));
// console.log("input", input);
let pathCombinations = {};
input.forEach((path) => {
    const fillCombinations = (first, second) => {
        if (first === "end" || second === "start")
            return;
        if (first in pathCombinations) {
            pathCombinations[first].push(second);
        }
        else
            pathCombinations[first] = [second];
    };
    let [first, second] = path;
    fillCombinations(first, second);
    fillCombinations(second, first);
});
// console.log(pathCombinations);
let uniquePathsList = [];
let pathCounter = 0;
function traverseGrath(cave, visitedSmallCaves, visitedTwice, uniquePath) {
    if (cave === "end") {
        uniquePath.push("end");
        uniquePathsList.push(uniquePath);
        pathCounter++;
        return;
    }
    uniquePath.push(cave);
    for (let adjacentCave of pathCombinations[cave]) {
        if (!visitedSmallCaves.has(adjacentCave)) {
            if (adjacentCave === adjacentCave.toLowerCase())
                visitedSmallCaves.add(adjacentCave);
            traverseGrath(adjacentCave, visitedSmallCaves, visitedTwice, [
                ...uniquePath,
            ]);
        }
        else {
            if (visitedTwice === "") {
                visitedTwice = adjacentCave;
                traverseGrath(adjacentCave, visitedSmallCaves, visitedTwice, [
                    ...uniquePath,
                ]);
                visitedTwice = "";
            }
            continue;
        }
        visitedSmallCaves.delete(adjacentCave);
    }
}
let visitedSmallCaves = new Set();
// let visitedTwice = new Set<string>();
let visitedTwice = "";
traverseGrath("start", visitedSmallCaves, visitedTwice, []);
console.log("uniquePathsList", uniquePathsList);
console.log(pathCounter);
