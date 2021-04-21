import React from "react"
import { Line } from "react-konva"
import { getCellRenderPosition } from "./cellRenderUtilities"

export default class CellLines extends React.Component {
    render() {
        const lines = []

        const cellRenderPosition = getCellRenderPosition(this.props.x, this.props.y)

        if (this.props.getCell(this.props.x - 1, this.props.y)) {
            let otherCellPosition = getCellRenderPosition(this.props.x - 1, this.props.y)

            lines.push(
                <Line
                    key={(this.props.x - 1) + "-" + (this.props.y)}
                    points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
                    stroke="black"
                    strokeWidth={15}
                />
            )
        }
        // if (this.props.getCell(this.props.x + 1, this.props.y)) {
        //     let otherCellPosition = getCellRenderPosition(this.props.x + 1, this.props.y)

        //     lines.push(
        //         <Line
        //             key={(this.props.x + 1) + "-" + (this.props.y)}
        //             points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
        //             stroke="black"
        //             strokeWidth={15}
        //         />
        //     )
        // }
        if (this.props.getCell(this.props.x, this.props.y - 1)) {
            let otherCellPosition = getCellRenderPosition(this.props.x, this.props.y - 1)

            lines.push(
                <Line
                    key={(this.props.x) + "-" + (this.props.y - 1)}
                    points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
                    stroke="black"
                    strokeWidth={15}
                />
            )
        }
        // if (this.props.getCell(this.props.x, this.props.y + 1)) {
        //     let otherCellPosition = getCellRenderPosition(this.props.x, this.props.y + 1)

        //     lines.push(
        //         <Line
        //             key={(this.props.x) + "-" + (this.props.y + 1)}
        //             points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
        //             stroke="black"
        //             strokeWidth={15}
        //         />
        //     )
        // }

        if (this.props.y % 2 == 0) {
            if (this.props.getCell(this.props.x + 1, this.props.y - 1)) {
                let otherCellPosition = getCellRenderPosition(this.props.x + 1, this.props.y - 1)
    
                lines.push(
                    <Line
                        key={(this.props.x + 1) + "-" + (this.props.y - 1)}
                        points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
                        stroke="black"
                        strokeWidth={15}
                    />
                )
            }
        } else {
            if (this.props.getCell(this.props.x - 1, this.props.y - 1)) {
                let otherCellPosition = getCellRenderPosition(this.props.x - 1, this.props.y - 1)
    
                lines.push(
                    <Line
                        key={(this.props.x - 1) + "-" + (this.props.y - 1)}
                        points={[cellRenderPosition.x, cellRenderPosition.y, otherCellPosition.x, otherCellPosition.y]}
                        stroke="black"
                        strokeWidth={15}
                    />
                )
            }
        }

        return lines
    }
}