const CommandStrategy = require("./command-strategy");

class RenderCommand extends CommandStrategy {
  constructor() {
    super();
    this.name = 'render';
  }

  doAction(cursor, canvas) {
    return canvas.printCanvas(cursor);
  }
}

module.exports = RenderCommand;

