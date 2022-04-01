const CommandStrategy = require("./command-strategy");

class StepsCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'steps';
  }

  doAction(cursor, canvas, steps) {
    steps = parseInt(steps);
    cursor.moveCursor(steps);
  }
}

module.exports = StepsCommand;
