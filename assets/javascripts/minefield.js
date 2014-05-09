/*
 * @MineField
 *
 * main class for minefield definition
 * */

var MineField = function (args) {
	this.initialize(args);
};

/*
 * MineField.intialize
 *
 * constructor method
 * */
MineField.prototype.initialize = function (args) {
	args = args || {};
	this.X = args.x || 10;
	this.Y = args.y || 5;
	this.total = (this.Y * this.X);
	this.mines = args.mines || 80;

	if (this.validate()) this.create();
};

/*
 * MineField.validate
 *
 * validate args values
 * */
MineField.prototype.validate = function (args) {
	if (this.mines >= this.total) {
		this.validationMessage = 'The number of mines cant be greater or equal of the total of fields';
		this.error();
		return false;
	}

	return true;
};

/*
 * MineField.error
 *
 * throw errors
 * */
MineField.prototype.error = function () {
	throw new Error(this.validationMessage);
};

/*
 * MineField.create
 *
 * creates the "field" with empty blocks
 * */
MineField.prototype.create = function (args) {
	this.game = Array.apply(null, { length: this.Y } ).map(function () {
		var line = arguments[1];
		line = {
			line: this.lineX(),
			bombs: 0
		};

		return line;

	}.bind(this));

	this.setBombs();
};

/*
 * MineField.lineX
 *
 * creates the X line
 * */
MineField.prototype.lineX = function () {

	return Array.apply(null, { length: this.X } ).map(function () {
		var line =  arguments[1];
		line = {
			explored: false,
			bomb: false,
			next: 0
		};

		return line;

	}.bind(this));

};


/*
 * MineField.setBombs
 *
 * set bombs by line
 * */
MineField.prototype.setBombs = function () {
	var input = this.mines,
			index;

	while (input > 0) {
		index = Math.range(this.game.length, 0);

		if (this.game[index].bombs < this.Y) {
			this.game[index].bombs++;
			input = input -1;
			this.game[index].line[this.game[index].bombs - 1].bomb = true;
		}
	}

	this.game.forEach(function (value, index) {
		this.game[index].line.shuffle();
	}.bind(this));

	this.setNext();
};

/*
 * MineField.setNext
 *
 * set bombs next to the field
 * */
MineField.prototype.setNext = function () {
	console.log('set next logic....');
	new GameView(this);
};
