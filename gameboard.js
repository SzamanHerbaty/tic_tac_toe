
/**
 * Obiekt odpowiedzialny za kontrolę przebiegu gry.
 * Zarządza turami graczy i aktualizacją interfejsu.
 * @namespace
 *  gameController
 */

export const gameboard = (() => {

    let gameboardGrid = [0, 0, 0,
        0, 0, 0,
        0, 0, 0];

    //  changeGridValues(index, player) - zmienia na planszy (tablica gameboardGrid) wartość pod podanym indexem 
    //  w zależności jaki player zmienił wartość na planszy
    //
    // Jeżeli gracz z X to gameboardGrid[index] = 1;
    // Jeżeli gracz z O to gameboardGrid[index] = 2;
    const changeGridValues = (index, player) => {

        if (gameboardGrid[index] !== 0) {
            return "This index is already taken";
        }

        if (player.marker === "X") {
            gameboardGrid[index] = 1;
        }
        else {
            gameboardGrid[index] = 2;
        }
    };

    const checkWin = () => {
        // Lista wszystkich możliwych kombinacji które wygrywają kółko i krzyżyk
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Wiersze
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolumny
            [0, 4, 8], [2, 4, 6] // Przekątne
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;

            if (gameboardGrid[a] !== 0 && gameboardGrid[a] === gameboardGrid[b] && gameboardGrid[a] === gameboardGrid[c]) {
                return 1;
            }
        }

        if (!gameboardGrid.includes(0)) {
            return 2;
        }


        return null;
    };

    const getGrid = () => {
        return gameboardGrid;
    };

    const clearGrid = () => {
        gameboardGrid = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
    };

    return {
        changeGridValues,
        checkWin,
        getGrid,
        clearGrid
    };
})();
