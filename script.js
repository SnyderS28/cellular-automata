/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var react_dom_1 = __webpack_require__(2);
	var store_1 = __webpack_require__(3);
	react_dom_1.render(React.createElement(store_1.default, null), document.getElementById('app'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var board_1 = __webpack_require__(4);
	var patterns_1 = __webpack_require__(7);
	var controls_1 = __webpack_require__(11);
	var utils_1 = __webpack_require__(12);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.call(this);
	        var activePatterns = utils_1.generateRandomActivePatterns();
	        var numOfRows = 50;
	        var numOfCellsInRow = 50;
	        var initialRow = utils_1.createRandomRow(numOfCellsInRow);
	        this.state = {
	            activePatterns: activePatterns,
	            boardState: utils_1.createBoard(numOfRows, initialRow, activePatterns),
	            initialRow: initialRow,
	            isPlaying: false,
	            numOfCellsInRow: numOfCellsInRow,
	            numOfRows: numOfRows,
	            rowKeyOffset: 0
	        };
	        this.changePattern = this.changePattern.bind(this);
	        this.alterBoard = this.alterBoard.bind(this);
	        this.generateRandomBoard = this.generateRandomBoard.bind(this);
	        this.togglePlay = this.togglePlay.bind(this);
	        this.play = this.play.bind(this);
	    }
	    default_1.prototype.changePattern = function (signature, newState) {
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, initialRow = _a.initialRow, isPlaying = _a.isPlaying, numOfCellsInRow = _a.numOfCellsInRow, numOfRows = _a.numOfRows, rowKeyOffset = _a.rowKeyOffset;
	        var newActivePatterns = activePatterns.indexOf(signature) >= 0
	            ? activePatterns.filter(function (p) { return p !== signature; })
	            : activePatterns.concat([signature]);
	        this.setState({
	            activePatterns: newActivePatterns,
	            boardState: utils_1.createBoard(numOfRows, initialRow, newActivePatterns),
	            initialRow: initialRow,
	            numOfRows: numOfRows,
	            numOfCellsInRow: numOfCellsInRow,
	            isPlaying: isPlaying,
	            rowKeyOffset: rowKeyOffset
	        });
	    };
	    default_1.prototype.alterBoard = function (rowIndex, cellIndex) {
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, initialRow = _a.initialRow, isPlaying = _a.isPlaying, numOfCellsInRow = _a.numOfCellsInRow, numOfRows = _a.numOfRows, rowKeyOffset = _a.rowKeyOffset;
	        var row = boardState[rowIndex];
	        var newState = row[cellIndex] === '0' ? '1' : '0';
	        var alteredRow = row
	            .slice(0, cellIndex)
	            .concat(newState)
	            .concat(row.slice(cellIndex + 1));
	        var newBoard = boardState
	            .slice(0, rowIndex)
	            .concat(utils_1.createBoard(numOfRows - rowIndex, alteredRow, activePatterns));
	        this.setState({
	            activePatterns: activePatterns,
	            boardState: newBoard,
	            initialRow: rowIndex === 0 ? alteredRow : initialRow,
	            isPlaying: isPlaying,
	            numOfRows: numOfRows,
	            numOfCellsInRow: numOfCellsInRow,
	            rowKeyOffset: rowKeyOffset
	        });
	    };
	    default_1.prototype.generateRandomBoard = function () {
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, initialRow = _a.initialRow, isPlaying = _a.isPlaying, numOfCellsInRow = _a.numOfCellsInRow, numOfRows = _a.numOfRows, rowKeyOffset = _a.rowKeyOffset;
	        var newActivePatterns = utils_1.generateRandomActivePatterns();
	        var newBoard = utils_1.createBoard(numOfRows, utils_1.createRandomRow(numOfCellsInRow), newActivePatterns);
	        this.setState({
	            activePatterns: newActivePatterns,
	            boardState: newBoard,
	            initialRow: newBoard[0],
	            isPlaying: isPlaying,
	            numOfCellsInRow: numOfCellsInRow,
	            numOfRows: numOfRows,
	            rowKeyOffset: rowKeyOffset
	        });
	    };
	    default_1.prototype.togglePlay = function () {
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, initialRow = _a.initialRow, isPlaying = _a.isPlaying, numOfCellsInRow = _a.numOfCellsInRow, numOfRows = _a.numOfRows, rowKeyOffset = _a.rowKeyOffset;
	        if (isPlaying) {
	            this.setState({
	                activePatterns: activePatterns,
	                boardState: boardState,
	                initialRow: initialRow,
	                isPlaying: false,
	                numOfCellsInRow: numOfCellsInRow,
	                numOfRows: numOfRows,
	                rowKeyOffset: rowKeyOffset
	            });
	        }
	        else {
	            this.play(true);
	        }
	    };
	    default_1.prototype.play = function (isInitial) {
	        var _this = this;
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, initialRow = _a.initialRow, isPlaying = _a.isPlaying, numOfCellsInRow = _a.numOfCellsInRow, numOfRows = _a.numOfRows, rowKeyOffset = _a.rowKeyOffset;
	        if (!isInitial && !isPlaying) {
	            return;
	        }
	        var lastRow = utils_1.getLastItem(boardState);
	        var newRow = utils_1.createNextRow(lastRow, activePatterns);
	        var newBoard = boardState
	            .slice(1)
	            .concat([newRow]);
	        var newInitialRow = newBoard[0];
	        this.setState({
	            activePatterns: activePatterns,
	            boardState: newBoard,
	            initialRow: newInitialRow,
	            isPlaying: true,
	            numOfCellsInRow: numOfCellsInRow,
	            numOfRows: numOfRows,
	            rowKeyOffset: (rowKeyOffset + 1) % (numOfRows + 1)
	        }, function () {
	            setTimeout(_this.play, 50);
	        });
	    };
	    default_1.prototype.render = function () {
	        var _a = this.state, activePatterns = _a.activePatterns, boardState = _a.boardState, isPlaying = _a.isPlaying, rowKeyOffset = _a.rowKeyOffset;
	        return (React.createElement("div", null, 
	            React.createElement(controls_1.default, {generateRandomBoard: this.generateRandomBoard, togglePlay: this.togglePlay, isPlaying: isPlaying}), 
	            React.createElement(patterns_1.default, {activePatterns: activePatterns, changePattern: this.changePattern}), 
	            React.createElement(board_1.default, {alterBoard: this.alterBoard, isPlaying: isPlaying, rows: boardState, rowKeyOffset: rowKeyOffset})));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var row_1 = __webpack_require__(5);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, alterBoard = _a.alterBoard, isPlaying = _a.isPlaying, rows = _a.rows, rowKeyOffset = _a.rowKeyOffset;
	        return (React.createElement("div", {className: "board"}, rows.map(function (row, i) { return (React.createElement(row_1.default, {cells: row, key: i + rowKeyOffset, rowIndex: isPlaying ? undefined : i, alterBoard: isPlaying ? undefined : alterBoard})); })));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var cell_1 = __webpack_require__(6);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, cells = _a.cells, rowIndex = _a.rowIndex, alterBoard = _a.alterBoard;
	        var cellsBoolean = cells
	            .split('')
	            .map(function (s) { return Boolean(Number(s)); });
	        return (React.createElement("div", {className: "row"}, cellsBoolean.map(function (isActive, i) {
	            return React.createElement(cell_1.default, {isActive: isActive, rowIndex: rowIndex, alterBoard: alterBoard, cellIndex: i, key: i});
	        })));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, isActive = _a.isActive, rowIndex = _a.rowIndex, cellIndex = _a.cellIndex, alterBoard = _a.alterBoard;
	        return (React.createElement("div", {className: "cell" + (isActive ? ' cell--active' : '') + (alterBoard ? ' cell--interactive' : ''), onClick: alterBoard ?
	            function () { return alterBoard(rowIndex, cellIndex); }
	            : undefined}));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var patterns_1 = __webpack_require__(8);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.call(this);
	        this.state = {
	            allPatterns: [
	                "000",
	                "001",
	                "010",
	                "011",
	                "100",
	                "101",
	                "110",
	                "111"
	            ].reverse()
	        };
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, activePatterns = _a.activePatterns, changePattern = _a.changePattern;
	        var patterns = this.state.allPatterns.map(function (pattern) { return ({
	            pattern: pattern
	                .split('')
	                .map(function (s) { return Boolean(Number(s)); }),
	            signature: pattern,
	            state: activePatterns.indexOf(pattern) >= 0,
	            changePattern: changePattern
	        }); });
	        return React.createElement(patterns_1.default, {patterns: patterns});
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var pattern_1 = __webpack_require__(9);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var patterns = this.props.patterns;
	        return (React.createElement("div", null, 
	            React.createElement("div", {className: "patterns"}, 
	                React.createElement("h2", null, "Patterns:"), 
	                patterns.map(function (_a) {
	                    var pattern = _a.pattern, state = _a.state, signature = _a.signature, changePattern = _a.changePattern;
	                    return React.createElement(pattern_1.default, {pattern: pattern, signature: signature, state: state, key: signature, onClick: changePattern});
	                }))
	        ));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	var objs = [
	    {
	        fn: function (a, b) { return function () { console.log('fn'); }; },
	        pattern: [true, false],
	        state: true,
	    }
	];
	objs;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var pattern_cell_1 = __webpack_require__(10);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, pattern = _a.pattern, state = _a.state, signature = _a.signature, onClick = _a.onClick;
	        return (React.createElement("div", {className: "pattern-group", onClick: function () { return onClick(signature, !state); }}, 
	            React.createElement("div", {className: "pattern"}, pattern.map(function (isActive, i) {
	                return React.createElement(pattern_cell_1.default, {isActive: isActive, key: i});
	            })), 
	            React.createElement(pattern_cell_1.default, {isActive: state})));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var isActive = this.props.isActive;
	        return (React.createElement("div", {className: "pattern__cell" + (isActive ? ' pattern__cell--active' : '')}));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var default_1 = (function (_super) {
	    __extends(default_1, _super);
	    function default_1() {
	        _super.apply(this, arguments);
	    }
	    default_1.prototype.render = function () {
	        var _a = this.props, generateRandomBoard = _a.generateRandomBoard, togglePlay = _a.togglePlay, isPlaying = _a.isPlaying;
	        return (React.createElement("div", {className: "controls"}, 
	            React.createElement("img", {className: "controls__icon", src: "imgs/reload.svg", alt: "reload", onClick: generateRandomBoard}), 
	            React.createElement("img", {className: "controls__icon", src: "imgs/" + (isPlaying ? 'pause' : 'play') + ".svg", alt: "play", onClick: togglePlay}), 
	            React.createElement("a", {href: "http://mathworld.wolfram.com/CellularAutomaton.html", target: "help"}, 
	                React.createElement("img", {className: "controls__icon", src: "imgs/lamp.svg", alt: "help"})
	            )));
	    };
	    return default_1;
	}(React.PureComponent));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Utils module
	 * @module utils
	 */
	"use strict";
	/**
	 * This function creates a random row of 1's and 0's of a specified length
	 * @param {Number} length The length of a string
	 * @returns {String} Returns the binary string of 1's and 0's i.e. '101000'
	 */
	function createRandomRow(length) {
	    if (typeof length !== 'number') {
	        throw new Error('length must be a number');
	    }
	    var row = '';
	    for (var i = 0; i < length; i++) {
	        row += generateRandomBinaryValue().toString(10);
	    }
	    return row;
	}
	exports.createRandomRow = createRandomRow;
	/**
	 * This function returns a random value, either 0 or 1
	 * @returns {Number} randomly either 0 or 1
	 */
	function generateRandomBinaryValue() {
	    return Math.floor(Math.random() * 2);
	}
	/**
	 * This function creates the next row of cells based on the row given as an argument
	 * @param {String} originRow The row that is a basis for the row that will be returned
	 * @param {Array} activePatterns The list of patterns that if matched
	 * produce a living/active cell
	 * @returns {String} Returns a string of 0's and 1's that symbolizes a row of cells
	 */
	function createNextRow(originRow, activePatterns) {
	    return originRow
	        .split('')
	        .map(function (v, i, values) { return calculateValue(i, values, activePatterns); })
	        .join('');
	}
	exports.createNextRow = createNextRow;
	/**
	 * This function calculates if a given cell should be active/living or not
	 * @param {Number} originalIndex The index of a current cell
	 * @param {Array} originalRow The row that contains the current cell ancestors
	 * which determine the state of this cell
	 * @param {Array} activePatterns The patterns that if matched indicate that
	 * the cell is active/alive
	 * @returns {String} either '1' if a cell is active/alive or '0' (inactive)
	 */
	function calculateValue(originalIndex, originalRow, activePatterns) {
	    var rowLength = originalRow.length;
	    var parentsRelativeIndexes = [-1, 0, 1];
	    var pattern = parentsRelativeIndexes
	        .map(function (i) { return convertRelativeToAbsoluteIndexes(rowLength, originalIndex, i); })
	        .map(function (i) { return originalRow[i]; })
	        .join('');
	    return activePatterns.indexOf(pattern) > -1 ?
	        '1'
	        : '0';
	}
	/**
	 * This function converts relative indexes of the ancestor cells to the proper array indexes.
	 * By default each row of cells is perceived as a circle where the beginning of the row is
	 * connected with its end
	 * @param {Number} arrayLength The length of a row of cells
	 * @param {Number} originalIndex The index of a current cell
	 * @param {Number} relativeIndex The position of the desired cell relative to the current cell
	 * @returns {Number} The real index of a cell in a row
	 * @example
	 *
	 * // if the index of the current cell is 0, and the desired cell
	 * // is on the left (relative index -1), the result will be the last index in a row
	 * convertRelativeToAbsoluteIndexes(5, 0, -1) // => 4
	 * // similarly if the index is the last cell in a row and
	 * the we search for the cell on the right (relative index 1), the result will be the first cell
	 * convertRelativeToAbsoluteIndexes(5, 4, 1) // => 0
	 */
	function convertRelativeToAbsoluteIndexes(arrayLength, originalIndex, relativeIndex) {
	    return (arrayLength + originalIndex + relativeIndex) % arrayLength;
	}
	/**
	 * This function creates a board with cells that adhere to a specified pattern
	 * @param {Number} length The number of rows the board will have
	 * @param {String} initialRow The first row of the board
	 * that will be used as a basis for creating next rows in the format of 1's and 0's i.e. '101'
	 * @param {Array} activePatterns The list of patterns that if matched
	 * produce a living/active cell
	 */
	function createBoard(length, initialRow, activePatterns) {
	    var board = [initialRow];
	    for (var i = 0; i < length - 1; i++) {
	        board.push(createNextRow(getLastItem(board), activePatterns));
	    }
	    return board;
	}
	exports.createBoard = createBoard;
	/**
	 * This function gets the last item from the array given as an argument
	 * @param {Array} array array from which to get the last item
	 * @example
	 *
	 * const nums = [1, 2, 3]
	 * getLastItem(nums)
	 * // => 3
	 */
	function getLastItem(array) {
	    return array[array.length - 1];
	}
	exports.getLastItem = getLastItem;
	/**
	 * This function generates random active patterns.
	 * Each pattern is a string of 3 chars, eiter 0 or 1 i.e '010'
	 * @returns {Array} An array of active patterns (minimum 0, max 9 items)
	 */
	function generateRandomActivePatterns() {
	    var activePatterns = [];
	    for (var i = 0; i < 8; i++) {
	        var randomBinaryValue = generateRandomBinaryValue();
	        if (randomBinaryValue) {
	            var iBinaryString = i.toString(2);
	            activePatterns.push(prependZeros(iBinaryString, 3));
	        }
	    }
	    return activePatterns;
	}
	exports.generateRandomActivePatterns = generateRandomActivePatterns;
	/**
	 * This function prepends a given string with zeroes to make it of a given length
	 * @param {String} binaryString The string that should be prepended
	 * @param {Number} desiredStringLength The desired length of a string
	 * @returns {String} Returns a string of a given length with prepended zeroes if necessary
	 */
	function prependZeros(binaryString, desiredStringLength) {
	    var prependedString = binaryString;
	    while (prependedString.length < desiredStringLength) {
	        prependedString = '0' + prependedString;
	    }
	    return prependedString;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map