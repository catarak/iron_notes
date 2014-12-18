var IronNotes = Ember.Application.create();

IronNotes.ApplicationAdapter = DS.ActiveModelAdapter.extend()

IronNotes.Router.map(function(){
  this.resource('notes', function(){
    this.resource('note', {path: "/:note_id"})
  });
})

IronNotes.NotesRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('note');
  }
})

IronNotes.NoteController = Ember.ObjectController.extend({
  editing: false,
  newNote: function(){
    return this.store.createRecord('note')
  }.property('model'),
  actions: {
    editNote: function(){
      this.toggleProperty('editing')
    },

    updateNote: function(){
      var controller = this;
      this.get('model').save().then(function(){
        controller.toggleProperty('editing')
      })
    },
    deleteNote: function(){
      var controller = this;
      this.get('model').destroyRecord().then(function(){
        controller.transitionToRoute('notes')
      })
    }
  }
})

IronNotes.NotesController = Ember.ArrayController.extend({
  sortProperties: ['updatedAt'],
  sortAscending: false,
  noteCount: Ember.computed.alias('length'),
  mostRecent: function(){
    return this.get('model').sortBy(['updatedAt']).reverseObjects().objectAt(0)
  }.property('model.@each.updatedAt')
})

IronNotes.NewNoteController = Ember.Controller.extend({
  actions: {
    createNote: function(){
      var title = this.get('title')
      var body = this.get('body')
      if(!title || !body) return false

      var note = this.store.createRecord('note', {
        title: this.get('title'),
        body: this.get('body')
      })

      var controller = this;

      note.save().then(function(model){
        controller.transitionToRoute('note', model)
      })
    }
  }
})

Ember.Handlebars.registerBoundHelper('prettyTime', function(date){
  return moment(date).fromNow()
})

Ember.Handlebars.registerBoundHelper('markdown', function(text){
  return new Ember.Handlebars.SafeString(markdown.toHTML(text));
})
