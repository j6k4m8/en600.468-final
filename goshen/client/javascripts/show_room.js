createRoom = function(opts) {
    opts = opts || {};
    r = {
        name: opts.name || "Goshen Room",
        created: new Date()
    };

    return Rooms.insert(r);
};

Template.show_room.events({
    'click #lang-select': function(ev) {
        Session.set('mylang', ev.target.checked ? 'de' : 'en');
    },

    'keyup #send-msg': function(ev) {
        if (ev.keyCode == 13) {
            var text = ev.target.value;
            if (!text) return;

            var mylang = Session.get('mylang') || 'en';

            var _translations = {};
            _translations[mylang] = text;

            Messages.insert({
                sender: Session.get('myname') || "Anonymous User",
                room: Session.get('currentRoom'),
                text: text,
                date: new Date(),
                source: mylang,
                translations: _translations
            });

            ev.target.value = "";
        }
    },

    'keyup .js-room-name': function(ev) {
        Rooms.update(Session.get('currentRoom'), {$set: { 'name': ev.target.value }})
    }
});

Template.show_room.helpers({
    'messages': function() {
        return Messages.find({
            'room': Session.get('currentRoom')
        }, {
            sort: { date: 1 }
        }).fetch();
    }
});

Template._convo_line.helpers({
    'my_text': function() {
        var mylang = Session.get('mylang') || 'en';

        if (this.translations[mylang]) {
            return this.translations[mylang];
        } else {
            Meteor.call('goshen.translate', this, this.text, mylang, this.source);
            return "...";
        }
    }
});
