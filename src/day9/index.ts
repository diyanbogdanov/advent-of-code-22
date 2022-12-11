import { Day } from "../day";

class Day9 extends Day {

    constructor(){
        super(9);
    }

    solveForPartOne(input: string): string {
        let headPosition = [0, 0];
        let tailPosition = [0, 0];
        const tailPositions = new Set<string>();
        input.trim().split('\n').forEach(command => {
            const commandInput = command.split(' ');
            const direction = commandInput[0].toUpperCase();
            const steps = parseInt(commandInput[1]);
            for (let i = 0; i < steps; i++) {
                tailPositions.add(this.positionHash(tailPosition));
                switch (direction) {
                    case 'U':
                        headPosition[1]++;
                        break;
                    case 'R':
                        headPosition[0]++;
                        break;
                    case 'D':
                        headPosition[1]--;
                        break;
                    case 'L':
                        headPosition[0]--;
                        break;
                }
                this.updateTailPosition(headPosition, tailPosition);
            }
        });
        return tailPositions.size.toString();
    }

    solveForPartTwo(input: string): string {
        const ropes: Array<Array<number>> = [];
        for (let i = 0; i < 10; i++) {
            ropes.push([0, 0]);
        }
        const tailPositions = new Set<string>();
        input.trim().split('\n').forEach(command => {
            const commandInput = command.split(' ');
            const direction = commandInput[0].toUpperCase();
            const steps = parseInt(commandInput[1]);
            for (let i = 0; i < steps; i++) {
                switch (direction) {
                    case 'U':
                        ropes[0][1]++;
                        break;
                    case 'R':
                        ropes[0][0]++;
                        break;
                    case 'D':
                        ropes[0][1]--;
                        break;
                    case 'L':
                        ropes[0][0]--;
                        break;
                }
                for (let i = 1; i < 10; i++) {
                    this.updateTailPosition(ropes[i - 1], ropes[i]);
                    tailPositions.add(this.positionHash(ropes[ropes.length - 1]));
                }
            }
        });
        return tailPositions.size.toString();
    }

    private updateTailPosition = (headPosition: number[], tailPosition: number[]): boolean => {
        if (Math.abs(headPosition[0] - tailPosition[0]) > 1 ||
            Math.abs(headPosition[1] - tailPosition[1]) > 1) {
            if (headPosition[0] !== tailPosition[0] &&
                headPosition[1] !== tailPosition[1]) {
                // Diagonal
                if (headPosition[0] > tailPosition[0]) {
                    tailPosition[0]++;
                } else if (headPosition[0] < tailPosition[0]) {
                    tailPosition[0]--;
                }
                if (headPosition[1] > tailPosition[1]) {
                    tailPosition[1]++;
                } else if (headPosition[1] < tailPosition[1]) {
                    tailPosition[1]--;
                }
            } else if (headPosition[0] === tailPosition[0]) {
                // same column
                if (headPosition[1] > tailPosition[1]) {
                    tailPosition[1]++;
                } else {
                    tailPosition[1]--;
                }
            } else if (headPosition[1] === tailPosition[1]) {
                // same row
                if (headPosition[0] > tailPosition[0]) {
                    tailPosition[0]++;
                } else {
                    tailPosition[0]--;
                }
            }
            return true;
        }
        return false;
    }

    private positionHash = (position: number[]): string => {
        return `x:${position[0]};y:${position[1]}`;
    }
}

export default new Day9;