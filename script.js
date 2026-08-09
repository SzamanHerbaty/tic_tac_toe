
const domGrid = document.querySelectorAll(".game_board_item");
const currentPlayer = document.querySelector(".current_player");
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart_btn");

const form = document.querySelector(".name_form");

function createPlayer(name, marker){
    if (marker !== "X" && marker !== "O"){
        return "Enter X or O as a marker";
    }

    return {name, marker};
}

const gameboard = (() => {
    
    let gameboardGrid = [0, 0, 0, 
                         0, 0, 0, 
                         0, 0, 0];

    //  changeGridValues(index, player) - zmienia na planszy (tablica gameboardGrid) wartość pod podanym indexem 
    //  w zależności jaki player zmienił wartość na planszy
    //
    // Jeżeli gracz z X to gameboardGrid[index] = 1;
    // Jeżeli gracz z O to gameboardGrid[index] = 2;

    const changeGridValues = (index, player) =>{

        if(gameboardGrid[index] !== 0){
            return "This index is already taken";
        }

        if(player.marker === "X"){
            gameboardGrid[index] = 1;
        }
        else{
            gameboardGrid[index] = 2;
        }
    };

    const checkWin = () =>{
        // Lista wszystkich możliwych kombinacji które wygrywają kółko i krzyżyk

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Wiersze
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolumny
            [0, 4, 8], [2, 4, 6]             // Przekątne
        ];
        
        for (let combination of winningCombinations){
            const [a, b, c] = combination;

            if (gameboardGrid[a] !== 0 && gameboardGrid[a] === gameboardGrid[b] && gameboardGrid[a] === gameboardGrid[c]){
                return 1;
            }
        }

        if (!gameboardGrid.includes(0)){
                return 2;
        }


        return null;
    };

    const getGrid = () => {
        return gameboardGrid;
    }

    const clearGrid = () =>{
        gameboardGrid = [0, 0, 0, 
                         0, 0, 0, 
                         0, 0, 0];
    }

    return {
        changeGridValues,
        checkWin,
        getGrid,
        clearGrid
    }
})();


/**
 * Obiekt odpowiedzialny za kontrolę przebiegu gry.
 * Zarządza turami graczy i aktualizacją interfejsu.
 * @namespace
 *  gameController
 */

const displayControler = (()=>{

    const removeTakenClass = () => {
        domGrid.forEach(element => {
            element.classList.remove("taken");
        })
    }

    const addTakenClass = () => {
        domGrid.forEach(element => {
            element.classList.add("taken");
        })
    }


    const updateCurrentPlayer = (text) =>{
        currentPlayer.textContent = text;
    }


    const updateResult = (text) => {
        result.textContent = text;
    }

    const updateGrid = (index, activePlayer) =>{
        domGrid[index].textContent = activePlayer.marker;
    }

    const clearDisplay = () => {
        domGrid.forEach(element => {
            element.textContent = "";
            element.classList.remove("taken");
        })
    }

    return {
        removeTakenClass,
        addTakenClass,
        updateCurrentPlayer,
        updateResult,
        updateGrid,
        clearDisplay
    }

})();


// __________________________________________________

const gameControler = (() => {

    let playerX = createPlayer("Player 1", "X");
    let playerO = createPlayer("Player 2", "O");

    let activePlayer = playerX;

    /**
     * Odpowiada za rozpoczęcie gry.
     * @function startGame
     * @public
     */

    const startGame = (name1, name2) => {
        playerX = createPlayer(name1, "X");
        playerO = createPlayer(name2, "O");
        
        resetGame();
    }

    /**
     * Zmienia obecnego gracza na tego, do którego należy kolejna tura.
     * @function switchPlayer
     * @private
     */

    const switchPlayer = () =>{
        if (activePlayer === playerX){
            activePlayer = playerO;
        }
        else{
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

    const resetGame = () =>{

        displayControler.clearDisplay();

        activePlayer = playerX;

        displayControler.updateCurrentPlayer(getActivePlayer());
        displayControler.updateResult("Result:");

        gameboard.clearGrid();
    }   

    /**
     * Zwraca informacje o tym kto wygrał.
     * @function whoWon
     * @private
     * @param {number} status - numer status (1 - jakiś gracz wygrał | 2 - remis).
     */

    const whoWon = (status) => {

        switch (status){
            case 1:
                return `${activePlayer.name} won`;
            case 2:
                return `TIE`;
        }

    }

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

        displayControler.updateGrid(index, activePlayer)

        const winStatus = gameboard.checkWin();

        if(winStatus){
            displayControler.addTakenClass();
            displayControler.updateResult(whoWon(winStatus));
            return;
        }

        switchPlayer();
    }

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
    }
})();


domGrid.forEach((element, index) => {
    element.addEventListener("click", (e) =>{
        gameControler.playRound(index);

        e.target.classList.add("taken");

        displayControler.updateCurrentPlayer(gameControler.getActivePlayer());
    })
})


restartBtn.addEventListener("click", gameControler.resetGame);


form.addEventListener("submit", (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);

    const playerXName = formData.get("playerX")
    const playerOName = formData.get("playerO")


    gameControler.startGame(playerXName, playerOName);

    form.reset();

})