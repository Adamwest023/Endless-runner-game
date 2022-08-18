//import outside files
import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import {
    FlyingEnemy,
    GroundEnemy,
    ClimbingEnemy
} from './enemies.js';

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
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }
        update(deltaTime) {
            //calls player update method
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle adding enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
        }
        addEnemy() {
            this.enemies.push(new FlyingEnemy(this))
        }
    }

    const game = new Game(canvas.width, canvas.height);

    console.log(game);

    let lastTime = 0;

    function animate(timeStamp) {
        //configure deltaTime
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //clears canvas each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});