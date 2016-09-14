import * as React from 'react'
import Board from '../components/board'
import {createBoard, createRandomRow, generateRandomActivePatterns} from '../utils'

export default class extends React.Component<{}, {board: string[]}> {
    constructor() {
        super()
        const activePatterns = generateRandomActivePatterns()
        this.state = {
            board: createBoard(50, createRandomRow(50), activePatterns)
        }
    }
    render() {
        const rows = this.state.board
        return (
                <Board rows={rows}/>
        )
    }
}     