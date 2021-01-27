var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      console.log(data.results);
      var html = '';
      data.results.forEach(message => {
        if (message.text) {
          message.text = App.sanitize(message.text);
          message.username = App.sanitize(message.username);
          html += MessageView.render(message);
        }
      });
      MessagesView.render(data);
      MessagesView.lastAddedMessage = data.results[0].id;
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  sanitize: function(string) {
    let sanitizedString = '';
    let dictionary = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    for (let i = 0; i < string.length; i++) {
      if (dictionary[string[i]]) {
        sanitizedString += dictionary[string[i]];
      } else {
        sanitizedString += string[i];
      }
    }
    return sanitizedString;
  }

};
