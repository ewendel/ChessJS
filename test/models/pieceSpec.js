define(function(require) {

    var Piece = require('models/piece');

    describe("Piece", function() {
    	it("defaults to (0,0)", function() {
        	var piece = new Piece();
            expect(piece.get('col')).toBe(0);
            expect(piece.get('row')).toBe(0);
        });

        it("defaults to white", function() {
            var piece = new Piece();
            expect(piece.get('player')).toBe(1);
        });
    });
});
