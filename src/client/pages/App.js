import React from 'react';
import { Group, Stage } from 'react-konva';
import Cell from '../components/cell';
import CellLines from '../components/cellLines';
import DraggableLayer from '../components/draggableLayer';
import './app.scss';

export default class App extends React.Component {
	state = {
		teams: [],
		map: {
			width: 0,
			height: 0,
			cells: []
		},
		currentTeam: -1,
		selectedCell: { x: -1, y: -1 }
	}

	componentDidMount() {
		this.props.socket.on("getAllGameData", data => {
			this.setState({
				teams: data.teams,
				map: data.map,
				currentTeam: data.team,
			})
		})

		// const width = 7
		// const height = 7

		// const cells = []

		// for (let y = 0; y < height; y++) {
		// 	for (let x = 0; x < width; x++) {
		// 		if (Math.random() < 0.5) {
		// 			cells[x + y * width] = {
		// 				size: 8,
		// 				team: -1
		// 			}
		// 		}
		// 	}
		// }

		// this.setState({
		// 	map: {
		// 		width,
		// 		height,
		// 		cells
		// 	}
		// })
	}

	getCell = (x, y) => {
		if (x < 0 || y < 0) return null
		if (x > this.state.map.width - 1 || y > this.state.map.height - 1) return null

		return this.state.map.cells[x + y * this.state.map.width]
	}

	handleCellSelected = location => {
		this.setState({
			selectedCell: location
		})
	}

	handleCellAttackSelected = location => {
		
	}

	render() {
		const renderCellLines = this.state.map.cells.map((cell, index) => {
			if (cell == null) return

			const x = index % this.state.map.width
			const y = Math.floor(index / this.state.map.height)

			return <CellLines key={x + "-" + y} x={x} y={y} cell={cell} getCell={this.getCell} />
		})

		const renderCells = this.state.map.cells.map((cell, index) => {
			if (cell == null) return

			const x = index % this.state.map.width
			const y = Math.floor(index / this.state.map.height)

			return <Cell
				key={x + "-" + y}
				x={x}
				y={y}
				cell={cell}
				team={this.state.teams[cell.team]}
				currentTeam={this.state.currentTeam}
				onCellSelected={this.handleCellSelected}
				selectedCell={this.state.selectedCell}
				onCellAttackSelected={this.handleCellAttackSelected}
			/>
		})

		return (
			<div>
				<Stage width={window.innerWidth} height={window.innerHeight}>
					<DraggableLayer>
						<Group>
							{renderCellLines}
						</Group>
						<Group>
							{renderCells}
						</Group>
					</DraggableLayer>
				</Stage>
			</div>
		)
	}
}
