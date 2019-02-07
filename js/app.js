// Global Variables
const wins = document.querySelector('.wins');
const loses = document.querySelector('.loses');

let winsCount = 0;
let losesCount  = 0;;

// Enemy class
class Enemy {

    // Each enemy object is initially
    // - positioned off the grid (x)
    // - has a (y) position based on the argument that is
    //    passed in when Enemy is created
    // - has random speed
    // - shares the same visual asset
    constructor(y) {
        this.x = -101;
        this.y = y;
        this.speed = Math.floor(Math.random() * 500) + 100;
        this.sprite = 'images/enemy-bug.png';
    }


    update(dt){

        // updates enemy position as it moves along the screen,
        // dt, a time delta between ticks
        this.x += this.speed * dt;

        // resets x position of the Enmy once it "traveled"
        // acrosse the screen
        if (this.x > 505) {
            this.x = -101;
            this.speed = Math.floor(Math.random() * 500) + 100;
        }

        // reset player position and update "Loses" count if player runs into enemy
        if (this.x < player.x + 80  && this.x + 80  > player.x &&
          this.y < player.y + 83 && this.y + 83 > player.y) {
              player.x = 202;
              player.y = 395;

              losesCount++;
              loses.innerHTML = losesCount;
          }
    }

    // draw the enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}// end class Enemy

// Player class
class Player {

    // Player object is positioned at specified location
    constructor() {
        this.x = 202;
        this.y = 395;
        this.sprite = 'images/char-boy.png';
    }

    //
    update() {
        // reset player position and update "Wins" count if player
        // reaches any of the "water" squares
        if (this.y < 63) {
            this.x = 202;
            this.y = 395;

            winsCount++;
            wins.innerHTML = winsCount;
        }
    }

    // draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // defines arrow key control for the player and
    // does not allow player move off the grid
    handleInput(key) {
        if (this.x > 0 && key === 'left') {
            this.x -= 101;
        }

        if (this.x < 404 && key === 'right') {
            this.x += 101;
        }

        if (this.y > 0  && key === 'up') {
            this.y -= 83;
        }

        if (this.y < 395 && key === 'down') {
            this.y += 83;
        }
    }
}// end class Player

// instantiate player
const player = new Player();

//instantiate enemies
const enemy1 = new Enemy(63);
const enemy2 = new Enemy(146);
const enemy3 = new Enemy(229);

const allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
