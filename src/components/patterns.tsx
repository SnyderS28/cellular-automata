import * as React from 'react'
import Pattern from './pattern'

export default class extends React.PureComponent<{
    patterns: {
        pattern: boolean[];
        signature: string;
        state: boolean;
        changePattern: (signature: string, newState: boolean) => void;
    }[]
},{}> {
    render() {
        const {patterns} = this.props
        return (
            <div>
                <div className="patterns">
                    <h2>Patterns:</h2>{
                    patterns.map(({
                            pattern,
                            state,
                            signature,
                            changePattern}) => {
                        return <Pattern
                        pattern={pattern}
                        signature={signature}
                        state={state}
                        key={signature}
                        onClick={changePattern}/>
                    })
                }</div>
            </div>
        )
    }
}

const objs = [ 
{
    fn: function(a: number, b: string) { return function () {console.log('fn')}},
    pattern: [true, false],
    state: true,
}
]

objs