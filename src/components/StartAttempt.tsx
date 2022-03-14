import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, setinProgress] = useState<boolean>(false);
    // have 3 separate functions for each button?
    // then call with a lambda in one statement?
    function startQuiz(): void {
        setinProgress(true);
        setAttempts(attempts - 1);
    }
    function stopQuiz(): void {
        setinProgress(false);
    }
    function Mulligan(): void {
        setAttempts(attempts + 1);
    }
    return (
        <div>
            Current Attempts: <span>{attempts}</span>
            <div>
                <Button
                    onClick={startQuiz}
                    disabled={inProgress || attempts === 0}
                >
                    Start Quiz
                </Button>
                <Button onClick={stopQuiz} disabled={!inProgress}>
                    Stop Quiz
                </Button>
                <Button onClick={Mulligan} disabled={inProgress}>
                    Mulligan
                </Button>
            </div>
        </div>
    );
}
