const fs = require("fs");

let bingo = fs
    .readFileSync("day4/example/input.txt", { encoding: "utf8" })
    .split("\n")[0]
    .split(",")
    .map((n) => Number(n));
let squareTmp = fs
    .readFileSync("day4/example/input.txt", { encoding: "utf8" })
    .split("\n");

square = [];
squareTmp.splice(0, 1);

for (var i = 0; i < squareTmp.length; i++) {
    if (squareTmp[i] == "") {
        square.push([]);
    } else {
        squareTmp[i] = squareTmp[i]
            .split(" ")
            .filter((i) => i !== "")
            .map((n) => Number(n));
        square[square.length - 1].push(squareTmp[i]);
    }
}
square.pop();

squareColumn = [];
for (var j = 0; j < square.length; j++) {
    squareColumn.push([]);
    for (var k = 0; k < square[j].length; k++) {
        squareColumn[j].push([]);
    }
    for (var l = 0; l < square[j].length; l++) {
        var n = 0;
        for (var m = 0; m < square[j][l].length; m++) {
            squareColumn[j][n].push(square[j][l][m]);
            n++;
        }
    }
}

goal = [-1, -1, -1, -1, -1];
var score = 0;

loop: for (var i = 0; i < bingo.length; i++) {
    for (var j = 0; j < square.length; j++) {
        for (var k = 0; k < square[j].length; k++) {
            for (var l = 0; l < square[j][k].length; l++) {
                if (bingo[i] == square[j][k][l]) {
                    square[j][k][l] = -1;
                }
            }
            if (arrayEquals(square[j][k], goal)) {
                if (square.length > 1) {
                    square.splice(j, 1);
                    squareColumn.splice(j, 1);
                    j--;
                    break;
                } else {
                    for (var l = 0; l < square[j].length; l++) {
                        for (var m = 0; m < square[j][l].length; m++) {
                            if (square[j][l][m] != -1) {
                                score += square[j][l][m];
                            }
                        }
                    }
                    score = score * bingo[i];
                    exit = true;
                    break loop;
                }
            }
        }
    }

    for (var j = 0; j < squareColumn.length; j++) {
        for (var k = 0; k < squareColumn[j].length; k++) {
            for (var l = 0; l < squareColumn[j][k].length; l++) {
                if (bingo[i] == squareColumn[j][k][l]) {
                    squareColumn[j][k][l] = -1;
                }
            }
            if (arrayEquals(squareColumn[j][k], goal)) {
                if (squareColumn.length > 1) {
                    squareColumn.splice(j, 1);
                    square.splice(j, 1);
                    j--;
                    break;
                } else {
                    for (var l = 0; l < squareColumn[j].length; l++) {
                        for (var m = 0; m < squareColumn[j][l].length; m++) {
                            if (squareColumn[j][l][m] != -1) {
                                score += squareColumn[j][l][m];
                            }
                        }
                    }
                    score = score * bingo[i];
                    exit = true;
                    break loop;
                }
            }
        }
    }
}

console.log(score);

function arrayEquals(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}
