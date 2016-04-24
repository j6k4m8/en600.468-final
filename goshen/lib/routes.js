Router.configure({
    layoutTemplate: 'main'
})

Router.route('/', function () {
    this.render('home', {});
});

Router.route('/room/:id', {
    template: 'show_room',
    name: 'show_room',
    data: function() { Session.set('currentRoom', this.params.id); return Rooms.findOne(this.params.id) }
})
