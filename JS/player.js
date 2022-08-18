export class Player {
    //points to the game file
    constructor(game) {
        this.game = game;
        this.width = 100
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = player;

    }
    update() {
        // this.x++;
    }

    draw(context) {

        //takes 3,5,9 arguments
        //image, 4X source,4x destination
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}