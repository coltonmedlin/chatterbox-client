// Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function(room) {
    if (room === '' || room === undefined) {
      return false;
    }
    for (let i = 0; i < RoomsView.$select[0].length; i++) {
      if (room === RoomsView.$select[0][i].innerText) {
        return false;
      }
    }
    RoomsView.$select.append($('<option>', {
      value: 1,
      text: `${room}`
    }));
    return true;
  },

  filter: function() {
    RoomsView.$select.change(function(event) {
      App.roomname = $(this).find('option:selected').text();
      if (App.roomname === 'SEE ALL ROOMS') {
        App.fetch();
      } else {
        var filter = function(array, rmName) {
          let filtered = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].roomname && array[i].roomname === App.roomname) {
              filtered.push(array[i]);
            }
          }
          return filtered;
        };
        App.fetch(()=>{}, filter);
      }
    });
  }

};
