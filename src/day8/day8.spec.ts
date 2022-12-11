import day8 from './index';

describe('On Day 8', () =>{
    it(`part1 is calculated correctly`, ()=>{
        expect(day8.solveForPartOne(`
30373
25512
65332
33549
35390
`)).toBe('21');
    });

    it(`part2 is calculated correctly`, ()=>{
        expect(day8.solveForPartTwo(`
30373
25512
65332
33549
35390
`)).toBe('8');
    });
});