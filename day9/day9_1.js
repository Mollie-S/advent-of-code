import * as fs from "fs";
const inputString = fs.readFileSync("day9/day9_input.txt", "utf-8");
const highlevelMap = inputString
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
        //...
        if (less) {
            let riskLevel = highlevelMap[i][j] + 1;
            total += riskLevel;
            console.log(total, "I, J", i, j);
        }
        // if (
        //     i - 1 >= 0 &&
        //     j - 1 >= 0 &&
        //     i + 1 <= highlevelMap.length - 1 &&
        //     j + 1 <= highlevelMap[i].length - 1 &&
        //     highlevelMap[i][j] < highlevelMap[i][j - 1] &&
        //     highlevelMap[i][j] < highlevelMap[i][j + 1] &&
        //     highlevelMap[i][j] < highlevelMap[i - 1][j] &&
        //     highlevelMap[i][j] < highlevelMap[i + 1][j]
        // ) {
        //     let riskLevel = highlevelMap[i][j] + 1;
        //     total += riskLevel;
        //     console.log(total, "I, J", i, j);
        // }
    }
}
//
// for (let i = 1; i < highlevelMap.length - 1; ++i) {
//     for (let j = 0; j < highlevelMap[i].length - 1; ++j) {
//         if (j === 1) break;
//         if (
//             // highlevelMap[i][j] < highlevelMap[i][j - 1] &&
//             highlevelMap[i][j] < highlevelMap[i][j + 1] &&
//             highlevelMap[i][j] < highlevelMap[i - 1][j] &&
//             highlevelMap[i][j] < highlevelMap[i + 1][j]
//         ) {
//             let riskLevel = highlevelMap[i][j] + 1;
//             total += riskLevel;
//             console.log(total, "I, J", i, j);
//         }
//     }
// }
//
// for (let i = 0; i < 2; ++i) {
//     if (i === 1) break;
//     for (let j = 1; j < highlevelMap[i].length - 1; ++j) {
//         if (
//             highlevelMap[i][j] < highlevelMap[i][j - 1] &&
//             highlevelMap[i][j] < highlevelMap[i][j + 1] &&
//             // highlevelMap[i][j] < highlevelMap[i - 1][j] &&
//             highlevelMap[i][j] < highlevelMap[i + 1][j]
//         ) {
//             let riskLevel = highlevelMap[i][j] + 1;
//             total += riskLevel;
//             console.log(total, "I, J", i, j);
//         }
//     }
// }
//
// for (let i = highlevelMap.length - 1; i < highlevelMap.length; ++i) {
//     for (let j = 1; j < highlevelMap[i].length - 1; ++j) {
//         if (
//             highlevelMap[i][j] < highlevelMap[i][j - 1] &&
//             highlevelMap[i][j] < highlevelMap[i][j + 1] &&
//             highlevelMap[i][j] < highlevelMap[i - 1][j]
//             // highlevelMap[i][j] < highlevelMap[i + 1][j]
//         ) {
//             let riskLevel = highlevelMap[i][j] + 1;
//             total += riskLevel;
//             console.log(total, "I, J", i, j);
//         }
//     }
// }
//
// let length_i = highlevelMap.length;
// let length_j = highlevelMap[0].length;
//
// if (
//     highlevelMap[0][0] < highlevelMap[1][0] &&
//     highlevelMap[0][0] < highlevelMap[0][1]
// ) {
//     total += highlevelMap[0][0] + 1;
// }
//
// if (
//     highlevelMap[0][length_j - 1] < highlevelMap[0][length_j - 2] &&
//     highlevelMap[0][length_j - 1] < highlevelMap[1][length_j - 1]
// ) {
//     total += highlevelMap[0][length_j - 1] + 1;
// }
// if (
//     highlevelMap[length_i - 1][0] < highlevelMap[length_i - 1][1] &&
//     highlevelMap[length_i - 1][0] < highlevelMap[length_i - 2][0]
// ) {
//     total += highlevelMap[length_i - 1][0] + 1;
// }
// if (
//     highlevelMap[length_i - 1][length_j - 1] <
//         highlevelMap[length_i - 1][length_j - 2] &&
//     highlevelMap[length_i - 1][length_j - 1] <
//         highlevelMap[length_i - 2][length_j - 1]
// ) {
//     total += highlevelMap[length_i - 1][length_j - 1] + 1;
// }
//
// console.log(total);
//
// for (let i = 1; i < highlevelMap.length - 1; ++i) {
//     for (let j = 0; j < highlevelMap[i].length - 1; ++j) {
//         if (j === 1) break;
//         if (
//             // highlevelMap[i][j] < highlevelMap[i][j - 1] &&
//             highlevelMap[i][j] < highlevelMap[i][j + 1] &&
//             highlevelMap[i][j] < highlevelMap[i - 1][j] &&
//             highlevelMap[i][j] < highlevelMap[i + 1][j]
//         ) {
//             let riskLevel = highlevelMap[i][j] + 1;
//             total += riskLevel;
//             console.log(total, "I, J", i, j);
//         }
//     }
// }
//
// for (let i = 1; i < highlevelMap.length - 1; ++i) {
//     for (let j = length_j - 1; j < length_j; ++j) {
//         if (
//             highlevelMap[i][j] < highlevelMap[i][j - 1] &&
//             // highlevelMap[i][j] < highlevelMap[i][j + 1] &&
//             highlevelMap[i][j] < highlevelMap[i - 1][j] &&
//             highlevelMap[i][j] < highlevelMap[i + 1][j]
//         ) {
//             let riskLevel = highlevelMap[i][j] + 1;
//             total += riskLevel;
//             console.log(total, "I, J", i, j);
//         }
//     }
// }
