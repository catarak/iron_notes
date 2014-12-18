// for more details see: http://emberjs.com/guides/models/defining-models/

IronNotes.Note = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  priorityLevel: DS.attr('string'),
  updatedAt: DS.attr('date')
});
