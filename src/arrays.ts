import { isNullishCoalesce } from "typescript";

/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return [];
    } else if (numbers.length === 1) {
        const doubledList = [...numbers, ...numbers];
        return doubledList;
    } else {
        //spread a new list, have first index and last index
        const one = numbers[0];
        const two = numbers[numbers.length - 1];
        const newList = [one, two];
        return newList;
    }
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const tripled = numbers.map((num: number): number => num * 3);
    return tripled;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const ints = numbers.map((num: string): number => parseInt(num) || 0);
    //unsure ab convert to 0 part
    return ints;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    //spread a new list
    //change the ones w $ in front to not have
    //map the whole list again
    const dollars = amounts.map((amount: string): string =>
        amount.charAt(0) === "$" ? amount.substring(1) : amount
    );
    const ints = dollars.map((num: string): number => parseInt(num) || 0);
    return ints;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    // filter OUT questions bc filter returns list WITH condition
    //map thru and modify exclaims
    const noquestions = messages.filter(
        (message: string): boolean => message.includes("?") === false
    );
    const newlist = noquestions.map((message: string): string =>
        message.includes("!") ? message.toUpperCase() : message
    );
    return newlist;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    //use example to count length and return
    const shortwords = words.filter((word: string): boolean => word.length < 4);
    // Get the `length` of the array
    return shortwords.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length === 0) {
        return true;
    } else if (
        colors.every(
            (color: string): boolean =>
                color === "red" || color === "blue" || color === "green"
        )
    ) {
        return true;
    } else return false;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length === 0) {
        return "0=0";
    } else {
        // use reduce for sum bc itll reduce down to a single value
        const sum = addends.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        );
        //join the plus to new list
        const expression = addends.join("+");
        //return string with that new list + last element ?
        // const lastnum=addends[addends.length-1];
        return `${sum}=${expression}`;
    }
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    const allPositive = values.every((value: number): boolean => value >= 0);
    // case for no negatives
    if (allPositive) {
        const sum = values.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        );
        return [...values, sum];
    }
    //case for negatives
    //find index of first neg, copy list up to index using slice
    //do new list with nums up to neg num, sum, nums after neg value?
    else {
        const firstNeg = values.findIndex(
            (value: number): boolean => value < 0
        );
        const upToNeg = values.slice(0, firstNeg); // [1, 9,]
        const sum = upToNeg.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0
        ); //10
        const afterNeg = values.slice(firstNeg + 1); //[7]
        const newList = [...upToNeg, values[firstNeg], sum, ...afterNeg];
        return newList;
    }
}
