const CommandStrategy = require("./command-strategy");

class EraserCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'eraser';
  }

  doAction(cursor, canvas) {
    cursor.setCursorMode(this.name);
    canvas.eraseCanvas(cursor);
  }
}

module.exports = EraserCommand;
