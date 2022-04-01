const CommandStrategy = require("./command-strategy");

class LeftCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'left';
  }

  doAction(cursor, canvas, steps) {
    steps = parseInt(steps);
    cursor.setCursorDirection(this.name, steps);

    return `${cursor.getCursorDirection()}\r\n`;
  }
}

module.exports = LeftCommand;
