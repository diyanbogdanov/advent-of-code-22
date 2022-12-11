import { Day } from "../day";

class Day10 extends Day {

    constructor(){
        super(10);
    }

    solveForPartOne(input: string): string {
        let interestedCycles = [20, 60, 100, 140, 180, 220];
        let cycles = 0;
        let result = 0;
        let x = 1;
        input.trim().split('\n').forEach(row => {
            const command = row.trim();
            const cycleCommands = [];
            if (command.startsWith('noop')) {
                cycleCommands.push(0);
            } else {
                cycleCommands.push(0, parseInt(command.split(' ')[1]));
            }

            for (let i = 0; i < cycleCommands.length; i++) {
                cycles++;
                if (interestedCycles.includes(cycles)) {
                    result += cycles * x;
                }
                x += cycleCommands[i];
            }
        });
        return result.toString();
    }

    solveForPartTwo(input: string): string {
        let cycles = 0;
        let result = '';
        let x = 1;
        input.trim().split('\n').forEach(row => {
            const command = row.trim();
            const cycleCommands = [];
            if (command.startsWith('noop')) {
                cycleCommands.push(0);
            } else {
                cycleCommands.push(0, parseInt(command.split(' ')[1]));
            }

            for (let i = 0; i < cycleCommands.length; i++) {
                if (Math.abs(cycles % 40 - x) < 2) {
                    result += '#';
                } else {
                    result += '.';
                }
                cycles++;
                x += cycleCommands[i];
                if (cycles % 40 === 0) {
                    result += '\n';
                }
            }
        });
        return result.toString();
    }
}

export default new Day10;