export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';

    }
    draw(context) {

        // game over message
        if (!this.game.gameOver) {
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.textAlign = 'left';
            context.fillStyle = this.game.fontColor
            //score
            context.fillText('Score: ' + this.game.score, 20, 50);
            //timer
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Time: ' + this.game.time, 20, 80);

        } else {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('test ' + this.game.time, this.game.width * 0.5,
                this.game.height * 0.5);
        }
    }
} 