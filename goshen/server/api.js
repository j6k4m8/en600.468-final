Meteor.methods({
    'goshen.translate': function(msg, text, target, source) {
        g = new Goshen();
        // msg is the id of incoming message, must add callback to mutate the database
        return g.translate(text, target, source);
    }
});
