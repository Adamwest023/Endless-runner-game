export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            //registers if a key is pressed and if it is the first time it has been added to the array
            if ((e.key === 'ArrowDown' ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === ' '
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }else if (e.key === 'd')this.game.debug = !this.game.debug
        });
        //registers if a key is released and removes it from the array 
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
