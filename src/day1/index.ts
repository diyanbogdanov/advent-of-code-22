import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        let maxCalories = 0
        let currentSumCalories = 0;
        input.split('\n').forEach(calories => {
            if (calories == '') {
                if (currentSumCalories > maxCalories) {
                    maxCalories = currentSumCalories;
                }
                currentSumCalories = 0;
            } else {
                currentSumCalories += parseInt(calories);
            }
        })

        return maxCalories.toString();
    }

    solveForPartTwo(input: string): string {
        let topThree = [0,0,0];
        let currentSumCalories = 0;
        input.split('\n').forEach(calories => {
            if (calories == '') {
                if (currentSumCalories > topThree[0]) {
                    topThree[2] = topThree[1];
                    topThree[1] = topThree[0];
                    topThree[0] = currentSumCalories;
                } else if (currentSumCalories > topThree[1]) {
                    topThree[2] = topThree[1];
                    topThree[1] = currentSumCalories;
                } else if (currentSumCalories > topThree[2]) {
                    topThree[2] = currentSumCalories;
                }
                currentSumCalories = 0;
            } else {
                currentSumCalories += parseInt(calories);
            }
        });
        return topThree.reduce((prev, current) => prev += current, 0).toString();
    }
}

export default new Day1;