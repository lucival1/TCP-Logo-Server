class Cursor {
  constructor() {
    this.position = [15, 15];
    this.mode = 'hover';
    this.direction = 'top';
    this._directions = ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft'];
  }

  getCursorPosition() {
    return this.position;
  }

  getCursorDirection() {
    return this.direction;
  }

  setCursorPosition(newPosition) {
    this.position = newPosition;
  }

  setCursorMode(newCursorMode) {
    this.mode = newCursorMode;
  }

  setCursorDirection(cycleDirection, steps) {
    const index = this._directions.indexOf(this.direction);
    let position;

    if (cycleDirection === 'right') {
      position = (steps + index) % this._directions.length;
    } else {
      position = index - steps;
      while (position < 0) {
        position = this._directions.length + position;
      }
    }

    this.direction = this._directions[position];
  }

  moveCursor(steps) {
    let posX = this.position[0];
    let posY = this.position[1];

    switch (this.direction) {
      case 'top':
        posX = posX - steps < 1 ? 1 : posX - steps;
        break;
      case 'topRight':
        posX = posX - steps < 1 ? 1 : posX - steps;
        posY = posY + steps > 30 ? 30 : posY + steps;
        break;
      case 'right':
        posY = posY + steps > 30 ? 30 : posY + steps;
        break;
      case 'bottomRight':
        posX = posX + steps > 30 ? 30 : posX + steps;
        posY = posY + steps > 30 ? 30 : posY + steps;
        break;
      case 'bottom':
        posX = posX + steps > 30 ? 30 : posX + steps;
        break;
      case 'bottomLeft':
        posX = posX + steps > 30 ? 30 : posX + steps;
        posY = posY - steps < 1 ? 1 : posY - steps;
        break;
      case 'left':
        posY = posY - steps < 1 ? 1 : posY - steps;
        break;
      case 'topLeft':
        posX = posX - steps < 1 ? 1 : posX - steps;
        posY = posY - steps < 1 ? 1 : posY - steps;
        break;
    }
    this.position[0] = posX;
    this.position[1] = posY;
  }
}

module.exports = Cursor;
