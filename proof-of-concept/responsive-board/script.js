/**
 * The div element where the board model should be rendered
 */
const board = document.querySelector('.board')

/**
 * @returns the current width (content + padding) of the board
 */
const getBoardWidth = () => board.clientWidth

/**
 * @returns the current height (content + padding) of the board
 */
const getBoardHeight = () => board.clientHeight

/**
 * The function displays the current dimensions of the board
 * inside the element
 */
const displayBoardDimensionsInsideIt = () =>
    board.textContent = `board width: ${getBoardWidth()}px, board height: ${getBoardHeight()}px`
window.addEventListener('resize', displayBoardDimensionsInsideIt)
displayBoardDimensionsInsideIt()