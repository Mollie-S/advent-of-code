"use strict";
exports.__esModule = true;
var fs = require("fs");
var string = fs.readFileSync("day6/input1.txt", "utf-8");
var lanternfishesSchool = string
    .split(",")
    .map(function (fish) { return parseInt(fish, 10); });
function simulateLanternfishesSchoolGrowth(days) {
    var newFishBorn = false;
    var newFishesNumber = 0;
    for (var i = 0; i <= days; ++i) {
        if (newFishBorn) {
            var newFishes = Array(newFishesNumber).fill(8);
            lanternfishesSchool.push.apply(lanternfishesSchool, newFishes);
            newFishBorn = false;
            newFishesNumber = 0;
        }
        console.log("day ", i, lanternfishesSchool);
        for (var j = 0; j < lanternfishesSchool.length; ++j) {
            if (lanternfishesSchool[j] != 0) {
                lanternfishesSchool[j]--;
            }
            else {
                lanternfishesSchool[j] = 6;
                newFishesNumber++;
                newFishBorn = true;
            }
        }
    }
    return lanternfishesSchool;
}
var largerLanternfishesSchool = simulateLanternfishesSchoolGrowth(18);
console.log(lanternfishesSchool.length);
