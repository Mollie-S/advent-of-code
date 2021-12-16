import * as fs from "fs";

const string = fs.readFileSync("day6/input.txt", "utf-8");

let lanternfishesSchool: number[] = string
    .split(",")
    .map((fish) => parseInt(fish, 10));

let daysLeft: number[] = Array(9).fill(0);
for (let day = 0; day < daysLeft.length; ++day) {
    for (let fish of lanternfishesSchool) {
        if (fish === day) {
            daysLeft[day]++;
        }
    }
}

function simulateLanternfishesSchoolGrowth(days: number) {
    for (let i = 0; i < days; ++i) {
        let fishesGivingBirth: number = daysLeft[0];
        [
            daysLeft[0],
            daysLeft[1],
            daysLeft[2],
            daysLeft[3],
            daysLeft[4],
            daysLeft[5],
            daysLeft[6],
            daysLeft[7],
            daysLeft[8],
        ] = [
            daysLeft[1],
            daysLeft[2],
            daysLeft[3],
            daysLeft[4],
            daysLeft[5],
            daysLeft[6],
            daysLeft[7],
            daysLeft[8],
            daysLeft[0],
        ];
        daysLeft[6] += fishesGivingBirth;
    }
    // for (let j = 0; j < daysLeft.length; ++j) {
    //     if (daysLeft[0] > 0) {
    //         let newFishes: number = daysLeft[0];
    //     }
}

simulateLanternfishesSchoolGrowth(256);

console.log(daysLeft);
const length = daysLeft.reduce((total, amount) => total + amount, 0);
console.log(length);
