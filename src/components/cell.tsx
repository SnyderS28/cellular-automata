import * as React from 'react'

export default class extends React.PureComponent<{
    isActive: boolean
    rowIndex?: number,
    cellIndex: number,
    alterBoard?: (rowIndex: number, cellIndex: number) => void
}, {}>{
    render() {
        const {isActive, rowIndex, cellIndex, alterBoard} = this.props
        return (
            <div
            className={`cell${isActive? ' cell--active' : ''}${alterBoard? ' cell--interactive':''}`}
            onClick={
                alterBoard?
                () => alterBoard(rowIndex as number, cellIndex)
                : undefined
            }></div>
        )
    }
}