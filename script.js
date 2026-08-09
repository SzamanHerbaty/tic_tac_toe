import { displayControler } from "./displayControler.js";
import { gameControler } from "./gameControler.js";

const domGrid = document.querySelectorAll(".game_board_item");
const restartBtn = document.querySelector(".restart_btn");
const form = document.querySelector(".name_form");


domGrid.forEach((element, index) => {
    element.addEventListener("click", (e) =>{
        gameControler.playRound(index);
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