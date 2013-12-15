define(function(require) {

    var Board = require('component/board');
    var Pawn = require('models/pawn');
    var board = new Board();

    beforeEach(function() {
    	board.clear();
    });

    describe("board", function() {
    	it("counts", function() {
        	var pawn = new Pawn();
        	var pawn2 = new Pawn({ col: 1, row: 0});
        	var pawn3 = new Pawn({ col: 2, row: 0});
            board.add(pawn);
            expect(board.pieces()).toBe(1);
            board.add(pawn2);
            board.add(pawn3);
            expect(board.pieces()).toBe(3);
        });


    	it("clears", function() {
        	var pawn = new Pawn();
            board.add(pawn);
            expect(board.pieces()).toBe(1);
            board.clear();
            expect(board.pieces()).toBe(0);
        });

        it("adds piece", function() {
        	var pawn = new Pawn();
            board.add(pawn);
            expect(board.get(pawn.path())).toBe(pawn);
        });

        it("overwrites on add", function() {
        	var pawn = new Pawn();
            board.add(pawn);
            expect(board.get(0,0)).toBe(pawn);
        	var other = new Pawn();
        	board.add(other);
        	expect(board.get(0,0)).toBe(other);
        	expect(board.pieces()).toBe(1);
        });

        it("removes piece", function() {
        	var pawn = new Pawn();
            board.add(pawn);
            expect(board.get(0,0)).toBe(pawn);
            board.remove(0,0);
            expect(board.get(0,0)).toBe(undefined);
        });

        it('returns clone of state', function() {
            var pawn = new Pawn();
            board.add(pawn);
            var clonedState = board.clone();
            console.log(clonedState[0][0]);
            clonedState[0][0] = undefined;
            expect(board.pieces()).toBe(1);

            clonedState[0][0] = new Pawn({ col: 2, row: 2});
            clonedState[0][0] = new Pawn({ col: 2, row: 3});
            clonedState[0][0] = new Pawn({ col: 2, row: 4});

            expect(board.pieces()).toBe(1);

            board.add(new Pawn({col: 3, row: 7}));

            expect(clonedState[7][3]).not.toBeDefined();


        });
    });
});
