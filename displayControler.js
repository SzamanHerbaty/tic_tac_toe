import { domGrid, currentPlayer, result } from "./script";

export const displayControler = (() => {

    const removeTakenClass = () => {
        domGrid.forEach(element => {
            element.classList.remove("taken");
        });
    };

    const addTakenClass = () => {
        domGrid.forEach(element => {
            element.classList.add("taken");
        });
    };


    const updateCurrentPlayer = (text) => {
        currentPlayer.textContent = text;
    };


    const updateResult = (text) => {
        result.textContent = text;
    };

    const updateGrid = (index, activePlayer) => {
        domGrid[index].textContent = activePlayer.marker;
    };

    const clearDisplay = () => {
        domGrid.forEach(element => {
            element.textContent = "";
            element.classList.remove("taken");
        });
    };

    return {
        removeTakenClass,
        addTakenClass,
        updateCurrentPlayer,
        updateResult,
        updateGrid,
        clearDisplay
    };

})();
