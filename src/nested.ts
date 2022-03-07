import { stringify } from "querystring";
import { urlToHttpOptions } from "url";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import {
    duplicateQuestion,
    makeBlankQuestion,
    renameQuestion
} from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (question: Question): boolean => question.published
    );
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (question: Question): boolean =>
            !(
                question.body === "" &&
                question.expected === "" &&
                question.options.length === 0
            )
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const target = questions.find(
        (question: Question): boolean => question.id === id
    );
    if (target) {
        return target;
    } else {
        return null;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question: Question): boolean => question.id != id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question): string => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce(
        (currentSum: number, question: Question) =>
            currentSum + question.points,
        0
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    //can we fit a ternary within the reduce function or like do this in one line?
    //or create a new list filtering published, and summing up that
    const published = questions.filter(
        (question: Question): boolean => question.published
    );

    return published.reduce(
        (currentSum: number, question: Question) =>
            currentSum + question.points,
        0
    );
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    // add header string at beginning of def for questionscSV, or in return statement as string, orrr
    //"id,name,options,points,published\n"
    const questionsCSV = questions
        .map(
            (question: Question): string =>
                `${question.id},${question.name},${question.options.length},${question.points},${question.published}`
        )
        .join("\n");
    const fullcsv = "id,name,options,points,published\n" + questionsCSV;

    return fullcsv;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    //creates an array of objects using info from another array of objects
    const answers = questions.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    //return [...questions, published: false];
    return questions.map(
        (question: Question): Question => ({ ...question, published: true })
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    //findIndex for first element
    //use reduce fxn, but the sum in this case is the boolean that "and" the results togethte
    //other way: create new list with just question types, then check if it includes both types
    const questionTypes = questions.map(
        (question: Question): string => question.type
    );
    const allMult = questionTypes.every(
        (qtype: string): boolean => qtype === "multiple_choice_question"
    );
    const allShort = questionTypes.every(
        (qtype: string): boolean => qtype === "short_answer_question"
    );
    return allMult || allShort;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newquestion = makeBlankQuestion(id, name, type);
    return [...questions, newquestion];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map(
        (question: Question): Question =>
            question.id === targetId
                ? renameQuestion(question, newName)
                : question
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    //helper function
    function changeQuestionType(
        question: Question,
        newtype: QuestionType
    ): Question {
        const newquest = { ...question, type: newtype };
        if (newquest.type != "multiple_choice_question") {
            newquest.options = [];
        }
        return newquest;
    }
    return questions.map(
        (question: Question): Question =>
            question.id === targetId
                ? changeQuestionType(question, newQuestionType)
                : question
    );
    //ok u made this longer than it needed to be bc u didnt know why ur map wasnt working
    //remember u can modify a field in a spread operator but just list the field dont specify its object before it
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
) {
    //helper function for option
    function changeOption(question: Question): Question {
        if (targetOptionIndex === -1) {
            const newoptions = [...question.options, newOption];
            //or question.options.splice(-1, 0, newOption)
            // or splice (questions.options.length)
            // or = [...question.options, newOption]
            return { ...question, options: newoptions };
        } else {
            const newoptions = [...question.options];
            newoptions.splice(targetOptionIndex, 1, newOption);
            //newoptions[targetOptionIndex] = newOption;
            return { ...question, options: newoptions };
        }
    }
    return questions.map(
        (question: Question): Question =>
            question.id === targetId ? changeOption(question) : question
    );
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    //find question to duplicate and its index
    // const questDup = questions.find(
    //     (question: Question): boolean => question.id === targetId
    // );
    const ogInd = questions.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    const newArr = [...questions];
    newArr.splice(ogInd + 1, 0, duplicateQuestion(newId, questions[ogInd]));
    return newArr;
}
