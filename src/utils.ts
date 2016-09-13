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

function generateRandomBinaryValue(): number {
    return Math.floor(Math.random() * 2)
}

export function createNextRow(originRow: string, activePatterns: string[]):string {
    let row = originRow
        .split('')
        .map((v, i, values) => calculateValue(i, values, activePatterns))
        .join('')
    return row
}

function calculateValue(originalIndex: number, originalRow: string[], activePatterns: string[]): string {
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

function convertRelativeToAbsoluteIndexes(
    arrayLength: number,
    originalIndex: number,
    relativeIndex: number
): number {
    return (arrayLength + originalIndex + relativeIndex) % arrayLength
}