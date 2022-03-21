import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [student, setStudent] = useState<boolean>(true);
    const [isEditable, setEditable] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>("Your Name");

    function isStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setStudent(event.target.checked);
    }
    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setStudentName(event.target.value);
    }
    function updateEditable(event: React.ChangeEvent<HTMLInputElement>) {
        setEditable(event.target.checked);
    }
    //<span>{studentName "is" student ? " a student" : " not a student"}</span>
    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Check
                type="switch"
                id="is-editable-check"
                label="Editable"
                checked={isEditable}
                onChange={updateEditable}
            ></Form.Check>
            {isEditable && (
                <div>
                    <Form.Group controlId="formName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={studentName}
                            placeholder="Enter student name"
                            onChange={updateStudent}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        id="is-student-check"
                        label="Student"
                        checked={student}
                        onChange={isStudent}
                    ></Form.Check>
                </div>
            )}
            <div>
                {studentName} is {student ? "a student" : "not a student"}
            </div>
        </div>
    );
}
