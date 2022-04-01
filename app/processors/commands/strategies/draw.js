const CommandStrategy = require("./command-strategy");

class DrawCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'draw';
  }

  doAction(cursor, canvas) {
    cursor.setCursorMode(this.name);
    canvas.drawOnCanvas(cursor);
  }
}

module.exports = DrawCommand;
