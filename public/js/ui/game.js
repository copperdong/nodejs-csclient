// Instantiate Phaser game object
var game = new Phaser.Game(400, 300, Phaser.AUTO, '#window');

// Define game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

// Chain the boot state
game.state.start('boot');