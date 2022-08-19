//import outside files
import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import {
    FlyingEnemy,
    GroundEnemy,
    ClimbingEnemy
} from './enemies.js';
import { UI } from './UI.js';

//waits for all of our elements to load before any code runs 
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
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
            this.input = new InputHandler(this);
            this.floatingMessages = [];
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.maxParticles = 50;
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = 'black';
            this.lives = 5;
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            //end game parameters
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
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
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            //handle messages
            this.floatingMessages.forEach(message => {
                message.update();
            });
            //delete enemy/particles/messages/collision animaiton objects
            this.floatingMessages = this.floatingMessages.filter(message => !message.
                markedForDeletion);
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            //handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
        }
        draw(context) {
            this.background.draw(context);

            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        //configure deltaTime
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //clears canvas each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});