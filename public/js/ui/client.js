$(document).ready(function() {
    // Instantiate game object
    var game = new Phaser.Game(400, 300, Phaser.AUTO, '#window', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        // Preload game assets
        game.load.image('background', 'assets/images/bg.png');
        game.load.spritesheet('comedian', 'assets/images/comedian.png', 32, 32);
        game.load.spritesheet('heckler', 'assets/images/heckler.png', 32, 48);
        game.load.image('bubble', 'assets/images/bubble-left.png');
        // game.load.bitmapFont('carriercommand', 'assets/fonts/carrier_command-black.png', 'assets/fonts/carrier_command.xml')
    }

    // Game variable
    var textOutput;
    var textInput;

    var returnKey;
    var backspaceKey;

    var socket = io();

    function create() {

        // Create the bg
        game.add.sprite(0, 0, 'background');

        // Create the bubbles
        bubbleLeft = game.add.sprite(80, 0, 'bubble');
        bubbleLeft.scale.setTo(1, 0.5);
        bubbleRight = game.add.sprite(335, 180, 'bubble');
        bubbleRight.scale.setTo(-1, 0.4);

        // Create the text
        fontStyle = {
            font: '12px Arial',
            fill: 'black',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: 250
        };
        textOutput = game.add.text(bubbleLeft.x + 45, bubbleLeft.y + 15, '', fontStyle);
        textInput  = game.add.text(bubbleRight.x - 295, bubbleRight.y + 15, '', fontStyle);

        // Map the ui keys
        returnKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        returnKey.onDown.add(returnPress, this);
        backspaceKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        backspaceKey.onDown.add(backspacePress, this);

        // Create the comedian
        comedian = game.add.sprite(50, game.world.height - 200, 'comedian');
        comedian.animations.add('speak', [2, 3], 1000, false);
        comedian.animations.add('idle', [2], 10, true);
        comedian.animations.play('idle', 50, true);

        // Create the player
        player = game.add.sprite(325, game.world.height - 60, 'heckler');
        player.animations.add('speak', [0, 1, 2, 3], 10, false);
        player.animations.add('idle', [4], 10, true);
        player.animations.play('idle', 50, true);

    }

    // Get response from client & put it in textOutput
    function getResponse(response) {
        comedian.animations.play('speak', 2000, false);
        textOutput.text = response;
    }

    function keyPress(char) {
        // console.log(char)
        textInput.text += char;
    }

    function returnPress() {
        // console.log('return')
        // console.log('send_msg: ', textInput.text)
        player.animations.play('speak', 1000, false);
        socket.emit('send_msg', textInput.text);
        textInput.text = "";
    }

    function backspacePress() {
        // console.log('backspace')
        textInput.text = textInput.text.slice(0, -1);
    }

    // The loop
    function update() {
        // Bind function to keypress event 
        game.input.keyboard.addCallbacks(this, null, null, keyPress);
    }

    // ####################################################
    // cs-client
    socket.on('send_msg', function(msg) {
        getResponse(msg);
    });
});