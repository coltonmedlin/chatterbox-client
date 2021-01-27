var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  //where is this being invoked from?
    //gets invoked by user click submit
  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    let mssg = {};
    mssg.username = App.sanitize(App.username);
    mssg.text = App.sanitize(FormView.$form.serializeArray()[0].value);
    mssg.roomname = App.sanitize(''); //come back and do room stuff
    //SEND THE message to the server
    Parse.create(mssg);
    //update the DOM
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};