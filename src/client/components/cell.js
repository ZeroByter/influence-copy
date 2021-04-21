import React, { Fragment } from "react"
import { RegularPolygon } from 'react-konva';
import { getCellRenderPosition } from "./cellRenderUtilities"

export default class Cell extends React.Component {
    render() {
        const cellRenderPosition = getCellRenderPosition(this.props.x, this.props.y)

        return (
            <Fragment>
                <RegularPolygon
                    x={cellRenderPosition.x}
                    y={cellRenderPosition.y}
                    sides={6}
                    radius={40}
                    fill={this.props.team.color}
                    stroke="black"
                    strokeWidth={4}
                />
            </Fragment>
        )
    }
}