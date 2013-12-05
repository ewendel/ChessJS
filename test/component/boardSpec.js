define(function(require) {

    var Board = require('models/board');
    var Pawn = require('models/pawn');

    beforeEach(function() {
    	Board.clear();
    });

    describe("Board", function() {
    	it("counts", function() {
        	var pawn = new Pawn();
        	var pawn2 = new Pawn({ col: 1, row: 0});
        	var pawn3 = new Pawn({ col: 2, row: 0});
            Board.add(pawn);
            expect(Board.pieces()).toBe(1);
            Board.add(pawn2);
            Board.add(pawn3);
            expect(Board.pieces()).toBe(3);
        });


    	it("clears", function() {
        	var pawn = new Pawn();
            Board.add(pawn);
            expect(Board.pieces()).toBe(1);
            Board.clear();
            expect(Board.pieces()).toBe(0);
        });

        it("adds piece", function() {
        	var pawn = new Pawn();
            Board.add(pawn);
            expect(Board.get(pawn.path())).toBe(pawn);
        });

        it("overwrites on add", function() {
        	var pawn = new Pawn();
            Board.add(pawn);
            expect(Board.get(0,0)).toBe(pawn);
        	var other = new Pawn();
        	Board.add(other);
        	expect(Board.get(0,0)).toBe(other);
        	expect(Board.pieces()).toBe(1);
        });

        it("removes piece", function() {
        	var pawn = new Pawn();
            Board.add(pawn);
            expect(Board.get(0,0)).toBe(pawn);
            Board.remove(0,0);
            expect(Board.get(0,0)).toBe(undefined);
        });
    });
});
