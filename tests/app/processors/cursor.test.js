const expect = require('expect');
const {Cursor} = require('../../../app/processors');

describe('Cursor', () => {
  let cursor;
  before(() => {
    cursor = new Cursor();
  });

  describe('When cursor is created', () => {
    it('default values should be', () => {
      expect(cursor.position).toEqual([15, 15]);
      expect(cursor.mode).toEqual('hover');
      expect(cursor.direction).toEqual('top');
      expect(cursor._directions).toEqual([
        'top',
        'topRight',
        'right',
        'bottomRight',
        'bottom',
        'bottomLeft',
        'left',
        'topLeft'
      ]);
    });

    it('getCursorDirection is called should be default position', () => {
      expect(cursor.getCursorPosition()).toEqual([15, 15]);
    });

    it('getCursorDirection is called should be top', () => {
      expect(cursor.getCursorDirection()).toEqual('top');
    });
  });

  describe('When cursor is receive changes', () => {
    it('setCursorMode to draw, mode should be draw', () => {
      cursor.setCursorMode('draw');
      expect(cursor.mode).toEqual('draw');
    });
  });

  describe('When setCursorDirection is called', () => {
    it('and direction is right, step 1 new direction should be topRight', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('topRight');
    });

    it('and direction is right, step 1 new direction should be right', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('right');
    });

    it('and direction is right, step 1 new direction should be bottomRight', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('bottomRight');
    });

    it('and direction is right, step 1 new direction should be bottom', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('bottom');
    });

    it('and direction is right, step 1 new direction should be bottomLeft', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('bottomLeft');
    });

    it('and direction is right, step 1 new direction should be left', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('left');
    });

    it('and direction is right, step 1 new direction should be topLeft', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('topLeft');
    });

    it('and direction is right, step 1 new direction should be top', () => {
      cursor.setCursorDirection('right', 1);
      expect(cursor.getCursorDirection()).toEqual('top');
    });

    it('and direction is right with 8 steps, should not change the direction', () => {
      cursor.setCursorDirection('right', 8);
      expect(cursor.getCursorDirection()).toEqual('top');
    });

    it('and direction is left, step 1 new direction should be topLeft', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('topLeft');
    });

    it('and direction is left, step 1 new direction should be left', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('left');
    });

    it('and direction is left, step 1 new direction should be bottomLeft', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('bottomLeft');
    });

    it('and direction is left, step 1 new direction should be bottom', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('bottom');
    });

    it('and direction is left, step 1 new direction should be bottomRight', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('bottomRight');
    });

    it('and direction is left, step 1 new direction should be right', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('right');
    });

    it('and direction is left, step 1 new direction should be topRight', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('topRight');
    });

    it('and direction is left, step 1 new direction should be top', () => {
      cursor.setCursorDirection('left', 1);
      expect(cursor.getCursorDirection()).toEqual('top');
    });

    it('and direction is left with 8 steps, should not change the direction', () => {
      cursor.setCursorDirection('left', 8);
      expect(cursor.getCursorDirection()).toEqual('top');
    });
  });

  describe('When moveCursor is called', () => {
    it('should move the number of steps in the current direction', () => {
      cursor.setCursorDirection('left', 3);
      cursor.moveCursor(3);
      expect(cursor.getCursorPosition()).toEqual([18, 12]);
    });

    it('changing direction (left) and moving should move towards the new direction', () => {
      cursor.setCursorDirection('left', 3);
      cursor.moveCursor(10);
      expect(cursor.getCursorPosition()).toEqual([18, 22]);
    });

    it('changing direction (right) and moving should move towards the new direction', () => {
      cursor.setCursorDirection('right', 7);
      cursor.moveCursor(9);
      expect(cursor.getCursorPosition()).toEqual([9, 30]);
    });
  });
});
