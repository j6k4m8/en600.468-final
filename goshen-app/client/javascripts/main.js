UI.registerHelper('title', function(title) {
    document.title = title;
});

Template.home.events({
    'click .js-create-room': function() {
        var rid = createRoom();
        console.log(rid)
        Session.set('currentRoom', rid);
        Router.go('show_room', {id: rid});
    }
});

Template.nav.events({
    'click .js-create-room': function() {
        var rid = createRoom();
        console.log(rid)
        Session.set('currentRoom', rid);
        Router.go('show_room', {id: rid});
    }
});
