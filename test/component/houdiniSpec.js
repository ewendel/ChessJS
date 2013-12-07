define(function(require) {

    var Houdini = require('component/houdini');

    var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Knight = require('models/knight');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');

    ddescribe("Houdini", function() {
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

    });
});
