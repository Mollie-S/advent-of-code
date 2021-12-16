import * as fs from "fs";
// import PriorityQueue from "ts-priority-queue";

const text: string = fs.readFileSync("input/day15_testinput.txt", "utf-8");

const matrix: number[][] = text
    .split("\n")
    .map((line) => line.split("").map((num) => parseInt(num, 10)));

// console.log(matrix);

const matrix_height: number = matrix.length;
const matrix_length: number = matrix[0].length;
const max_distance: number = matrix_height * matrix_length * 9;

interface Vertex {
    coordinates: number[];
    distance: number;
    visited: boolean;
}
interface VertexItems extends Array<Vertex> {}

function isQueueEmpty(queue: VertexItems): boolean {
    return queue.length === 0;
}

function fillVertices(): VertexItems {
    let vertices: VertexItems = [];
    for (let y = 0; y < matrix_height; ++y) {
        for (let x = 0; x < matrix_length; ++x) {
            const newVertex: Vertex = {
                coordinates: [y, x],
                distance: max_distance,
                visited: false,
            };
            vertices.push(newVertex);
        }
    }
    // console.log(vertices);

    return vertices;
}

function sortQueue(queue: VertexItems) {
    queue.sort((a: Vertex, b: Vertex) => a.distance - b.distance);
}

function traverseMatrix(start_y: number, start_x: number) {
    let vertices: VertexItems = fillVertices();
    let queue = new Array<Vertex>();
    const initialVertex = vertices[start_y * matrix_length + start_x];
    initialVertex.distance = 0;
    queue.push(initialVertex);
    while (!isQueueEmpty(queue)) {
        sortQueue(queue);
        const curVertex: Vertex = queue.shift()!; // That's the non-null assertion operator. It is a way to tell the compiler "this expression cannot be null or undefined here, so don't complain about the possibility of it being null or undefined." Sometimes the type checker is unable to make that determination itself.
        const curY = curVertex.coordinates[0];
        const curX = curVertex.coordinates[1];
        const nextY = curY + 1;
        const prevY = curY - 1;
        const nextX = curX + 1;
        const prevX = curX - 1;
        let adjBottom: Vertex;
        if (curVertex.coordinates[0] < matrix_height - 1) {
            adjBottom = vertices[nextY * matrix_length + curX];
            if (
                !adjBottom.visited &&
                curVertex.distance + matrix[nextY][curX] < adjBottom.distance
            ) {
                adjBottom.distance = curVertex.distance + matrix[nextY][curX];
                queue.push(adjBottom);
            }
        }
        let adjTop: Vertex;
        if (curVertex.coordinates[0] >= 1) {
            adjTop = vertices[prevY * matrix_length + curX];
            if (
                !adjTop.visited &&
                curVertex.distance + matrix[prevY][curX] < adjTop.distance
            ) {
                adjTop.distance = curVertex.distance + matrix[prevY][curX];
                queue.push(adjTop);
            }
        }
        let adjLeft: Vertex;
        if (curVertex.coordinates[1] >= 1) {
            adjLeft = vertices[curY * matrix_length + prevX];

            if (
                !adjLeft.visited &&
                curVertex.distance + matrix[curY][prevX] < adjLeft.distance
            ) {
                adjLeft.distance = curVertex.distance + matrix[curY][prevX];
                queue.push(adjLeft);
            }
        }
        let adjRight: Vertex;
        if (curVertex.coordinates[1] < matrix_length - 1) {
            adjRight = vertices[curY * matrix_length + nextX];
            if (
                !adjRight.visited &&
                curVertex.distance + matrix[curY][nextX] < adjRight.distance
            ) {
                adjRight.distance = curVertex.distance + matrix[curY][nextX];
                queue.push(adjRight);
            }
        }
        vertices[curY * matrix_length + curX].visited = true;
        // isQueueEmpty = true;
    }
    console.log(
        vertices[(matrix_height - 1) * matrix_length + matrix_length - 1]
            .distance
    );
}

traverseMatrix(0, 0);
