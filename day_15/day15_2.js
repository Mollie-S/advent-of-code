import * as fs from "fs";
const text = fs.readFileSync("input/day15_input.txt", "utf-8");
const originalMatrix = text
    .split("\n")
    .map((line) => line.split("").map((num) => parseInt(num, 10)));
// console.log("originalMatrix", originalMatrix);
const originalMatrixHeight = originalMatrix.length;
const originalMatrixLength = originalMatrix[0].length;
const matrixHeight = originalMatrixHeight * 5;
const matrixLength = originalMatrixLength * 5;
const maxDistance = matrixHeight * matrixLength * 9;
function fillNewMatrix() {
    let matrix = Array(matrixHeight)
        .fill(-1)
        .map((line) => Array(matrixLength).fill(-2));
    for (let y = 0, y1 = 0; y < matrixHeight; ++y, ++y1) {
        for (let x = 0, x1 = 0; x < matrixLength; ++x, ++x1) {
            if (y < originalMatrixHeight && x < originalMatrixLength)
                matrix[y][x] = originalMatrix[y][x];
            else {
                if (y >= originalMatrixHeight && x < originalMatrixLength) {
                    y1 = y - originalMatrixHeight;
                    x1 = x;
                }
                else {
                    y1 = y;
                    x1 = x - originalMatrixLength;
                }
                let newValue = matrix[y1][x1] + 1;
                if (newValue === 10)
                    newValue = 1;
                matrix[y][x] = newValue;
            }
        }
    }
    return matrix;
}
const matrix = fillNewMatrix();
function isQueueEmpty(queue) {
    return queue.length === 0;
}
function fillVertices() {
    let vertices = [];
    for (let y = 0; y < matrixHeight; ++y) {
        for (let x = 0; x < matrixLength; ++x) {
            const newVertex = {
                coordinates: [y, x],
                distance: maxDistance,
                visited: false,
            };
            vertices.push(newVertex);
        }
    }
    // console.log(vertices);
    return vertices;
}
function sortQueue(queue) {
    queue.sort((a, b) => a.distance - b.distance);
}
function traverseMatrix(start_y, start_x) {
    let vertices = fillVertices();
    let queue = new Array();
    const initialVertex = vertices[start_y * matrixLength + start_x];
    initialVertex.distance = 0;
    queue.push(initialVertex);
    while (!isQueueEmpty(queue)) {
        sortQueue(queue);
        const curVertex = queue.shift(); // That's the non-null assertion operator. It is a way to tell the compiler "this expression cannot be null or undefined here, so don't complain about the possibility of it being null or undefined." Sometimes the type checker is unable to make that determination itself.
        const curY = curVertex.coordinates[0];
        const curX = curVertex.coordinates[1];
        const nextY = curY + 1;
        const prevY = curY - 1;
        const nextX = curX + 1;
        const prevX = curX - 1;
        let adjBottom;
        if (curVertex.coordinates[0] < matrixHeight - 1) {
            adjBottom = vertices[nextY * matrixLength + curX];
            if (!adjBottom.visited &&
                curVertex.distance + matrix[nextY][curX] < adjBottom.distance) {
                adjBottom.distance = curVertex.distance + matrix[nextY][curX];
                queue.push(adjBottom);
            }
        }
        let adjTop;
        if (curVertex.coordinates[0] >= 1) {
            adjTop = vertices[prevY * matrixLength + curX];
            if (!adjTop.visited &&
                curVertex.distance + matrix[prevY][curX] < adjTop.distance) {
                adjTop.distance = curVertex.distance + matrix[prevY][curX];
                queue.push(adjTop);
            }
        }
        let adjLeft;
        if (curVertex.coordinates[1] >= 1) {
            adjLeft = vertices[curY * matrixLength + prevX];
            if (!adjLeft.visited &&
                curVertex.distance + matrix[curY][prevX] < adjLeft.distance) {
                adjLeft.distance = curVertex.distance + matrix[curY][prevX];
                queue.push(adjLeft);
            }
        }
        let adjRight;
        if (curVertex.coordinates[1] < matrixLength - 1) {
            adjRight = vertices[curY * matrixLength + nextX];
            if (!adjRight.visited &&
                curVertex.distance + matrix[curY][nextX] < adjRight.distance) {
                adjRight.distance = curVertex.distance + matrix[curY][nextX];
                queue.push(adjRight);
            }
        }
        vertices[curY * matrixLength + curX].visited = true;
    }
    console.log(vertices[(matrixHeight - 1) * matrixLength + matrixLength - 1].distance);
}
traverseMatrix(0, 0);
