/**
 * Utils module
 * @module utils 
 */

/**
 * This function creates a random row of 1's and 0's of a specified length
 * @param {Number} length The length of a string
 * @returns {String} Returns the binary string of 1's and 0's i.e. '101000' 
 */
export function createRandomRow(length: number): string {
    if (typeof length !== 'number') {
        throw new Error('length must be a number')
    }
    let row: string = ''
    for (let i = 0; i < length; i++) {
        row += generateRandomBinaryValue().toString(10)
    }
    return row
}

/**
 * This function returns a random value, either 0 or 1
 * @returns {Number} randomly either 0 or 1
 */
function generateRandomBinaryValue(): number {
    return Math.floor(Math.random() * 2)
}

/** 
 * This function creates the next row of cells based on the row given as an argument
 * @param {String} originRow The row that is a basis for the row that will be returned
 * @param {Array} activePatterns The list of patterns that if matched
 * produce a living/active cell
 * @returns {String} Returns a string of 0's and 1's that symbolizes a row of cells
 */
export function createNextRow(originRow: string, activePatterns: string[]):string {
    return originRow
        .split('')
        .map((v, i, values) => calculateValue(i, values, activePatterns))
        .join('')
}

/**
 * This function calculates if a given cell should be active/living or not
 * @param {Number} originalIndex The index of a current cell
 * @param {Array} originalRow The row that contains the current cell ancestors
 * which determine the state of this cell
 * @param {Array} activePatterns The patterns that if matched indicate that
 * the cell is active/alive
 * @returns {String} either '1' if a cell is active/alive or '0' (inactive)
 */
function calculateValue(
    originalIndex: number,
    originalRow: string[],
    activePatterns: string[]
): string {
    const rowLength: number = originalRow.length
    const parentsRelativeIndexes: number[] = [-1, 0, 1]
    const pattern: string = parentsRelativeIndexes
        .map(i => convertRelativeToAbsoluteIndexes(rowLength, originalIndex, i))
        .map(i => originalRow[i])
        .join('')
    return activePatterns.indexOf(pattern) > -1 ?
        '1'
        : '0'
}

/**
 * This function converts relative indexes of the ancestor cells to the proper array indexes.
 * By default each row of cells is perceived as a circle where the beginning of the row is
 * connected with its end
 * @param {Number} arrayLength The length of a row of cells
 * @param {Number} originalIndex The index of a current cell
 * @param {Number} relativeIndex The position of the desired cell relative to the current cell
 * @returns {Number} The real index of a cell in a row
 * @example
 * 
 * // if the index of the current cell is 0, and the desired cell
 * // is on the left (relative index -1), the result will be the last index in a row
 * convertRelativeToAbsoluteIndexes(5, 0, -1) // => 4
 * // similarly if the index is the last cell in a row and
 * the we search for the cell on the right (relative index 1), the result will be the first cell
 * convertRelativeToAbsoluteIndexes(5, 4, 1) // => 0
 */
function convertRelativeToAbsoluteIndexes(
    arrayLength: number,
    originalIndex: number,
    relativeIndex: number
): number {
    return (arrayLength + originalIndex + relativeIndex) % arrayLength
}

/**
 * This function creates a board with cells that adhere to a specified pattern
 * @param {Number} length The number of rows the board will have
 * @param {String} initialRow The first row of the board
 * that will be used as a basis for creating next rows in the format of 1's and 0's i.e. '101'
 * @param {Array} activePatterns The list of patterns that if matched
 * produce a living/active cell 
 */
export function createBoard(
        length: number,
        initialRow: string,
        activePatterns: string[]
    ): string[] {
    const board = [initialRow]

    for (let i = 0; i < length - 1; i++) {
        board.push(
            createNextRow(
                getLastItem(board),
                activePatterns
            )
        )
    }
    return board
}

/**
 * This function gets the last item from the array given as an argument 
 * @param {Array} array array from which to get the last item
 * @example
 * 
 * const nums = [1, 2, 3]
 * getLastItem(nums)
 * // => 3
 */
function getLastItem<T>(array: T[]):T {
    return array[array.length -1]
}

/**
 * This function generates random active patterns.
 * Each pattern is a string of 3 chars, eiter 0 or 1 i.e '010'
 * @returns {Array} An array of active patterns (minimum 0, max 9 items)
 */
export function generateRandomActivePatterns(): string[] {
    const activePatterns: string[] = []
    for (let i = 0; i < 8; i++) {
        const randomBinaryValue = generateRandomBinaryValue()
        if (randomBinaryValue) {
            const iBinaryString = i.toString(2)
            activePatterns.push(
                prependZeros(iBinaryString, 3)
            )
        }
    }
    return activePatterns
}

/**
 * This function prepends a given string with zeroes to make it of a given length
 * @param {String} binaryString The string that should be prepended
 * @param {Number} desiredStringLength The desired length of a string
 * @returns {String} Returns a string of a given length with prepended zeroes if necessary
 */
function prependZeros(binaryString: string, desiredStringLength: number) {
    let prependedString = binaryString
    while (prependedString.length < desiredStringLength) {
        prependedString = '0' + prependedString
    }
    return prependedString
}