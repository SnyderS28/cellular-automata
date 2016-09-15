import * as React from 'react'
import Cell from './cell'

export default class extends React.PureComponent<{
    cells: boolean[],
    rowIndex: number,
    alterBoard: (rowIndex: number, cellIndex: number) => void
}, {}>{
    render() {
        const {cells, rowIndex, alterBoard} = this.props
        return (
            <div>{
                cells.map((isActive, i) =>
                    <Cell
                    isActive={isActive}
                    rowIndex={rowIndex}
                    alterBoard={alterBoard}
                    cellIndex={i}
                    key={i}/>
                )
            }</div> )
    }
}