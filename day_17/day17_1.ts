import * as fs from "fs";

const text: string = fs.readFileSync("input/day17_input.txt", "utf-8");

let [stringX, stringY]: string[][] = text
    .split(", ")
    .map((substr) => substr.slice(substr.indexOf("=") + 1))
    .map((coord) => coord.split(".."));

const targetArea: { [key: string]: number } = {
    "startX": parseInt(stringX[0], 10),
    "endX": parseInt(stringX[1], 10),
    "startY": parseInt(stringY[1], 10),
    "endY": parseInt(stringY[0], 10),
};
// console.log(targetArea);

function calcVelocityX(prevVelocityX: number): number {
    if (prevVelocityX === 0) {
        return prevVelocityX;
    } else if (prevVelocityX > 0) return prevVelocityX - 1;
    else return prevVelocityX - 1;
}

function isInsideTargetX(posX: number): boolean {
    return posX >= targetArea["startX"] && posX <= targetArea["endX"];
}

function isInsideTargetY(posY: number): boolean {
    return posY <= targetArea["startY"] && posY >= targetArea["endY"];
}

// checking if the current position is inside the target area:
function isInsideTargetArea(posX: number, posY: number): boolean {
    if (isInsideTargetX(posX) && isInsideTargetY(posY)) return true;
    else return false;
}

// finding initial values of X that can get the probe inside the target area
function createSetOfXReachingTargetARea(): number[] {
    let matchingX: number[] = [];
    for (let x: number = targetArea["endX"]; x >= 0; --x) {
        let velocity: number = x;
        let displacementX: number = velocity;
        let targetNotReached: boolean = true;
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
// taking the set of filtered X's and checking if they still reach the target area with the range of Y's.
// returning the map of the velocity and the maxY that the probe can reach starting with the given speed
function collectInitialVelocity(matchingX: number[]): Map<number[], number> {
    let initialVelocity = new Map<number[], number>();

    for (let i = 0; i < matchingX.length; ++i) {
        for (
            let y = targetArea["endY"];
            y < Math.abs(targetArea["endY"]);
            ++y
        ) {
            let velocityX: number = matchingX[i];
            let velocityY: number = y;
            let displacementX: number = velocityX;
            let displacementY: number = velocityY;
            let targetNotReached: boolean = true;
            let maxY: number = y;
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

const matchingX: number[] = createSetOfXReachingTargetARea();
const initialVelocity: Map<number[], number> = collectInitialVelocity(
    matchingX
);

// destructuring Map values into an array and then destructuring the array itself
const highestY: number = Math.max(...[...initialVelocity.values()]);

console.log(highestY);
