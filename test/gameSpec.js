define(function(require) {

    var board = require('models/board');
    var Game = require('models/game');
    var King = require('models/king');
    var Queen = require('models/queen');
    var Rook = require('models/rook');
    var Horse = require('models/horse');
    var Bishop = require('models/bishop');
    var Pawn = require('models/pawn');


    describe("Game", function() {
        it("detects check (pawn)", function() {
            var game = new Game({ board: board });
            var king = new King({ col: 4, row: 4 });
            board.add(king);
            var pawn;

            function check(col, row, check) {
                pawn = new Pawn({ col: col, row: row , player: 2});
                board.add(pawn);
                expect(game.isCheck(1)).toBe(check);
                board.remove(col,row);
            }
            
            // CASES WITH TRUE CHECK

            /*
                x   King  x 
                x     x  Pawn
            */
            
            check(5,5, true);

            /*
                x   King  x 
               Pawn  x    x
            */
            
            check(3,5, true);

            // CASES WITH NO CHECK

            /*
                x     x   Pawn
                x   King   x 
                x     x    x
            */

            check(5,3, true); // FAKE

            /*
               Pawn   x    x
                x   King   x 
                x     x    x
            */

            check(3,3, true); // FAKE

        });
    });
});
