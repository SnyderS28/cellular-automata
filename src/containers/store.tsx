import * as React from 'react'
import Board from '../components/board'
import Patterns from './patterns'
import {createBoard, createRandomRow, generateRandomActivePatterns} from '../utils'

export default class extends React.PureComponent<{}, {
    boardState: string[],
    activePatterns: string[],
    initialRow: string,
    numOfRows: number,
    numOfCellsInRow: number
}> {
    constructor() {
        super()
        const activePatterns = generateRandomActivePatterns()
        const numOfRows = 50
        const numOfCellsInRow = 50
        const initialRow = createRandomRow(numOfCellsInRow)
        this.state = {
            boardState: createBoard(numOfRows, initialRow, activePatterns),
            activePatterns,
            initialRow,
            numOfRows,
            numOfCellsInRow
        }
        this.changePattern = this.changePattern.bind(this)
        this.alterBoard = this.alterBoard.bind(this)
    }
    changePattern(signature: string, newState: boolean) {
        const {activePatterns, initialRow, numOfRows, numOfCellsInRow} = this.state
        const newActivePatterns = activePatterns.indexOf(signature) >= 0
            ? activePatterns.filter(p => p !== signature)
            : activePatterns.concat([signature])

        this.setState({
            activePatterns: newActivePatterns,
            boardState: createBoard(numOfRows, initialRow, newActivePatterns),
            initialRow,
            numOfRows,
            numOfCellsInRow
        })
    }
    alterBoard(rowIndex: number, cellIndex: number) {
        const {boardState, activePatterns, initialRow, numOfCellsInRow, numOfRows} = this.state
        const row = boardState[rowIndex]
        const newState = row[cellIndex] === '0' ? '1' : '0'
        const alteredRow = row
            .slice(0, cellIndex)
            .concat(newState)
            .concat(row.slice(cellIndex + 1))
        const newBoard = boardState
            .slice(0, rowIndex)
            .concat(createBoard(numOfRows - rowIndex, alteredRow, activePatterns))
        this.setState({
            boardState: newBoard,
            activePatterns,
            initialRow: rowIndex === 0? alteredRow: initialRow,
            numOfRows,
            numOfCellsInRow
        })
    }
    render() {
        const {boardState, activePatterns} = this.state
        return (
            <div>
                <Patterns
                    activePatterns={activePatterns}
                    changePattern={this.changePattern}/>
                <Board
                rows={boardState}
                alterBoard={this.alterBoard}/>
            </div>
        )
    }
}     