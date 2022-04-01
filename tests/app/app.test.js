const crypto = require('crypto');
const expect = require('expect');
const app = require('../../app/index');

describe('App', () => {
  describe('When app is created', () => {
    it('coordinates should be default', () => {
      expect(app.cursor.getCursorPosition()).toEqual([15, 15]);
    });

    it('direction should be top', () => {
      expect(app.cursor.getCursorDirection()).toEqual('top');
    });

    it('canvas should be default', () => {
      expect(sha1(app.canvas.printCanvas(app.cursor))).toEqual('d32c1c8feec601f2a25d31165c1b6bae8c194e6b');
    });
  });

  describe('When issuing commands', () => {
    it('random command should return not recognize command', () => {
      expect(app.process('ramdon')).toEqual('ramdon command not recognized.\r\n');
    });

    it('coord command should return formatted command', () => {
      expect(app.process('coord')).toEqual('(15,15)\r\n');
    });

    it('left 3 command should change direction', () => {
      app.process('left 3');
      expect(app.cursor.getCursorDirection()).toEqual('bottomLeft');
    });

    it('left 7 command should change direction', () => {
      app.process('left 7');
      expect(app.cursor.getCursorDirection()).toEqual('left');
    });

    it('left 8 command should not change direction', () => {
      app.process('left 8');
      expect(app.cursor.getCursorDirection()).toEqual('left');
    });

    it('right 4 command should change direction', () => {
      app.process('right 4');
      expect(app.cursor.getCursorDirection()).toEqual('right');
    });

    it('right 8 command should not change direction', () => {
      app.process('right 8');
      expect(app.cursor.getCursorDirection()).toEqual('right');
    });

    it('steps 4 command should move the cursor', () => {
      app.process('steps 4');
      expect(app.process('coord')).toEqual('(15,19)\r\n');
    });

    it('a series of turns and steps should move the cursor', () => {
      app.process('right 3');
      app.process('steps 7');
      app.process('left 5');
      app.process('steps 15');
      // expect(app.cursor.getCursorDirection()).toEqual('right');
      expect(app.process('coord')).toEqual('(7,12)\r\n');
    });

    it('cursor try to move outbounds should keep the cursor inbound', () => {
      app.process('steps 42');
      expect(app.process('coord')).toEqual('(1,12)\r\n');
      app.process('right 2');
      app.process('steps 35');
      expect(app.process('coord')).toEqual('(1,30)\r\n');
      app.process('left 4');
      app.process('steps 50');
      expect(app.process('coord')).toEqual('(1,1)\r\n');
      app.process('left 2');
      app.process('steps 40');
      expect(app.process('coord')).toEqual('(30,1)\r\n');
    });

    it('a draw should draw an asterisk on the cursor spot', () => {
      app.process('draw');
      app.process('left 3');
      app.process('steps 10');
      app.process('draw');
      app.process('steps 10');
      expect(app.process('coord')).toEqual('(10,21)\r\n');
      expect(sha1(app.canvas.printCanvas(app.cursor))).toEqual('e1b8238fce002c9675491e26516628dbe960ba25');
    });

    it('a eraser should erase on the cursor spot', () => {
      app.process('left 4');
      app.process('steps 10');
      app.process('eraser');
      app.process('left 4');
      app.process('steps 10');
      expect(app.process('coord')).toEqual('(10,21)\r\n');
      expect(sha1(app.canvas.printCanvas(app.cursor))).toEqual('8599f5ec784f0119435c29fa24a6dea1de6485e8');
    });

    it('clear should erase whole canvas asterisks', () => {
      app.process('clear');
      expect(app.process('coord')).toEqual('(10,21)\r\n');
      expect(sha1(app.canvas.printCanvas(app.cursor))).toEqual('28603459ef4719117c1a273bdd0847ce2ebd63d6');
    });
  });

});

function sha1(lines) {
  let shasum = crypto.createHash('sha1');
  shasum.update(lines);

  return shasum.digest('hex');
};
