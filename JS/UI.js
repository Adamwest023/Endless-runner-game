export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = lives;
        this.heartImage = hearts;
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 0;
        // game over message
        if (!this.game.gameOver) {
            context.font = this.fontSize + 'px ' + this.fontFamily;
            context.textAlign = 'left';
            context.fillStyle = this.game.fontColor
            //score
            context.fillText('Score: ' + this.game.score, 20, 50);
            //timer
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Time: ' + (this.game.time * 0.001).toFixed(0), 20, 80);
            //lives
            for (let i = 0; i < this.game.lives; i++) {
                context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
            }

        } else {
            context.textAlign = 'center';
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            context.fillText('Game Over ', this.game.width * 0.5,
                this.game.height * 0.5 - 40);
            if (this.game.score >= this.game.winningScore) {
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('Your Score ' + this.game.score, this.game.width * 0.5,
                    this.game.height * 0.5);
                context.fillText('Hope you had a smashing time!', this.game.width * 0.5,
                    this.game.height * 0.5 - 80);
            } else if (this.game.score < this.game.winningScore) {
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('Your Score ' + this.game.score, this.game.width * 0.5,
                    this.game.height * 0.5);
                context.fillText('Better luck next time', this.game.width * 0.5,
                    this.game.height * 0.5 - 80);
            }
        }
        context.restore();
    }
} 