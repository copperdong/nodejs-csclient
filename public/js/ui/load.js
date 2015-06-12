// Define the load state
var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {
			font: '30px Arial',
			fill: '#fff'
		});
		// Load the game assets
		game.load.image('background', '../../assets/images/bg.png');
		game.load.spritesheet('comedian', '../../assets/images/comedian.png', 32, 32);
		game.load.spritesheet('heckler', '../../assets/images/heckler.png', 32, 48);
		game.load.image('bubble', '../../assets/images/bubble-left.png');
		// game.load.bitmapFont('carriercommand', 'assets/fonts/carrier_command-black.png', 'assets/fonts/carrier_command.xml')
	},
	create: function() {
		// Chaine the menu state
		game.state.start('menu');
	}
};