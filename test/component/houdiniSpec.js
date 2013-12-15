define(function(require) {

    var Houdini = require('component/houdini');
    var Board = require('component/board');

    var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Knight = require('models/knight');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');

    describe("Houdini", function() {
        it('should count kings', function() {
            expect(Houdini._kings([])).toBe(0);
            expect(Houdini._kings([new King()])).toBe(1);
            expect(Houdini._kings([new King(), new King()])).toBe(2);
        });

        it('should count queens', function() {
            expect(Houdini._queens([])).toBe(0);
            expect(Houdini._queens([new Queen()])).toBe(1);
            expect(Houdini._queens([new Queen(), new Queen()])).toBe(2);
        });

        it('should count rooks', function() {
            expect(Houdini._rooks([])).toBe(0);
            expect(Houdini._rooks([new Rook()])).toBe(1);
            expect(Houdini._rooks([new Rook(), new Rook()])).toBe(2);
        });

        it('should count bishops', function() {
            expect(Houdini._bishops([])).toBe(0);
            expect(Houdini._bishops([new Bishop()])).toBe(1);
            expect(Houdini._bishops([new Bishop(), new Bishop()])).toBe(2);
        });

        it('should count knights', function() {
            expect(Houdini._knights([])).toBe(0);
            expect(Houdini._knights([new Knight()])).toBe(1);
            expect(Houdini._knights([new Knight(), new Knight()])).toBe(2);
        });

        it('should count pawns', function() {
            expect(Houdini._pawns([])).toBe(0);
            expect(Houdini._pawns([new Pawn()])).toBe(1);
            expect(Houdini._pawns([new Pawn(), new Pawn()])).toBe(2);
        });

        it('should evaluate pieces correctly', function() {
                var board = new Board();
                expect(Houdini._evaluatePieceScore(board)).toBe(0);
                board.add(new King({ col: 0, row: 0}));
                expect(Houdini._evaluatePieceScore(board)).toBe(200);
                board.add(new King({ col: 0, row: 7, player: 2}));
                expect(Houdini._evaluatePieceScore(board)).toBe(0);

                board.add(new Queen({ col: 1, row: 0}));
                board.add(new Queen({ col: 1, row: 7, player: 2}));
                expect(Houdini._evaluatePieceScore(board)).toBe(0);
                board.remove(1, 7);
                expect(Houdini._evaluatePieceScore(board)).toBe(9);
                board.add(new Queen({ col: 1, row: 7, player: 2}));
                board.remove(1, 0);
                expect(Houdini._evaluatePieceScore(board)).toBe(-9);


        });

    });
});
