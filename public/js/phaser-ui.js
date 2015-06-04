$(document).ready(function() {
    var game = new Phaser.Game(400, 300, Phaser.AUTO, '#window', { preload: preload, create: create, update: update });

    function preload() {
        // Preload game assets
        game.load.image('background', 'assets/images/bg.png');
        game.load.spritesheet('comedian', 'assets/images/comedian.png', 32, 32);
        game.load.spritesheet('heckler', 'assets/images/heckler.png', 32, 48);
    }

    function create() {

        // Create the bg
        game.add.sprite(0, 0, 'background');

        // Create the comedian
        comedian = game.add.sprite(32, game.world.height - 150, 'comedian');
        comedian.animations.add('speak', [2, 3], 1000, true)
        comedian.animations.add('idle', [2], 10, true)
        comedian.animations.play('speak', 10000, true);

        player = game.add.sprite(32, game.world.height - 100, 'heckler');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.animations.add('idle', [4], 10, true);
        player.animations.play('idle', 50, true);
    }

    function update() {
    }
})