createRoom = function(opts) {
    opts = opts || {};
    r = {
        name: opts.name || "Goshen Room",
        created: new Date()
    };

    return Rooms.insert(r);
};

Template.show_room.rendered = function() {
    Session.set('preferences_speak', true);
    Session.set('myname', $('#js-my-name').value() || `Anonymous User ${parseInt(Math.random(1)*100)}`);

    msgs = Messages.find({
        'room': Session.get('currentRoom')
    }, {
        sort: { date: 1 }
    });

    Meteor.setTimeout(function() {
        msgs.observeChanges({
            added: function(id, object) {
                var last = Session.get('latestMessage') || msgs.fetch().slice(-2)[0];
                console.log(last)
                if (
                    (object.date*1 > last.date*1) && // latest message
                    (object.sender != Session.get('myname')) && // i didn't send
                    (Session.get('preferences_speak')) // preferences to speak
                ) {
                    speak(getMyText(object))
                    Session.set('latestMessage', msgs.fetch().slice(-1)[0]);
                } // TODO: check for if the user wants
            }
        });
    }, 1000);
}

Template.show_room.events({
    'click #lang-select': function(ev) {
        Session.set('mylang', ev.target.checked ? 'de' : 'en');
    },

    'click #speak-select': function(ev) {
        Session.set('preferences_speak', ev.target.checked ? true : false);
    },

    'keyup #send-msg': function(ev) {
        if (ev.keyCode == 13) {
            var text = ev.target.value;
            if (!text) return;

            var mylang = Session.get('mylang') || 'en';

            var _translations = {};
            _translations[mylang] = text;

            Messages.insert({
                sender: Session.get('myname'),
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
    },
    'keyup .js-my-name': function(ev) {
        Session.set('myname', ev.target.value)
    }
});

Template.show_room.helpers({
    'messages': function() {
        return Messages.find({
            'room': Session.get('currentRoom')
        }, {
            sort: { date: 1 }
        }).fetch();
    },

    myname: function() {
        return Session.get('myname');
    }
});

getMyText = function(msg) {
    var mylang = Session.get('mylang') || 'en';

    if (msg.source == mylang) {
        return msg.text;
    }

    if (msg.translations[mylang]) {
        return msg.translations[mylang];
    } else {
        Meteor.call('goshen.translate', msg, msg.text, mylang, msg.source);
        return "...";
    }
}

Template._convo_line.helpers({
    'my_text': function() {
        return getMyText(this)
    }
});
