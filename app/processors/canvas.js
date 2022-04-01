class Canvas {
  constructor(initialLength = 32) {
    this.initialLength = initialLength;
    this.defaultCanvas();
  }

  drawOnCanvas(cursor) {
    this.draw(cursor, String.fromCharCode(42));
  }

  eraseCanvas(cursor) {
    this.draw(cursor, String.fromCharCode(160));
  }

  draw(cursor, newChar) {
    const cursorPos = cursor.getCursorPosition();
    const index = cursorPos[0];
    const position = cursorPos[1];

    if (index > 0 && index < this.initialLength) {
      this.canvas[index].splice(position, 1, newChar);
    }
  }

  printCanvas(cursor) {
    const _setCursorInCanvas = (str, cursorPos) => {
      const regex = /\r\n/gi;
      let result, indices = [];
      while ((result = regex.exec(str))) {
        indices.push(result.index);
      }

      const index = indices[indices.length - 1] + cursorPos[1] + 2;
      if (index > str.length - 1) return str;
      return `${str.substring(0, index)}${String.fromCharCode(42)}${str.substring(index + 1)}`;
    }

    const cursorPos = cursor.getCursorPosition()
    let rowDraw = '';

    for (let y = 0; y < this.initialLength; ++y) {
      this.canvas[y].forEach(item => rowDraw = rowDraw.concat(item));
      if (cursorPos[0] === y) rowDraw = _setCursorInCanvas(rowDraw, cursorPos);

      rowDraw = rowDraw.concat('\r\n');
    }

    return `${rowDraw}\r\n`;
  }

  defaultCanvas() {
    const _populateOuterBorderLines = (row, direction) => {
      let rowLength = this.initialLength - 2;
      while (rowLength > 0) {
        direction === 'h'
          ? row.push(String.fromCharCode(0x2550))
          : row.push(String.fromCharCode(160));

        rowLength--;
      }

      return row;
    }

    this.canvas = {};

    for (let y = 0; y < this.initialLength; ++y) {
      let row = new Array();

      if (y === 0 || y === this.initialLength - 1) {
        y === 0
          ? row.push(String.fromCharCode(0x2554))
          : row.push(String.fromCharCode(0x255A));

        _populateOuterBorderLines(row, 'h');

        y === 0
          ? row.push(String.fromCharCode(0x2557))
          : row.push(String.fromCharCode(0x255D));
      } else {
        row.push(String.fromCharCode(0x2551));
        _populateOuterBorderLines(row, 'v')
        row.push(String.fromCharCode(0x2551));
      }

      this.canvas[y] = row;
    }
  }

}

module.exports = Canvas;
