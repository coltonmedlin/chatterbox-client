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
      // examine the response from the server request:
      console.log(data.results);
      var html = '';
      data.results.forEach(message => {
        //sanitize
        message.text = App.sanitize(message.text);
        message.username = App.sanitize(message.username);
        html += MessageView.render(message);
      });
      //append to the dom
      console.log(html);
      MessagesView.render(html);
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

  // sanitize: function(string) {
  //   let sanitizedString = '';
  //   // / escape: /\{\{\-(.+?)\}\}/g
  //   let dictionary = {
  //     "&": "&amp;",
  //     "<": "&lt;",
  //     ">": "&gt;",
  //     '"': "&quot;",
  //     "'": "&#039;"
  //   };
  //   //create dictionary obj
  //     //loop over string
  //   for (let i = 0; i < string.length; i++) {
  //     if (dictionary[string[i]]) {
  //       sanitizedString += dictionary[string[i]];
  //     } else {
  //       sanitizedString += string[i];
  //     }
  //   }
  //   return sanitizedString;
  // }

  sanitize: function(string) {
    let sanitizedString = '';
    sanitizedString = string.replace('/\{\{\-(.+?)\}\}/g');
    return sanitizedString;
  }

};
