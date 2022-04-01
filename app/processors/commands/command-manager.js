const {
  CoordinatesCommand,
  RenderCommand,
  HoverCommand,
  DrawCommand,
  EraserCommand,
  ClearCommand,
  LeftCommand,
  RightCommand,
  StepsCommand,
} = require("./strategies/index");

class CommandManager {
  constructor() {
    this._commands = [
      new CoordinatesCommand(),
      new RenderCommand(),
      new HoverCommand(),
      new DrawCommand(),
      new EraserCommand(),
      new ClearCommand(),
      new LeftCommand(),
      new RightCommand(),
      new StepsCommand(),
    ];
  }

  addCommand(command) {
    if (!command) return;
    this._commands = [...this._commands, command];
  }

  getCommand(name) {
    return this._commands.find(command => command.name === name);
  }
}

module.exports = CommandManager;

