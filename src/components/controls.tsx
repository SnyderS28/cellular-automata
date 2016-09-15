import * as React from 'react'

export default class extends React.PureComponent<{
    generateRandomBoard: () => void,
    togglePlay: () => void,
    isPlaying: boolean
},{}> {
    render() {
        const {generateRandomBoard, togglePlay, isPlaying} = this.props
        return (
            <div className="controls">
                <img
                className="controls__icon"
                src="imgs/reload.svg"
                alt="reload"
                onClick={generateRandomBoard}/>
                <img
                className="controls__icon"
                src={`imgs/${isPlaying? 'pause': 'play'}.svg`}
                alt="play"
                onClick={togglePlay}/>
                <a href="http://mathworld.wolfram.com/CellularAutomaton.html" target="help">
                    <img
                    className="controls__icon"
                    src="imgs/lamp.svg"
                    alt="help"/>
                </a>
            </div>
        )
    }
}