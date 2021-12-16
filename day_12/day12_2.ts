import * as fs from "fs";

const inputString: string = fs.readFileSync("day12/day12_input3.txt", "utf-8");

const input: string[][] = inputString.split("\n").map((str) => str.split("-"));

// console.log("input", input);

let pathCombinations: { [key: string]: string[] } = {};

// Creating an associative container with names of caves as keys and arrays of adjacent caves names:
input.forEach((path) => {
    const fillCombinations = (first: string, second: string) => {
        if (first === "end" || second === "start") return;
        if (first in pathCombinations) {
            pathCombinations[first].push(second);
        } else pathCombinations[first] = [second];
    };
    let [first, second] = path;
    fillCombinations(first, second);
    fillCombinations(second, first);
});

// console.log(pathCombinations);

let uniquePathsList: string[][] = [];
let pathCounter: number = 0;

// traversing the grath recursively(using the system stack as a way to keep the last traversed value = top of the stack)
function traverseGrath(
    cave: string,
    visitedSmallCaves: Set<string>,
    visitedTwice: string,
    uniquePath: string[]
) {
    if (cave === "end") {
        uniquePath.push("end");
        uniquePathsList.push(uniquePath);
        pathCounter++;
        return;
    }
    uniquePath.push(cave);
    for (let adjacentCave of pathCombinations[cave]) {
        if (!visitedSmallCaves.has(adjacentCave)) {
            // if a lowercased cave:
            if (adjacentCave === adjacentCave.toLowerCase())
                visitedSmallCaves.add(adjacentCave);
            traverseGrath(adjacentCave, visitedSmallCaves, visitedTwice, [
                ...uniquePath,
            ]);
        } else {
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

let visitedSmallCaves = new Set<string>();
// let visitedTwice = new Set<string>();
let visitedTwice: string = "";
traverseGrath("start", visitedSmallCaves, visitedTwice, []);

console.log("uniquePathsList", uniquePathsList);
console.log(pathCounter);
