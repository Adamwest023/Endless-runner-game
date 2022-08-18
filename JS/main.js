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

        }
        update(){}

        draw(){}
    }
});