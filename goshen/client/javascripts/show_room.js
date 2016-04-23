createRoom = function(opts) {
    opts = opts || {};
    r = {
        name: opts.name || "Goshen Room",
        created: new Date()
    };

    return Rooms.insert(r);
};

Template.show_room.created = function() {
    Session.set('currentRoom', this._id);
};

Template.show_room.events({
    'keyup #send-msg': function(ev) {
        if (ev.keyCode == 13) {
            var text = ev.target.value;
            if (!text) return;

            Messages.insert({
                sender: Session.get('myname') || "Anonymous User",
                room: Session.get('currentRoom'),
                text: text,
                date: new Date(),
                source: Session.get('mylang') || 'en'
            });
        }
    }
})
