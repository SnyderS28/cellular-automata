import * as React from 'react'
import Cell from './cell'

export default class extends React.Component<{cells: boolean[]}, {}>{
    render() {
        const {cells} = this.props
        return (
            <div>
                {cells.map(isActive =>
                    <Cell isActive={isActive}/>
                )}
            </div>
        )
    }
}