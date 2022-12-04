import { Day } from "../day";

class Day4 extends Day {
    ASSIGNMENT_RANGE_SPLITTER = '-';

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        return input.trim().split('\n').map((pair): number => {
            const elfAssignment = pair.trim().split(',');
            const firstAssignmentRange = elfAssignment[0].split(this.ASSIGNMENT_RANGE_SPLITTER);
            const secondAssignmentRange = elfAssignment[1].split(this.ASSIGNMENT_RANGE_SPLITTER);
            const firstRangeStart = parseInt(firstAssignmentRange[0]);
            const firstRangeEnd = parseInt(firstAssignmentRange[1]);
            const secondRangeStart = parseInt(secondAssignmentRange[0]);
            const secondRangeEnd = parseInt(secondAssignmentRange[1]);

            if (
                (firstRangeStart <= secondRangeStart && firstRangeEnd >= secondRangeEnd) ||
                (firstRangeStart >= secondRangeStart && firstRangeEnd <= secondRangeEnd)
                ) {
                return 1;
            }

            return 0;
        }).reduce(this.sumArray, 0).toString();
    }

    solveForPartTwo(input: string): string {
        return input.trim().split('\n').map((pair): number => {
            const elfAssignment = pair.trim().split(',');
            const firstAssignmentRange = elfAssignment[0].split(this.ASSIGNMENT_RANGE_SPLITTER);
            const secondAssignmentRange = elfAssignment[1].split(this.ASSIGNMENT_RANGE_SPLITTER);
            const firstRangeStart = parseInt(firstAssignmentRange[0]);
            const firstRangeEnd = parseInt(firstAssignmentRange[1]);
            const secondRangeStart = parseInt(secondAssignmentRange[0]);
            const secondRangeEnd = parseInt(secondAssignmentRange[1]);

            return Math.max(firstRangeStart, secondRangeStart) <= Math.min(firstRangeEnd, secondRangeEnd) ? 1 : 0;
        }).reduce(this.sumArray, 0).toString();
    }

    private sumArray = (sum: number, current: number) => {
        return sum + current;
    }
}

export default new Day4;