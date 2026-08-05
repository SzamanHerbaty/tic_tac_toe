
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
        getGrid: () => gameboardGrid 
    }
})();


const playerX = createPlayer("Mariusz", "X");
const playerO = createPlayer("Janusz", "O");

console.log(playerX);
console.log(playerO);

console.log(gameboard.getGrid());

gameboard.changeGridValues(0, playerO)
gameboard.changeGridValues(4, playerO)
gameboard.changeGridValues(8, playerO)

console.log(gameboard.getGrid());
console.log(gameboard.checkWin());

