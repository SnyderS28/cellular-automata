import * as React from 'react'
import Cell from './pattern-cell'
export default class extends React.PureComponent<{
    pattern: boolean[],
    signature: string,
    state: boolean,
    onClick: (signature: string, newState: boolean) => void
}, {}>{
    render() {
        const {pattern, state, signature, onClick} = this.props
        return (
            <div
                className="pattern-group"
                onClick={() => onClick(signature, !state)}>
                <div className="pattern">{
                    pattern.map((isActive, i) =>
                        <Cell isActive={isActive} key={i}/>
                    )
                }</div>
                <Cell isActive={state}/>
            </div>
        )
    }
}