define(function(require) {

    var board = require('models/board');
    var Game = require('models/game');
    var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Knight = require('models/knight');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');

    function check(col, row, piece, expected) {
        var game = new Game({ board: board });
        var king = new King({ col: 4, row: 4 });
        piece.set({ col: col, row: row, player: 2 });
        board.add(king);
        board.add(piece);
        expect(game.isCheck(1)).toBe(expected);
        board.remove(col,row);
    }

    describe("Game", function() {
        // King is always at (4,4) / D4


        it("detects check (pawn 1)", function() {
            /*
                x   King  x 
                x     x  Pawn
            */            
            check(5,5, new Pawn(), false);
        });

        it("detects check (pawn 2)", function() {
            /*
                x   King  x 
                x   Pawn  x
            */
            
            check(4,5, new Pawn(), false);
        });

        it("detects check (pawn 3)", function() {
            /*
                x   King  x 
               Pawn  x    x
            */
            
            check(3,5, new Pawn(), false);
        });


        it("detects check (pawn 4)", function() {
            /*
                x     x   Pawn
                x   King   x 
                x     x    x
            */

            check(5,3, new Pawn(), true);
        });

        it("detects check (pawn 5)", function() {
            /*
                x   Pawn   x
                x   King   x 
                x     x    x
            */

            check(4,3, new Pawn(), false);
        });

        it("detects check (pawn 6)", function() {
            /*
               Pawn   x    x
                x   King   x 
                x     x    x
            */

            check(3,3, new Pawn(), true);
        });

        it("detects check (pawn 7)", function() {
            /*
                x     x    x
               Pawn  King  x 
                x     x    x
            */

            check(3,4, new Pawn(), false);
        });

        it("detects check (pawn 8)", function() {
            /*
                x    x    x
                x   King Pawn
                x    x    x
            */

            check(5,4, new Pawn(), false);
        });

        it("detects check (rook 1)", function() {
            /*
                x    x    x
                x    x    x
                x   King  x 
                x    x    x
                x   Rook  x
            */

            check(4,6, new Rook(), true);
        });

        it("detects check (rook 2)", function() {
            /*
                x    x    x
                x    x    x
               Rook King  x 
                x    x    x
                x    x    x
            */

            check(3,4, new Rook(), true);
        });

        it("detects check (rook 3)", function() {
            /*
                x    x    x
                x    x    x
                x   King Rook 
                x    x    x
                x    x    x
            */

            check(5,4, new Rook(), true);
        });

        it("detects check (rook 4)", function() {
            /*
                x   Rook  x
                x    x    x
                x   King  x   
                x    x    x
                x    x    x
            */

            check(4,2, new Rook(), true);
        });

        it("detects check (queen 1)", function() {
            /*
                x    x    x
                x    x    x
                x   King  x 
                x    x    x
                x  Queen  x
            */

            check(4,6, new Queen(), true);
        });

        it("detects check (queen 2)", function() {
            /*
                x    x    x
                x    x    x
              Queen King  x 
                x    x    x
                x    x    x
            */

            check(3,4, new Queen(), true);
        });

        it("detects check (queen 3)", function() {
            /*
                x    x    x
                x    x    x
                x   King Queen
                x    x    x
                x    x    x
            */

            check(5,4, new Queen(), true);
        });

        it("detects check (queen 4)", function() {
            /*
                x  Queen  x
                x    x    x
                x   King  x   
                x    x    x
                x    x    x
            */

            check(4,2, new Queen(), true);
        });

        it("detects check (bishop 1)", function() {
            /*
                x   x   x    x    x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x
                x   x   x    x   Bishop
            */

            check(6,6, new Bishop(), true);
        });

        it("detects check (bishop 2)", function() {
            /*
             Bishop x   x    x    x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x
                x   x   x    x    x
            */

            check(2,2, new Bishop(), true);
        });

        it("detects check (bishop 3)", function() {
            /*
                x   x   x    x   Bishop
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x
                x   x   x    x    x
            */

            check(6,2, new Bishop(), true);
        });

        it("detects check (bishop 4)", function() {
            /*
                x   x   x    x    x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x
             Bishop x   x    x    x
            */

            check(2,6, new Bishop(), true);
        });

        it("detects check (knight 1)", function() {
            /*
                x   x   x    x    x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x   Kngt
                x   x   x    x    x
            */

            check(6,5, new Knight(), true);
        });

        it("detects check (knight 2)", function() {
            /*
                x   x   x    x    x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x 
                x   x   x   Kngt  x
            */

            check(5,6, new Knight(), true);
        });

        it("detects check (knight 3)", function() {
            /*
                x   x   x    x    x
                x   x   x    x   Kngt
                x   x  King  x    x 
                x   x   x    x    x
                x   x   x    x    x 
            */

            check(6,3, new Knight(), true);
        });

        it("detects check (knight 4)", function() {
            /*
                x   x   x   Kngt  x
                x   x   x    x    x
                x   x  King  x    x 
                x   x   x    x    x
                x   x   x    x    x 
            */

            check(5,2, new Knight(), true);
        });


        describe('doesnt give false positives for check', function() {
             it("for queen", function() {
                /*
                    x  Queen  x   Queen   x 
                  Queen  x    x     x   Queen
                    x    x   King   x     x 
                  Queen  x    x     x   Queen
                    x  Queen  x   Queen   x 
                */

                check(3,2, new Queen(), false);
                check(5,2, new Queen(), false);
                check(2,3, new Queen(), false);
                check(6,3, new Queen(), false);
                check(2,5, new Queen(), false);
                check(3,6, new Queen(), false);
                check(6,5, new Queen(), false);
                check(5,6, new Queen(), false);
            });

            it("for rook", function() {
                /*
                   Rook  x   Rook
                   Rook  x   Rook
                    x   King  x 
                   Rook  x   Rook
                   Rook  x   Rook
                */

                check(3,2, new Rook(), false);
                check(3,3, new Rook(), false);
                check(3,5, new Rook(), false);
                check(3,6, new Rook(), false);
                check(5,2, new Rook(), false);
                check(5,3, new Rook(), false);
                check(5,5, new Rook(), false);
                check(5,6, new Rook(), false);
            });

            it("for bishop", function() {
                /*
                   Bshp Bshp Bshp
                    x   Bshp  x
                   Bshp King Bshp
                    x   Bshp  x  
                   Bshp Bshp Bshp
                */

                check(3,2, new Bishop(), false);
                check(4,2, new Bishop(), false);
                check(5,2, new Bishop(), false);
                check(4,3, new Bishop(), false);
                check(3,4, new Bishop(), false);
                check(5,4, new Bishop(), false);
                check(4,5, new Bishop(), false);
                check(3,6, new Bishop(), false);
                check(4,6, new Bishop(), false);
                check(5,6, new Bishop(), false);
            });

            it("for knight", function() {
                /*
                  Knght   x   Knght   x   Knght
                    x   Knght Knght Knght    x
                  Knght Knght King  Knght Knght
                    x   Knght Knght Knght    x
                  Knght   x   Knght   x   Knght
                */

                check(2,2, new Knight(), false);
                check(4,2, new Knight(), false);
                check(6,2, new Knight(), false);
                check(3,3, new Knight(), false);
                check(4,3, new Knight(), false);
                check(5,3, new Knight(), false);
                check(2,4, new Knight(), false);
                check(3,4, new Knight(), false);
                check(5,4, new Knight(), false);
                check(6,4, new Knight(), false);
                check(3,5, new Knight(), false);
                check(4,5, new Knight(), false);
                check(4,6, new Knight(), false);
                check(2,6, new Knight(), false);
                check(4,6, new Knight(), false);
                check(6,6, new Knight(), false);
            });


        });
    });
});
