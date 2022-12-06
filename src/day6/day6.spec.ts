import day6 from './index';

describe('On Day 6', () =>{
    it(`part1 is calculated correctly`, ()=>{
        expect(day6.solveForPartOne('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe('5');
        expect(day6.solveForPartOne('nppdvjthqldpwncqszvftbrmjlhg')).toBe('6');
        expect(day6.solveForPartOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe('10');
        expect(day6.solveForPartOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe('11');
    });

    it(`part2 is calculated correctly`, ()=>{
        expect(day6.solveForPartTwo('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe('19');
        expect(day6.solveForPartTwo('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe('23');
        expect(day6.solveForPartTwo('nppdvjthqldpwncqszvftbrmjlhg')).toBe('23');
        expect(day6.solveForPartTwo('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe('29');
        expect(day6.solveForPartTwo('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe('26');
    });
});