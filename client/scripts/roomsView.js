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

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  rooms: new Set(),

  initialize: function(room) {
    console.log('room: ', room);
    //add each room as a key to the room obj
    if (room === '') {
      return;
    }
    for (let i = 0; i < RoomsView.$select[0].length; i++) {
      if (room === RoomsView.$select[0][i].innerText) { //goal is to dedupify select
        return;
      }
    }
    RoomsView.render(room)
    RoomsView.$select.append(`<options>${room}</options>`);
    roomsView.$select.append($('<option>', {
      value: 1,
      text: `${room}`
     }));
    //otherwise its a new room, add it
    // console.log(RoomsView.$select[0][i].innerText); //roomname
    // RoomsView.rooms.add(room);
    // //add each key to the dom in the room selector dropdown
    // RoomsView.$select.html('');
    // console.log(RoomsView.rooms);
    // RoomsView.Rooms.forEach(room => {
    //   RoomsView.$select.append(`<options>${room}</options>`);
    // });
  },

  render: function(room) {
    var html = '';
    html += RoomView.render(room);
    // RoomsView.$select.append(`<options>${room}</options>`);
    $('#rooms').append(html);
  }

};
