import React, { useState } from "react";
import { Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    // allows a user to enter an answer to a short answer question
    // displays whether they got it correct or incorrect

    // The state (model)
    const [answer, setAnswer] = useState<string>("");

    // the control - you could also do this
    // const updateAnswer = (event: ChangeEvent) => {
    //     setAnswer(event.target.value);
    // };

    // or this
    // function updateAnswer(event: ChangeEvent) =>{
    //     setAnswer(event.target.value);
    // }

    // the view
    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="formAnswer">
                <Form.Label>
                    Whats the answer to life the universe and everything? Hint:
                    Google it
                </Form.Label>
                <Form.Control
                    type="text"
                    value={answer}
                    onChange={(event: ChangeEvent) =>
                        setAnswer(event.target.value)
                    }
                ></Form.Control>
            </Form.Group>
            <div>{answer === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
