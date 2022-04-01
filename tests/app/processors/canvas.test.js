const crypto = require('crypto');
const expect = require('expect');
const {Canvas, Cursor} = require('../../../app/processors');

describe('Canvas', () => {
  let canvas, cursor;
  before(() => {
    canvas = new Canvas();
    cursor = new Cursor();
  });

  describe('When Canvas is created', () => {
    it('size should be 30 + 2 for the borders', () => {
      expect(canvas.initialLength).toEqual(32);
    });

    it('And defaultCanvas is called should be default', () => {
      canvas.defaultCanvas();
      expect(Object.keys(canvas.canvas).length).toEqual(32);
      expect(canvas.canvas[0].length).toEqual(32);
      expect(canvas.canvas[0]).toEqual([
        '╔', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '╗'
      ]);
      expect(canvas.canvas[15].length).toEqual(32);
      expect(canvas.canvas[15]).toEqual(  [
        '║', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', '║'
      ]);
      expect(canvas.canvas[31].length).toEqual(32);
      expect(canvas.canvas[31]).toEqual( [
        '╚', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '═', '═', '═', '═', '═',
        '═', '╝'
      ]);

    });

    it('And printCanvas is called should be default', () => {
      expect(sha1(canvas.printCanvas(cursor))).toEqual('d32c1c8feec601f2a25d31165c1b6bae8c194e6b');
    });

    it('And drawOnCanvas should be default', () => {
      cursor.setCursorPosition([10, 10]);
      canvas.drawOnCanvas(cursor);
      cursor.setCursorPosition([15, 15]);
      expect(sha1(canvas.printCanvas(cursor))).toEqual('e8786289f87ec75c33d5410499f2d371b5bcddeb');
    });

    it('And eraseCanvas should be default', () => {
      cursor.setCursorPosition([5, 5]);
      canvas.drawOnCanvas(cursor);
      cursor.setCursorPosition([10, 10]);
      canvas.eraseCanvas(cursor);
      cursor.setCursorPosition([15, 15]);
      expect(sha1(canvas.printCanvas(cursor))).toEqual('05224c153b7838ad7fc0c50d43b169a3247633a6');
    });

    it('And eraseCanvas should be default', () => {
      cursor.setCursorPosition([5, 5]);
      canvas.drawOnCanvas(cursor);
      cursor.setCursorPosition([10, 10]);
      canvas.eraseCanvas(cursor);
      cursor.setCursorPosition([15, 15]);
      expect(sha1(canvas.printCanvas(cursor))).toEqual('05224c153b7838ad7fc0c50d43b169a3247633a6');
    });
  });

});

function sha1(lines) {
  let shasum = crypto.createHash('sha1');
  shasum.update(lines);

  return shasum.digest('hex');
};
