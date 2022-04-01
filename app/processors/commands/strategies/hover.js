const CommandStrategy = require("./command-strategy");

class HoverCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'hover';
  }

  doAction(cursor) {
    cursor.setCursorMode(this.name);
  }
}

module.exports = HoverCommand;
