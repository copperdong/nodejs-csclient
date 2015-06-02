$(document).ready(function() {
var socket = io()
      $('form').submit(function() {
        socket.emit('send_msg', $('#m').val())
        $('#m').val('')
        return false
      })
      socket.on('send_msg', function(msg) {
        $('#messages').append($('<li>').text(msg))
      })
})