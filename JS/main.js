//import outside files
import { Player } from './player.js';
import { InputHandler } from './input.js';

//waits for all of our elements to load before any code runs 
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    //main brain of project
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();

        }
        update() {
            //calls player update method
            this.player.update(this.input.keys);
        }
        draw(context) {

            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    console.log(game);

    function animate() {
        //clears canvas each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});