import { displayControler } from "./displayControler.js";
import { gameboard } from "./gameboard.js";
import { createPlayer } from "./Player.js";

export const gameControler = (() => {

    let playerX;
    let playerO;

    let activePlayer;

    /**
     * Odpowiada za rozpoczęcie gry.
     * @function startGame
     * @public
     */
    const startGame = (name1, name2) => {
        playerX = createPlayer(name1, "X");
        playerO = createPlayer(name2, "O");

        resetGame();
    };

    /**
     * Zmienia obecnego gracza na tego, do którego należy kolejna tura.
     * @function switchPlayer
     * @private
     */
    const switchPlayer = () => {
        if (activePlayer === playerX) {
            activePlayer = playerO;
        }
        else {
            activePlayer = playerX;
        }
    };


    /**
     * Wyłącza wszystkie elementy planszy (np. po zakończeniu gry),
     * aby nie dało się ich ponownie nacisnąć.
     * @function disableAllButtons
     * @private
     */
    /**
     * Przywraca stan gry do początkowego (czyści planszę i resetuje gracza).
     * @function resetGame
     * @public
     */
    const resetGame = () => {

        displayControler.clearDisplay();

        activePlayer = playerX;

        displayControler.updateCurrentPlayer(getActivePlayer());
        displayControler.updateResult("Result:");

        gameboard.clearGrid();
    };

    /**
     * Zwraca informacje o tym kto wygrał.
     * @function whoWon
     * @private
     * @param {number} status - numer status (1 - jakiś gracz wygrał | 2 - remis).
     */
    const whoWon = (status) => {

        switch (status) {
            case 1:
                return `${activePlayer.name} won`;
            case 2:
                return `TIE`;
        }

    };

    /**
     * Odpowiada za wykonanie pojedynczej tury.
     * Sprawdza, czy ruch jest poprawny, aktualizuje planszę i weryfikuje wygraną.
     * @function playRound
     * @public
     * @param {number} index - Indeks elementu planszy, który gracz chce zaznaczyć.
     */
    const playRound = (index) => {

        const currentBoard = gameboard.getGrid();

        if (currentBoard[index] !== 0) {
            console.log("To pole jest już zajęte!");
            return;
        }

        gameboard.changeGridValues(index, activePlayer);
        displayControler.updateGrid(index, activePlayer);

        const winStatus = gameboard.checkWin();

        if (winStatus) {
            displayControler.addTakenClass();
            displayControler.updateResult(whoWon(winStatus));
            return;
        }

        switchPlayer();

        displayControler.updateCurrentPlayer(getActivePlayer());
    };

    /**
     * Zwraca tekst informujący, którego gracza jest teraz tura.
     * @function getActivePlayer
     * @public
     * @returns {string} Ciąg znaków z informacją o aktywnie grającym zawodniku.
     */
    const getActivePlayer = () => {
        return `${activePlayer.name} turn`;
    };

    return {
        getActivePlayer,
        playRound,
        resetGame,
        startGame
    };
})();
