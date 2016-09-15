import * as React from 'react'
import Row from './row'

export default class extends React.PureComponent<{rows: string[]}, {}>{
    render() {
        /**
         * Represents the board state
         * constains rows of cell states
         * if cell is active its value is true, else false
         */
        const rows = this.props.rows
            .map(str => str.split('')
                .map(s => Boolean(Number(s)))
        )
        return (
            <div className="board">{
                rows.map(row => (
                        <Row cells={row}/>
                    ))
            }</div>
        )
    }
}