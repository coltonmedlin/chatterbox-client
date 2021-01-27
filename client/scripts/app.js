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
      MessagesView.render(data.results);
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
    if (string === undefined || string === null || string.length === 0) {
      return sanitizedString;
    }
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