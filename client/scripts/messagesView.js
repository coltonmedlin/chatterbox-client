var MessagesView = {

  $chats: $('#chats'),

  lastAddedMessage: undefined,

  initialize: function() {
    setInterval(() => {
      App.fetch(()=>{}, MessagesView.filterNew);
      console.log('refreshed');
    }, 1000);
  },

  render: function(arr) {
    // $('#chats').html('');
    var html = '';
    arr.forEach(message => {
      if (message.text && message.username) {
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        message.roomname = App.sanitize(message.roomname);
        RoomsView.initialize(message.roomname);
        html += MessageView.render(message);
      }
    });
    $('#chats').prepend(html);
  },

  filterNew: function(array) {
    let filtered = [];
    //define var for last add message by id
    //loop through new messages
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === App.lastAddedMessage) {
        break;
      }
      filtered.push(array[i]);
    }
    return filtered;
    //only add messages until message id = obj
  }

};