const CommandStrategy = require("./command-strategy");

class RightCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'right';
  }

  doAction(cursor, canvas, steps) {
    steps = parseInt(steps);
    cursor.setCursorDirection(this.name, steps);

    return `${cursor.getCursorDirection()}\r\n`;
  }
}

module.exports = RightCommand;
