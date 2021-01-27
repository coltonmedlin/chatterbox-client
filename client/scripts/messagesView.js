var MessagesView = {

  $chats: $('#chats'),

  lastAddedMessage: undefined,

  initialize: function() {
    //run fetch every second?

    //how do we differentiate the new from the old:
    //store mssg at index 0
    //concatenate next set of messages (concatenate to mssg at index 0)
    //define var lastAddedMessage =
  },

  renderNew: function(string) {
    var html = '';
    data.results.forEach(message => {
      if (message.id === this.lastAddedMessage) {
        return;
      }
      if (message.text) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        html += MessageView.render(message);
      }
    });
    $('#chats').prepend(string);
  },

  renderOld: function(data) {
    var html = '';
    data.results.forEach(message => {
      if (message.text) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        html += MessageView.render(message);
      }
    });
    $('#chats').append(html);
  }

};