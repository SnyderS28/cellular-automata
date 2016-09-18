import * as React from 'react'
import Cell from './cell'

export default class extends React.PureComponent<{
    cells: string,
    rowIndex?: number,
    alterBoard?: (rowIndex: number, cellIndex: number) => void
}, {}>{
    render() {
        const {cells, rowIndex, alterBoard} = this.props
        const cellsBoolean = cells
            .split('')
            .map(s => Boolean(Number(s))
        )
        return (
            <div
            className="row">{
                cellsBoolean.map((isActive, i) =>
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