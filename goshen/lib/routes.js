Router.configure({
    layoutTemplate: 'main'
})

Router.route('/', function () {
    this.render('home', {});
});

Router.route('/room/:id', function() {
    this.render('show_room', {
        data: Rooms.findOne(this.params.id)
    })
})
