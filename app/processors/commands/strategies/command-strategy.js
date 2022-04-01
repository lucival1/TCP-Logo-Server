class CommandStrategy {
  doAction() {
    throw new Error('process must be implemented');
  }
}

module.exports = CommandStrategy;
