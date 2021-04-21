const cellsSeperationDistance = 100

export const getCellRenderPosition = (x, y) => {
    let unevenOffset = 0
    if (y % 2 == 0) {
        unevenOffset = cellsSeperationDistance / 2
    }

    return {
        x: 80 + x * cellsSeperationDistance + unevenOffset,
        y: 80 + y * cellsSeperationDistance * 0.875
    }
}