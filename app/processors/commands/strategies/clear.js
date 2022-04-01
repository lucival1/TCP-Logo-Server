const CommandStrategy = require("./command-strategy");

class ClearCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'clear';
  }

  doAction(cursor, canvas) {
    {canvas.defaultCanvas(cursor)};
  }
}

module.exports = ClearCommand;

