import { Day } from "../day";

enum REASON_INPUT {
    'ROCK' = 1,
    'PAPER' = 2,
    'SCISSORS' = 3
}

enum GAME_SCORE {
    'WIN' = 6,
    'DRAW' = 3,
    'LOSE' = 0
}

namespace REASON_INPUT {
    export function roundScore(myInput: REASON_INPUT, opponentInput: REASON_INPUT): number {
        return play(myInput, opponentInput) + myInput; 
    }

    export function predictInput(opponentInput: REASON_INPUT, myInput: string): REASON_INPUT {
        const predictedGameOutcome = gameOutcome(myInput);
        switch (predictedGameOutcome) {
            case GAME_SCORE.DRAW:
                return opponentInput;
            case GAME_SCORE.WIN:
                switch (opponentInput) {
                    case REASON_INPUT.PAPER:
                        return REASON_INPUT.SCISSORS;
                    case REASON_INPUT.ROCK:
                        return REASON_INPUT.PAPER;
                    default:
                        return REASON_INPUT.ROCK;
                }
            case GAME_SCORE.LOSE:
                switch (opponentInput) {
                    case REASON_INPUT.PAPER:
                        return REASON_INPUT.ROCK;
                    case REASON_INPUT.ROCK:
                        return REASON_INPUT.SCISSORS;
                    default:
                        return REASON_INPUT.PAPER;
                }
        }
    }

    export function parseInput(input: string): REASON_INPUT {
        switch (input.toUpperCase()) {
            case 'X':
            case 'A':
                return REASON_INPUT.ROCK;
            case 'Y':
            case 'B':
                return REASON_INPUT.PAPER;
            case 'Z':
            case 'C':
                return REASON_INPUT.SCISSORS;
        }
        return null as any;
    }

    const play = (a: REASON_INPUT, b: REASON_INPUT): number => {
        if (a == b) {
            return GAME_SCORE.DRAW;
        } else if (
            (a === REASON_INPUT.ROCK && b === REASON_INPUT.SCISSORS) ||
            (a === REASON_INPUT.PAPER && b === REASON_INPUT.ROCK) ||
            (a === REASON_INPUT.SCISSORS && b === REASON_INPUT.PAPER)
        ) {
            return GAME_SCORE.WIN;
        }
        return GAME_SCORE.LOSE;
    }

    const gameOutcome = (input: string): GAME_SCORE => {
        switch (input.toUpperCase()) {
            case 'X':
                return GAME_SCORE.LOSE;
            case 'Y':
                return GAME_SCORE.DRAW;
            case 'Z':
                return GAME_SCORE.WIN;
        }
        return null as any;
    }
}

class Day2 extends Day {
    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        let totalScore = 0;
        input.split('\n').forEach(round => {
            if (round !== '') {
                const reasons = round.split(' ');
                const opponentReason = REASON_INPUT.parseInput(reasons[0]);
                const myReason = REASON_INPUT.parseInput(reasons[1]);
                totalScore += REASON_INPUT.roundScore(myReason, opponentReason);
            }
        });
        return `${totalScore}`;
    }

    solveForPartTwo(input: string): string {
        let totalScore = 0;
        input.split('\n').forEach(round => {
            if (round !== '') {
                const reasons = round.split(' ');
                const opponentReason = REASON_INPUT.parseInput(reasons[0]);
                const myReason = REASON_INPUT.predictInput(opponentReason, reasons[1]);
                totalScore += REASON_INPUT.roundScore(myReason, opponentReason);
            }
        });
        return `${totalScore}`;
    }
}

export default new Day2;