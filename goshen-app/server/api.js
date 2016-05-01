Meteor.methods({
    'goshen.translate': function(msg, text, target, source) {
        g = new Goshen(Meteor.settings.moses_server.default_url);
        // msg is the id of incoming message,
        // must add callback to mutate the database
        var val = g.translate(text, target, source);
        var _udict = {};
        _udict['translations.' + target] = val;
        var tkey = 'translations.' + target;
        console.log(tkey, val);
        Messages.update(msg._id, {$set: _udict});
    }
});
