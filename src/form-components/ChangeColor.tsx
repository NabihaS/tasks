import React, { useState } from "react";
import { Form } from "react-bootstrap";
type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
export function ChangeColor(): JSX.Element {
    // state (model)
    const [currColor, setColor] = useState<string>("RosyBrown");
    const COLORS: string[] = [
        "RosyBrown",
        "Pink",
        "PeachPuff",
        "PapayaWhip",
        "PaleVioletRed",
        "PaleTurquoise",
        "LightSlateGray",
        "DarkCyan"
    ];
    // control
    function updateColor(event: ChangeEvent) {
        setColor(event.target.value);
    }
    // view
    return (
        <div>
            <h3>Change Color</h3>
            <ul>
                {COLORS.map((color: string) => (
                    <li
                        key={color}
                        style={{
                            display: "inline",
                            padding: "4px",
                            backgroundColor: color,
                            margin: "5px"
                        }}
                    >
                        <Form.Check
                            inline
                            type="radio"
                            name="colors"
                            onChange={updateColor}
                            id="formColors"
                            label={color}
                            value={color}
                            checked={currColor === color}
                        ></Form.Check>
                    </li>
                ))}
            </ul>
            <span>You chose </span>
            <span
                data-testid="colored-box"
                style={{
                    border: "1px",
                    padding: "8px",
                    backgroundColor: currColor
                }}
            >
                {currColor}
            </span>
        </div>
    );
}
