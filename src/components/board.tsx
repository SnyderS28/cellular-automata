import * as React from 'react'
import Row from './row'

export default class extends React.PureComponent<{
    alterBoard: (rowIndex: number, cellIndex: number) => void,
    isPlaying: boolean,
    rowKeyOffset: number,
    rows: string[]
}, {}>{
    render() {
        const {
            alterBoard,
            isPlaying,
            rows,
            rowKeyOffset
        } = this.props
        return (
            <div className="board">{
                rows.map((row, i) => (
                        <Row
                        cells={row}
                        key={i + rowKeyOffset}
                        rowIndex={isPlaying? undefined: i}
                        alterBoard={isPlaying? undefined: alterBoard}/>
                    ))
            }</div>
        )
    }
}