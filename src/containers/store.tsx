import * as React from 'react'
import Board from '../components/board'
import Patterns from './patterns'
import {createBoard, createRandomRow, generateRandomActivePatterns} from '../utils'

export default class extends React.PureComponent<{}, {
    boardState: string[],
    activePatterns: string[],
    initialRow: string
}> {
    constructor() {
        super()
        const activePatterns = generateRandomActivePatterns()
        const initialRow = createRandomRow(50)
        this.state = {
            boardState: createBoard(50, initialRow, activePatterns),
            activePatterns,
            initialRow
        }
        this.changePattern = this.changePattern.bind(this)
    }
    changePattern(signature: string, newState: boolean) {
        const {activePatterns, initialRow} = this.state
        const newActivePatterns = activePatterns.indexOf(signature) >= 0
            ? activePatterns.filter(p => p !== signature)
            : activePatterns.concat([signature])

        this.setState({
            activePatterns: newActivePatterns,
            boardState: createBoard(50, initialRow, newActivePatterns),
            initialRow
        })
    }
    render() {
        const {boardState, activePatterns} = this.state
        return (
            <div>
                <Patterns
                    activePatterns={activePatterns}
                    changePattern={this.changePattern}/>
                <Board rows={boardState}/>
            </div>
        )
    }
}     