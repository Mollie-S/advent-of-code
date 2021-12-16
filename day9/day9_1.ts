import * as fs from "fs";

const inputString: string = fs.readFileSync("day9/day9_input.txt", "utf-8");

const highlevelMap: number[][] = inputString
    .split("\n")
    .map((s) => s.split("").map((el) => parseInt(el, 10)));

console.log(highlevelMap);

let total = 0;

for (let i = 0; i < highlevelMap.length; ++i) {
    for (let j = 0; j < highlevelMap[i].length; ++j) {
        let less = true;
        let length_i = highlevelMap.length;
        let length_j = highlevelMap[0].length;

        if (i >= 1 && highlevelMap[i - 1][j] <= highlevelMap[i][j]) {
            less = false;
        }

        if (less && j >= 1 && highlevelMap[i][j - 1] <= highlevelMap[i][j]) {
            less = false;
        }

        if (
            less &&
            i < length_i - 1 &&
            highlevelMap[i + 1][j] <= highlevelMap[i][j]
        ) {
            less = false;
        }

        if (
            less &&
            j < length_j - 1 &&
            highlevelMap[i][j + 1] <= highlevelMap[i][j]
        ) {
            less = false;
        }

        if (less) {
            let riskLevel = highlevelMap[i][j] + 1;
            total += riskLevel;
            console.log(total, "I, J", i, j);
        }
    }
}
