import * as React from 'react'

export default class extends React.PureComponent<{
    generateRandomBoard: () => void
},{}> {
    render() {
        return (
            <div className="controls">
                <img
                className="controls__icon"
                src="imgs/reload.svg"
                alt="reload"
                onClick={this.props.generateRandomBoard}/>
                <img
                className="controls__icon"
                src="imgs/play.svg"
                alt="play"/>
                <img
                className="controls__icon"
                src="imgs/lamp.svg"
                alt="help"/>
            </div>
        )
    }
}