
const domGrid = document.querySelectorAll(".game_board_item");
const currentPlayer = document.querySelector(".current_player");
const result = document.querySelector(".result");

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
                if (gameboardGrid[a] === 1){
                    return "Player X won";
                }
                else{
                    return "Player O won";
                }
            }
        }

        if (!gameboardGrid.includes(0)){
                return "tie";
        }


        return null;
    };

    const getGrid = () => {
        return gameboardGrid;
    }

    return {
        changeGridValues,
        checkWin,
        getGrid
    }
})();


const gameControler = (() => {
    const playerX = createPlayer("Mariusz", "X");
    const playerO = createPlayer("Ania", "O");

    let activePlayer = playerX;

    const switchPlayer = () =>{
        if (activePlayer === playerX){
            activePlayer = playerO;
        }
        else{
            activePlayer = playerX;
        }
    };

    const changeDisplay = (index, activePlayer) => {
        domGrid[index].textContent = activePlayer.marker;
    }

    const getActivePlayer = () => {
        return `Player ${activePlayer.marker} turn`;
    };

    const disableAllButtons = () => {
        domGrid.forEach(element => {
            element.classList.add("taken");
        })
    }

    const playRound = (index) => {

        const currentBoard = gameboard.getGrid();

        if (currentBoard[index] !== 0) {
            console.log("To pole jest już zajęte!");
            return; 
        }

        gameboard.changeGridValues(index, activePlayer);

        changeDisplay(index, activePlayer);

        const winStatus = gameboard.checkWin();

        if(winStatus){
            disableAllButtons();
            result.textContent = winStatus;
            return;
        }

        switchPlayer();
    }

    return {
        getActivePlayer,
        playRound
    }
})();


domGrid.forEach((element, index) => {
    element.addEventListener("click", (e) =>{
        gameControler.playRound(index);

        e.target.classList.add("taken");

        currentPlayer.textContent = gameControler.getActivePlayer();
    })
})