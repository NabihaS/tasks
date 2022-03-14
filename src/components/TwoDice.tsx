import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
// have two buttons with the value
// compare values in return statement
// a helper function for each button
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [dice1, setDice1] = useState<number>(1);
    const [dice2, setDice2] = useState<number>(3);
    function rollLeft(): void {
        setDice1(d6);
    }
    function rollRight(): void {
        setDice2(d6);
    }
    return (
        <div>
            Two Dice
            <div>
                <Button onClick={rollLeft}>Roll Left Die</Button>
                <span data-testid="left-die">{dice1}</span>
            </div>
            <div>
                <Button onClick={rollRight}>Roll Right Die</Button>
                <span data-testid="right-die">{dice2}</span>
            </div>
            {dice1 === dice2 && dice1 === 1 && <div>You Lose!</div>}
            {dice1 === dice2 && dice1 != 1 && <div>You Win!</div>}
        </div>
    );
}
