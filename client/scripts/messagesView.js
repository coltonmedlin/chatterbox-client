var MessagesView = {

  $chats: $('#chats'),

  lastAddedMessage: undefined,

  initialize: function() {
    setInterval(() => {
      App.fetch();
    }, 1000);
  },


  render: function(data) {
    var html = '';
    data.results.forEach(message => {
      if (message.text && message.username) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        html += MessageView.render(message);
      }
    });
    $('#chats').html('');
    $('#chats').append(html);
  },


};