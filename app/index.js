const CommandManager = require("./processors/commands/command-manager");
const Canvas = require('./processors/index').Canvas;
const Cursor = require('./processors/index').Cursor;

class App {
  constructor() {
    this.canvas = new Canvas();
    this.cursor = new Cursor();
    this.commandManager = new CommandManager();
  }

  process(userCommand) {
    const commandContent = userCommand.replace(/[\n\r]/g, '').split(' ')
    let command = this.commandManager.getCommand(commandContent[0]);

    let res = command
      ? command.doAction(
        this.cursor,
        this.canvas,
        commandContent[1])
      : `${userCommand} command not recognized.\r\n`;

    return res === undefined ? `\r\n` : res;
  }
}

module.exports = new App();
