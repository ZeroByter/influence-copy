import React from "react"
import { Group, Layer, Rect } from "react-konva"

export default class DraggableLayer extends React.PureComponent {
    state = {
        x: 0,
        y: 0,
    }

    isMouseDown = false
    mouseDownPosition = { x: 0, y: 0 }
    mouseDownCurrentOffset = { x: 0, y: 0 }

    handleMouseDown = e => {
        this.isMouseDown = true
        this.mouseDownPosition = { x: e.evt.pageX, y: e.evt.pageY }
        this.mouseDownCurrentOffset = { x: this.state.x, y: this.state.y }
    }

    handleMouseMove = e => {
        if (!this.isMouseDown) return

        this.setState({
            x: this.mouseDownCurrentOffset.x + e.evt.pageX - this.mouseDownPosition.x,
            y: this.mouseDownCurrentOffset.y + e.evt.pageY - this.mouseDownPosition.y,
        })
    }

    handleMouseUp = () => {
        this.isMouseDown = false
    }

    handleMouseLeave = () => {
        this.isMouseDown = false
    }

    render() {
        return (
            <Layer onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseLeave}>
                <Rect x={0} y={0} width={10000} height={10000} fill="rgba(0,0,0,0)" />
                <Group x={this.state.x} y={this.state.y}>
                    {this.props.children}
                </Group>
            </Layer>
        )
    }
}