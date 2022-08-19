import {
    Sitting,
    Running,
    Jumping,
    Falling,
    Rolling,
} from './playerState.js'
export class Player {
    //points to the game file
    constructor(game) {
        this.game = game;
        this.width = 100
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = player;
        //frame animation
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0
        this.maxFrame = 1;
        this.speed = 0;
        this.maxSpeed = 10;
        //for vertical speed
        this.vy = 0;
        this.weight = 1;
        //state design helper
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
        ];
       
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal speed
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        //creates a horizontal border for movement
        if (this.x < 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        //sprite animation
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        //debug mode
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        //takes 3,5,9 arguments
        //image, 4X source,4x destination
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    //checks if sprite is on ground
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    //lets us switch between states 
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    //collision detection
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y) {
                //collision detected
                enemy.markedForDeletion = true;
                this.game.score++;
            } else {
            }
        })
    }
}