// Define the boot state
var bootState = {
	create: function() {
		// Things from .startSystem() get started here

		// Chain the load state
		game.state.start('load');
	}
};