import * as React from 'react'

export default class extends React.PureComponent<{
    isActive: boolean
}, {}>{
    render() {
        const {isActive} = this.props
        return (
            <div
            className={`pattern__cell${isActive? ' pattern__cell--active' : ''}`}
            ></div>
        )
    }
}