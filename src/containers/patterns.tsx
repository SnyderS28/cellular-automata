import * as React from 'react'
import Patterns from '../components/patterns'

export default class extends React.PureComponent<{
    activePatterns: string[];
    changePattern: (signature: string, newState: boolean) => void;
},{
    allPatterns: string[]
}> {
    constructor() {
        super()
        this.state = {
            allPatterns: [
                "000",
                "001",
                "010",
                "011",
                "100",
                "101",
                "110",
                "111"
            ].reverse()
        }
    }
    render() {
        const {activePatterns, changePattern} = this.props
        const patterns = this.state.allPatterns.map(pattern => ({
            pattern: pattern
                .split('')
                .map(s => Boolean(Number(s))),
            signature: pattern,
            state: activePatterns.indexOf(pattern) >= 0,
            changePattern: changePattern
        }))
        return <Patterns patterns={patterns}/>
    }
}