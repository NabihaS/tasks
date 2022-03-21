import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
export function GiveAttempts(): JSX.Element {
    // the state (model)
    const [attemptsLeft, setAttempts] = useState<number>(3);
    const [requested, setRequested] = useState<number>(0);
    //const requestedint = parseInt(requested) || "error";

    // control
    function setAttemptsLeft(): void {
        setAttempts(attemptsLeft + requested);
    }
    function useAttempt(): void {
        setAttempts(attemptsLeft - 1);
    }
    // view
    return (
        <div>
            <h3>Give Attempts</h3>
            <span>Attempts: {attemptsLeft}</span>
            <Form.Group controlId="formAttemptsRequested">
                <Form.Label>Increase Attempts </Form.Label>
                <Form.Control
                    type="number"
                    value={requested}
                    onChange={(event: ChangeEvent) =>
                        setRequested(parseInt(event.target.value) || 0)
                    }
                ></Form.Control>
            </Form.Group>
            <Button onClick={useAttempt} disabled={attemptsLeft === 0}>
                Use
            </Button>
            <Button onClick={setAttemptsLeft}>Gain</Button>
        </div>
    );
}
