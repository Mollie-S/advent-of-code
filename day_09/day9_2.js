import * as fs from "fs";
const inputString = fs.readFileSync("day9/day9_input1.txt", "utf-8");
const highlevelMap = inputString
    .split("\n")
    .map((s) => s.split("").map((el) => parseInt(el, 10)));
// console.log(highlevelMap);
let length_i = highlevelMap.length;
let length_j = highlevelMap[0].length;
function floodfill(y, x, checkMap) {
    // if reached 9 or I've already been here
    if (highlevelMap[y][x] === 9 || checkMap[y][x] === 1) {
        return;
    }
    checkMap[y][x] = 1;
    if (y >= 1 && highlevelMap[y - 1][x] > highlevelMap[y][x])
        floodfill(y - 1, x, checkMap);
    if (x >= 1 && highlevelMap[y][x - 1] > highlevelMap[y][x])
        floodfill(y, x - 1, checkMap);
    if (y < length_i - 1 && highlevelMap[y + 1][x] > highlevelMap[y][x])
        floodfill(y + 1, x, checkMap);
    if (x < length_j - 1 && highlevelMap[y][x + 1] > highlevelMap[y][x])
        floodfill(y, x + 1, checkMap);
}
function calcBasinSize(y, x) {
    let checkMap = Array(length_i)
        .fill(0)
        .map((i) => Array(length_j).fill(0));
    floodfill(y, x, checkMap);
    // console.log("checkMap", checkMap);
    // calc num of elements in every row and total
    let size = checkMap.reduce((total, y) => total +
        y.reduce((counter, markedElement) => markedElement === 1 ? counter + 1 : counter, 0), 0);
    console.log("size", size);
    return size;
}
let basinSizes = [];
let largestBasinsSize = Array(3).fill(0); // another option to find 3 largest basins
for (let i = 0; i < highlevelMap.length; ++i) {
    for (let j = 0; j < highlevelMap[i].length; ++j) {
        let less = true;
        if (i >= 1 && highlevelMap[i - 1][j] <= highlevelMap[i][j]) {
            less = false;
        }
        if (less && j >= 1 && highlevelMap[i][j - 1] <= highlevelMap[i][j]) {
            less = false;
        }
        if (less &&
            i < length_i - 1 &&
            highlevelMap[i + 1][j] <= highlevelMap[i][j]) {
            less = false;
        }
        if (less &&
            j < length_j - 1 &&
            highlevelMap[i][j + 1] <= highlevelMap[i][j]) {
            less = false;
        }
        if (less) {
            let startingPoint = highlevelMap[i][j];
            let basinSize = calcBasinSize(i, j);
            // basinSizes.push(basinSize);
            largestBasinsSize = largestBasinsSize
                .sort((a, b) => a - b)
                .map((el) => {
                if (basinSize > el)
                    return basinSize;
                return el;
            });
        }
    }
}
// let basinSizesSorted = basinSizes.sort((a, b) => b - a); // descending order!
// let result = basinSizesSorted[0] * basinSizesSorted[1] * basinSizesSorted[2];
// console.log("basinSizes", basinSizes);
// console.log("basinSizesSorted", basinSizesSorted);
console.log("largestBasinsSize", largestBasinsSize);
const result = largestBasinsSize.reduce((product, nextel) => product * nextel, 1);
console.log("result", result);
// another option is to compare basinSize with the largestBasinsSize array every time the size is found:
// largestBasinsSize.map((el) => {
//     if (basinSize > el) return basinSize;
//     return el;
// });
