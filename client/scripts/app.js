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
      //console.log(data.results);
      // var html = '';
      // data.results.forEach(message => {
      //   if (message.text && message.username && message.roomname) {
      //     message.text = App.sanitize(message.text);
      //     message.username = App.sanitize(message.username);
      //     message.roomname = App.sanitize(message.roomname);
      //     html += MessageView.render(message);
      //   }
      // });
      // console.log('html: ', html);
      MessagesView.render(data.results);
      // MessagesView.lastAddedMessage = data.results[0].id;
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

// Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

//determine if it's a new room being created or existing
//FETCH:
//As we're populating messages in our chatterbox from fetcher
  //check each message for roomname
    //if roomname not existing in our dropdown options
      //add it
        //add that message to that room/see all
//POST:
  //on submit check for roomname
    //add message to that room/see all