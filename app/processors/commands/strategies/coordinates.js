const CommandStrategy = require("./command-strategy");

class CoordinatesCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'coord';
  }

  doAction(cursor, canvas) {
    const cursorPos = cursor.getCursorPosition();
    return `(${cursorPos[0]},${cursorPos[1]})\r\n`;
  }
}

module.exports = CoordinatesCommand;

