// Define the menu state
var menuState = {
	create: function() {
		// Create title
		var nameLabel = game.add.text(80, 80, 'SimHeckler', {
			font: '50px Courrier',
			fill: '#fff'
		});
		// Create subtitle
		var startLabel = game.add.text(80, game.world.height - 80, 'press s to start', {
			font: '25px Courrier',
			fill: '#fff'
		});

		// Map key to start & listen
		var sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		sKey.onDown.addOnce(this.start, this);
	},
	// Chain play state
	start: function() {
		game.state.start('play');
	}
};