export class Player {
    constructor(name, marker) {
        if (marker !== "X" && marker !== "O") {
            throw new Error("Enter X or O as a marker");
        }

        this.name = name;
        this.marker = marker;
    }
}

export function createPlayer(name, marker) {
    return new Player(name, marker);
}
