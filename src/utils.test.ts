import {expect} from 'chai'

import {
    createRandomRow,
    createNextRow,
    createBoard,
    generateRandomActivePatterns
} from './utils'

describe('createRandomRow', () => {
    it('should return a string', function() {
        expect(createRandomRow(10)).to.be.a('string')
    })
    it('should return a string of a given length', function() {
        expect(createRandomRow(5).length).to.equal(5)
    })
    it('should return a string thatcontains only 1\'s and 0\'s', function() {
        expect(createRandomRow(7)).to.match(/^[01]{7}$/)
    })
    it('should return an empty string if given 0 as an argument', function() {
        expect(createRandomRow(0)).to.equal('')
    })
    it('should throw an error if given not a number as an argument', function() {
        expect(createRandomRow).to.throw()
    })
})

describe('createNextRow', () => {
    it('should return a string', function() {
        const actual = createNextRow('010', ['000'])
        expect(actual).to.be.a('string')
    })
    it('should return a string of the same length as the original row', function() {
        const originString = '00000'
        const expected = originString.length
        const actual = createNextRow(originString, ['000'])
        expect(actual.length).to.equal(expected)
    })
    it('should return a string that adheres to the pattern', function() {
        const tests = [
            {
                originRow: '00000',
                activePatterns: ['000'],
                expected: '11111'
            },{
                originRow: '10100',
                activePatterns: ['101'],
                expected: '01000'
            },{
                originRow: '10110',
                activePatterns: ['101'],
                expected: '01001'
        }]
        tests.forEach(({originRow, activePatterns, expected}) => {
            const actual = createNextRow(originRow, activePatterns)
            expect(actual).to.equal(expected)
        })
    })
}) 

describe('createBoard', () => {
    it('should return an array', function() {
        const actual = createBoard(3, '000', ['000'])
        expect(actual).to.be.an('array')
    })
    it('should return an array of a given length', function() {
        const actual = createBoard(5, '01010', ['000'])
        expect(actual.length).to.equal(5)
    })
    it('should return an array with the initial row as a first item', function() {
        const initialRow = '010'
        const actual = createBoard(3, initialRow, ['000'])
        expect(actual[0]).to.equal(initialRow)
    })
    it('should return an array that adheres to pattern rules', function() {
        const tests = [
            {
                initialRow: '0000',
                length: 3,
                activePatterns: ['000'],
                expected: [
                    '0000',
                    '1111',
                    '0000'
                ]
            },{
                initialRow: '10101',
                length: 3,
                activePatterns: ['000'],
                expected: [
                    '10101',
                    '00000',
                    '11111'
                ]
            }, {
                initialRow: '10101',
                length: 3,
                activePatterns: ['000', '101'],
                expected: [
                    '10101',
                    '01010',
                    '00100'
                ]
            }
        ]
        tests.forEach(({initialRow, length, activePatterns, expected}) => {
            const actual = createBoard(length, initialRow, activePatterns)
            expect(actual).to.eql(expected)
        })
    })
})

describe('generateRandomActivePatterns', () => {
    it('should return an array of active patterns', function() {
        const actual = generateRandomActivePatterns()
        expect(actual).to.be.an('array')
        actual.forEach(pattern =>
            expect(pattern).to.match(/^[01]{3}$/)
        )
    })
    it('should return an array of length between 0 and 9', function() {
        for (let i=0; i<100; i++) {
            const actual = generateRandomActivePatterns()
            expect(actual.length).to.be.within(0,9)
        }
    })
    it('should generate random number of active patterns', function() {
        const actualLengths: number[] = []
        for (let i = 0; i < 10; i++) {
            const actualLength = generateRandomActivePatterns().length
            if (actualLengths.indexOf(actualLength) < 0) {
                actualLengths.push(actualLength)                
            }
        }
        expect(actualLengths).to.have.length.above(1)
    })
})