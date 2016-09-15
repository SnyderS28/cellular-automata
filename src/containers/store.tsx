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
    boardState: string[],
    activePatterns: string[],
    initialRow: string,
    numOfRows: number,
    numOfCellsInRow: number,
    isPlaying: boolean,
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
            numOfCellsInRow,
            isPlaying: false
        }
        this.changePattern = this.changePattern.bind(this)
        this.alterBoard = this.alterBoard.bind(this)
        this.generateRandomBoard = this.generateRandomBoard.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
        this.play = this.play.bind(this)
    }
    changePattern(signature: string, newState: boolean) {
        const {isPlaying, activePatterns, initialRow, numOfRows, numOfCellsInRow} = this.state
        const newActivePatterns = activePatterns.indexOf(signature) >= 0
            ? activePatterns.filter(p => p !== signature)
            : activePatterns.concat([signature])

        this.setState({
            activePatterns: newActivePatterns,
            boardState: createBoard(numOfRows, initialRow, newActivePatterns),
            initialRow,
            numOfRows,
            numOfCellsInRow,
            isPlaying
        })
    }
    alterBoard(rowIndex: number, cellIndex: number) {
        const {isPlaying, boardState, activePatterns, initialRow, numOfCellsInRow, numOfRows} = this.state
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
            numOfCellsInRow,
            isPlaying
        })
    }
    generateRandomBoard() {
        const {isPlaying, activePatterns, initialRow, numOfRows, numOfCellsInRow} = this.state
        const newActivePatterns = generateRandomActivePatterns()
        const newBoard = createBoard(numOfRows, createRandomRow(numOfCellsInRow), newActivePatterns)
        this.setState({
           boardState: newBoard,
           numOfCellsInRow,
           numOfRows,
           initialRow: newBoard[0],
           activePatterns: newActivePatterns,
           isPlaying
        })
    }
    togglePlay() {
        const {
            isPlaying,
            activePatterns,
            initialRow,
            numOfRows,
            numOfCellsInRow,
            boardState
        } = this.state
        if (isPlaying) {
            this.setState({
                isPlaying: false,
                boardState,
                numOfCellsInRow,
                numOfRows,
                initialRow,
                activePatterns
            })
        } else {
            this.play(true)
        }
    }
    play(isInitial: boolean) {
        const {
            isPlaying,
            activePatterns,
            initialRow,
            numOfRows,
            numOfCellsInRow,
            boardState
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
            isPlaying: true,
            boardState: newBoard,
            numOfCellsInRow,
            numOfRows,
            initialRow: newInitialRow,
            activePatterns
        }, () => {
            setTimeout(this.play, 50)
        })
    }
    render() {
        const {boardState, activePatterns, isPlaying} = this.state
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
                rows={boardState}
                alterBoard={this.alterBoard}/>
            </div>
        )
    }
}     