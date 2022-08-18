export class Player {
    //points to the game file
    constructor(game) {
        this.game = game;
        this.width = 100
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = player;
        this.speed = 0;
        this.maxSpeed = 10;
        //for vertical speed
        this.vy = 0;
        this.weight = 1;
    }
    update(input) {
        //horizontal speed
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        //creates a horizontal border for movement
        if (this.x < 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical movement
        if (input.includes('ArrowUp') && this.onGround()) this.vy -= 30;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

    }

    draw(context) {
        //takes 3,5,9 arguments
        //image, 4X source,4x destination
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    //checks if sprite is on ground
    onGround() {
        return this.y >= this.game.height - this.height;
    }
}