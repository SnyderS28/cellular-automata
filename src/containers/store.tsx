import * as React from 'react'
import Board from '../components/board'
import Patterns from './patterns'
import Controls from '../components/controls'
import {
    createBoard,
    createRandomRow,
    generateRandomActivePatterns,
    getLastItem,
    createNextRow
} from '../utils'

export default class extends React.PureComponent<{}, {
    activePatterns: string[],
    boardState: string[],
    initialRow: string,
    isPlaying: boolean,
    numOfCellsInRow: number,
    numOfRows: number,
    rowKeyOffset: number
}> {
    constructor() {
        super()
        const activePatterns = generateRandomActivePatterns()
        const numOfRows = 50
        const numOfCellsInRow = 50
        const initialRow = createRandomRow(numOfCellsInRow)
        this.state = {
            activePatterns,
            boardState: createBoard(numOfRows, initialRow, activePatterns),
            initialRow,
            isPlaying: false,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset: 0
        }
        this.changePattern = this.changePattern.bind(this)
        this.alterBoard = this.alterBoard.bind(this)
        this.generateRandomBoard = this.generateRandomBoard.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
        this.play = this.play.bind(this)
    }
    changePattern(signature: string, newState: boolean) {
        const {
            activePatterns,
            boardState,
            initialRow,
            isPlaying,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset,
        } = this.state
        const newActivePatterns = activePatterns.indexOf(signature) >= 0
            ? activePatterns.filter(p => p !== signature)
            : activePatterns.concat([signature])

        this.setState({
            activePatterns: newActivePatterns,
            boardState: createBoard(numOfRows, initialRow, newActivePatterns),
            initialRow,
            numOfRows,
            numOfCellsInRow,
            isPlaying,
            rowKeyOffset
        })
    }
    alterBoard(rowIndex: number, cellIndex: number) {
        const {
            activePatterns,
            boardState,
            initialRow,
            isPlaying,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset,
        } = this.state
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
            activePatterns,
            boardState: newBoard,
            initialRow: rowIndex === 0 ? alteredRow : initialRow,
            isPlaying,
            numOfRows,
            numOfCellsInRow,
            rowKeyOffset
        })
    }
    generateRandomBoard() {
        const {
            activePatterns,
            boardState,
            initialRow,
            isPlaying,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset,
        } = this.state
        const newActivePatterns = generateRandomActivePatterns()
        const newBoard = createBoard(numOfRows, createRandomRow(numOfCellsInRow), newActivePatterns)
        this.setState({
           activePatterns: newActivePatterns,
           boardState: newBoard,
           initialRow: newBoard[0],
           isPlaying,
           numOfCellsInRow,
           numOfRows,
           rowKeyOffset
        })
    }
    togglePlay() {
        const {
            activePatterns,
            boardState,
            initialRow,
            isPlaying,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset,
        } = this.state
        if (isPlaying) {
            this.setState({
                activePatterns,
                boardState,
                initialRow,
                isPlaying: false,
                numOfCellsInRow,
                numOfRows,
                rowKeyOffset
            })
        } else {
            this.play(true)
        }
    }
    play(isInitial: boolean) {
        const {
            activePatterns,
            boardState,
            initialRow,
            isPlaying,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset,
        } = this.state
        if (!isInitial && !isPlaying) {
            return
        }
        const lastRow = getLastItem(boardState)
        const newRow = createNextRow(lastRow, activePatterns)
        const newBoard = boardState
            .slice(1)
            .concat([newRow])
        const newInitialRow = newBoard[0]
        this.setState({
            activePatterns,
            boardState: newBoard,
            initialRow: newInitialRow,
            isPlaying: true,
            numOfCellsInRow,
            numOfRows,
            rowKeyOffset: (rowKeyOffset + 1) % (numOfRows + 1)
        }, () => {
            setTimeout(this.play, 50)
        })
    }
    render() {
        const {
            activePatterns,
            boardState,
            isPlaying,
            rowKeyOffset
        } = this.state
        return (
            <div>
                <Controls
                generateRandomBoard={this.generateRandomBoard}
                togglePlay={this.togglePlay}
                isPlaying={isPlaying}/>
                <Patterns
                    activePatterns={activePatterns}
                    changePattern={this.changePattern}/>
                <Board
                alterBoard={this.alterBoard}
                isPlaying={isPlaying}
                rows={boardState}
                rowKeyOffset={rowKeyOffset}/>
            </div>
        )
    }
}     