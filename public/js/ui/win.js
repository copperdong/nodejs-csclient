// Define the win state
var winState = {
	create: function() {
		// Create title
		var nameLabel = game.add.text(80, 80, 'You win!', {
			font: '50px Courrier',
			fill: '#fff'
		});
		// Create subtitle
		var startLabel = game.add.text(80, game.world.height - 80, 'press space to restart', {
			font: '25px Courrier',
			fill: '#fff'
		});

		// Map key to start & listen
		var spaceKey = game.input.keyboard.addkey(Phaser.Keyboard.SPACE);
		spaceKey.onDown.addOncce(this.restart, this);
	},
	// Chain play state
	restart: function() {
		game.state.start('menu');
	}
};