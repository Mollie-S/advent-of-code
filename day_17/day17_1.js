import * as fs from "fs";
const text = fs.readFileSync("input/day17_input.txt", "utf-8");
let [stringX, stringY] = text
    .split(", ")
    .map((substr) => substr.slice(substr.indexOf("=") + 1))
    .map((coord) => coord.split(".."));

const targetArea = {
    "startX": parseInt(stringX[0], 10),
    "endX": parseInt(stringX[1], 10),
    "startY": parseInt(stringY[1], 10),
    "endY": parseInt(stringY[0], 10),
};
// console.log(targetArea);
function calcVelocityX(prevVelocityX) {
    if (prevVelocityX === 0) {
        return prevVelocityX;
    } else if (prevVelocityX > 0) return prevVelocityX - 1;
    else return prevVelocityX - 1;
}
//
// // checking if the current position is inside the target area:
// function hasReachedTargetArea(posX: number, posY: number): boolean {
//     if (
//         posX >= targetArea["startX"] &&
//         posX <= targetArea["endX"] &&
//         posY <= targetArea["startY"] &&
//         posY >= targetArea["endY"]
//     )
//         return true;
//     else return false;
// }
function isInsideTargetX(posX) {
    return posX >= targetArea["startX"] && posX <= targetArea["endX"];
}
function isInsideTargetY(posY) {
    return posY <= targetArea["startY"] && posY >= targetArea["endY"];
}
// checking if the current position is inside the target area:
function isInsideTargetArea(posX, posY) {
    if (isInsideTargetX(posX) && isInsideTargetY(posY)) return true;
    else return false;
}
// finding initial values of X that can get the probe inside the target area
function createSetOfXReachingTargetARea() {
    let matchingX = [];
    for (let x = targetArea["endX"]; x >= 0; --x) {
        let velocity = x;
        let displacementX = velocity;
        let targetNotReached = true;
        while (targetNotReached) {
            if (isInsideTargetX(displacementX)) {
                targetNotReached = false;
                matchingX.push(x);
                break;
            } else if (displacementX > targetArea["endX"] || velocity === 0) {
                targetNotReached = false;
                break;
            }
            velocity = calcVelocityX(velocity);
            displacementX += velocity;
        }
    }
    return matchingX;
}
function collectInitialVelocity(matchingX) {
    let initialVelocity = new Map();
    for (let i = 0; i < matchingX.length; ++i) {
        for (
            let y = targetArea["endY"];
            y < Math.abs(targetArea["endY"]);
            ++y
        ) {
            let velocityX = matchingX[i];
            let velocityY = y;
            let displacementX = velocityX;
            let displacementY = velocityY;
            let targetNotReached = true;
            let maxY = y;
            while (targetNotReached) {
                if (displacementY > maxY) maxY = displacementY;
                if (isInsideTargetArea(displacementX, displacementY) === true) {
                    targetNotReached = false;
                    initialVelocity.set([matchingX[i], y], maxY);
                    break;
                } else if (
                    displacementX > targetArea["endX"] ||
                    displacementY < targetArea["endY"]
                ) {
                    targetNotReached = false;
                    break;
                }
                velocityX = calcVelocityX(velocityX);
                velocityY--;
                displacementX += velocityX;
                displacementY += velocityY;
            }
        }
    }
    return initialVelocity;
}
const matchingX = createSetOfXReachingTargetARea();
const initialVelocity = collectInitialVelocity(matchingX);
// destructuring Map values into an array and then destructuring the array itself
const highestY = Math.max(...[...initialVelocity.values()]);
console.log(highestY);
// console.log(matching.size);
