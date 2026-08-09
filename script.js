import { displayControler } from "./displayControler";
import { gameControler } from "./gameControler";

export const domGrid = document.querySelectorAll(".game_board_item");
export const currentPlayer = document.querySelector(".current_player");
export const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart_btn");

const form = document.querySelector(".name_form");

class Player {
    constructor(name, marker) {
        if (marker !== "X" && marker !== "O") {
            throw new Error("Enter X or O as a marker");
        }

        this.name = name;
        this.marker = marker;
    }
}

export function createPlayer(name, marker){
    return new Player(name, marker);
}



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