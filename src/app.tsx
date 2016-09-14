import * as React from 'react'
import {render} from 'react-dom'
import Board from './containers/board'

render(
    <Board/>,
    document.querySelector('.board')
)