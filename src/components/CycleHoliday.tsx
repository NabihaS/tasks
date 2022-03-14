import React, { useState } from "react";
import { Button } from "react-bootstrap";
// Holidays:  New Years, International Womens, Bubble Tea, Eid, Halloween
// type Holiday = "🥂" | "💪🏽" | "🧋" | "🕌" | "🧚🏽‍♀️";
// ^^ why doesnt this work if i use an interface
const ALPHABETICAL: Record<string, string> = {
    "🧋": "🕌",
    "🕌": "🧚🏽‍♀️",
    "🧚🏽‍♀️": "💪🏽",
    "💪🏽": "🥂",
    "🥂": "🧋"
};
const CHRONOL: Record<string, string> = {
    "🥂": "💪🏽",
    "💪🏽": "🧋",
    "🧋": "🕌",
    "🕌": "🧚🏽‍♀️",
    "🧚🏽‍♀️": "🥂"
};
export function CycleHoliday(): JSX.Element {
    // are the record keys labeled with string keys mapped to an emoji in return
    // or the emoji is the key too
    const [holiday, setHoliday] = useState<string>("🕌");
    function cyclebyAlph(): void {
        const newHoliday = ALPHABETICAL[holiday];
        setHoliday(newHoliday);
    }
    function cyclebyYear(): void {
        const newHoliday = CHRONOL[holiday];
        setHoliday(newHoliday);
    }
    return (
        <div>
            Cycle Holiday
            <div>
                <Button onClick={cyclebyAlph}>Cycle by Alphabet</Button>
                <Button onClick={cyclebyYear}>Cycle by Year</Button>
            </div>
            <span>Holiday: {holiday}</span>
        </div>
    );
}
