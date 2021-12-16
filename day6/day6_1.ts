import * as fs from "fs";

const string = fs.readFileSync("day6/input1.txt", "utf-8");

let lanternfishesSchool: number[] = string
    .split(",")
    .map((fish) => parseInt(fish, 10));

function simulateLanternfishesSchoolGrowth(days: number) {
    let newFishBorn = false;
    let newFishesNumber = 0;
    for (let i = 0; i <= days; ++i) {
        if (newFishBorn) {
            let newFishes = Array(newFishesNumber).fill(8);
            lanternfishesSchool.push(...newFishes);
            newFishBorn = false;
            newFishesNumber = 0;
        }
        console.log("day ", i, lanternfishesSchool);
        for (let j = 0; j < lanternfishesSchool.length; ++j) {
            if (lanternfishesSchool[j] != 0) {
                lanternfishesSchool[j]--;
            } else {
                lanternfishesSchool[j] = 6;
                newFishesNumber++;
                newFishBorn = true;
            }
        }
    }
    return lanternfishesSchool;
}
let largerLanternfishesSchool: number[] = simulateLanternfishesSchoolGrowth(18);

console.log(lanternfishesSchool.length);
