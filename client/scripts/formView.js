var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    let mssg = {};
    mssg.username = App.sanitize(App.username);
    mssg.text = App.sanitize(FormView.$form.serializeArray()[0].value);
    mssg.roomname = App.sanitize('');
    Parse.create(mssg);
    App.fetch();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

};