import { Day } from "../day";

interface Point {
    x: number;
    y: number;
}

interface ParseResult {
    matrix: Array<Array<number>>;
    starts: Array<Point>; 
    ends: Array<Point>;
}

class Day12 extends Day {

    private BFS_DIRECTIONS: Array<Point> = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];

    constructor(){
        super(12);
    }

    solveForPartOne(input: string): string {
        const inputParse = this.parseInput(input);
        return this.BFS(inputParse.matrix, inputParse.starts[0], inputParse.ends[0]).toString();
    }

    solveForPartTwo(input: string): string {
        let minDist = Number.MAX_VALUE;
        const inputParse = this.parseInput(input, true);
        inputParse.starts.forEach(start => {
            const dist = this.BFS(inputParse.matrix, start, inputParse.ends[0]);
            if (dist > -1) {
                minDist = Math.min(minDist, dist);
            }
        });

        return minDist.toString();
    }

    private parseInput = (input: string, parseAll = false): ParseResult => {
        const result: ParseResult = {
            matrix: [],
            starts: [],
            ends: []
        };

        const startCharCode = 'a'.charCodeAt(0);

        input.trim().split('\n').forEach((row, rowIndex) => {
            const currentRow: Array<number> = [];
            row.trim().split('').forEach((col, colIndex) => {
                if ((parseAll && col.localeCompare('a') === 0) || col.localeCompare('S') === 0) {
                    result.starts.push({x: colIndex, y: rowIndex});
                    currentRow.push(0);
                } else if (col.localeCompare('E') === 0) {
                    result.ends.push({x: colIndex, y: rowIndex});
                    currentRow.push('z'.charCodeAt(0) - startCharCode);
                } else {
                    currentRow.push(col.toLowerCase().charCodeAt(0) - startCharCode);
                }
            });
            result.matrix.push(currentRow);
        });

        return result;
    }

    private BFS = (matrix: Array<Array<number>>, start: Point, end: Point): number => {
        const visited = new Set<string>();
        const queue: Array<{point: Point, steps: number}> = [{point: start, steps: 0}];

        while(queue.length) {
            const cell = queue.shift();

            if (!cell) {
                continue;
            }
 
            if (cell.point.x === end.x && cell.point.y === end.y) {
                return cell.steps;
            }

            this.BFS_DIRECTIONS.forEach(dir => {
                const x = cell.point.x + dir.x;
                const y = cell.point.y + dir.y;
                const point = {x, y};

                if (this.isPointValid(point, matrix) && this.canStep(cell.point, point, matrix, visited)) {
                    visited.add(JSON.stringify(point));
                    queue.push({point, steps: cell.steps + 1});
                }
            });
        }

        return -1;
    }

    private isPointValid = ({x, y}: Point, matrix: Array<Array<number>>): boolean => {
        return y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length;
    }

    private canStep = (currentPoint: Point, nextPoint: Point, matrix: Array<Array<number>>, visited: Set<string>): boolean => {
        return !visited.has(JSON.stringify(nextPoint)) && (matrix[currentPoint.y][currentPoint.x] + 1) >= matrix[nextPoint.y][nextPoint.x];
    }
}

export default new Day12;