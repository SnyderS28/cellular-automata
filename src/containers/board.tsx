import * as React from 'react'
import Board from '../components/board'
import {createBoard, createRandomRow} from '../utils'

export default class extends React.Component<{}, {board: string[]}> {
    constructor() {
        super()
        this.state = {
            board: createBoard(50, createRandomRow(50), ['000'])
        }
    }
    render() {
        const rows = this.state.board
        return (
                <Board rows={rows}/>
        )
    }
}