import React, { Fragment } from "react"
import { Group, RegularPolygon, Text } from 'react-konva';
import { getCellRenderPosition } from "./cellRenderUtilities"

export default class Cell extends React.Component {
    handleMouseDown = e => {
        if (this.props.cell.team == this.props.currentTeam) {
            this.props.onCellSelected({ x: this.props.x, y: this.props.y })
        } else {
            let selectedCell = this.props.selectedCell
            let cellLocation = { x: this.props.x, y: this.props.y }
            let distance = Math.abs(selectedCell.x - cellLocation.x) + Math.abs(selectedCell.y - cellLocation.y)
            console.log(distance)

            //if(this.)
            this.props.onCellAttackSelected({ x: this.props.x, y: this.props.y })
        }
    }

    render() {
        const cellRenderPosition = getCellRenderPosition(this.props.x, this.props.y)

        return (
            <Fragment>
                <Group onMouseDown={this.handleMouseDown}>
                    <RegularPolygon
                        x={cellRenderPosition.x}
                        y={cellRenderPosition.y}
                        sides={6}
                        radius={40}
                        fill={this.props.team.color}
                        stroke="black"
                        strokeWidth={(this.props.selectedCell.x == this.props.x && this.props.selectedCell.y == this.props.y) ? 4 : 2}
                    />
                    <Text
                        x={cellRenderPosition.x - 40}
                        y={cellRenderPosition.y - 40}
                        text={this.props.cell.size}
                        align="center"
                        verticalAlign="middle"
                        width={40 * 2}
                        height={40 * 2}
                        fontSize={20}
                    />
                    <Text
                        x={cellRenderPosition.x - 40}
                        y={cellRenderPosition.y - 40}
                        text={`${this.props.x},${this.props.y}`}
                        fill="red"
                    />
                </Group>
            </Fragment>
        )
    }
}