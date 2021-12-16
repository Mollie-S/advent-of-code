"use strict";
exports.__esModule = true;
var fs = require("fs");
var string = fs.readFileSync("day6/input.txt", "utf-8");
var lanternfishesSchool = string.split(",").map(function (fish) {
    return parseInt(fish, 10);
});
var daysLeft = Array(9).fill(0);
for (var day = 0; day < daysLeft.length; ++day) {
    for (
        var _i = 0, lanternfishesSchool_1 = lanternfishesSchool;
        _i < lanternfishesSchool_1.length;
        _i++
    ) {
        var fish = lanternfishesSchool_1[_i];
        if (fish === day) {
            daysLeft[day]++;
        }
    }
}
function simulateLanternfishesSchoolGrowth(days) {
    var _a;
    for (var i = 0; i < days; ++i) {
        var fishesGivingBirth = daysLeft[0];
        (_a = [
            daysLeft[1],
            daysLeft[2],
            daysLeft[3],
            daysLeft[4],
            daysLeft[5],
            daysLeft[6],
            daysLeft[7],
            daysLeft[8],
            daysLeft[0],
        ]),
            (daysLeft[0] = _a[0]),
            (daysLeft[1] = _a[1]),
            (daysLeft[2] = _a[2]),
            (daysLeft[3] = _a[3]),
            (daysLeft[4] = _a[4]),
            (daysLeft[5] = _a[5]),
            (daysLeft[6] = _a[6]),
            (daysLeft[7] = _a[7]),
            (daysLeft[8] = _a[8]);
        daysLeft[6] += fishesGivingBirth;
    }
}
simulateLanternfishesSchoolGrowth(256);
console.log(daysLeft);
var length = daysLeft.reduce(function (total, amount) {
    return total + amount;
}, 0);
console.log(length);
