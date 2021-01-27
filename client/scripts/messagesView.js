var MessagesView = {

  $chats: $('#chats'),

  lastAddedMessage: undefined,

  initialize: function() {
    setInterval(() => {
      App.fetch();
    }, 1000);
  },

  render: function(arr) {
    $('#chats').html('');
    var html = '';
    arr.forEach(message => {
      if (message.text && message.username) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        message.roomname = App.sanitize(message.roomname);
        // html += MessageView.render(message);
        html += MessageView.render(message);
      }
    });
    $('#chats').append(html);
  }

};