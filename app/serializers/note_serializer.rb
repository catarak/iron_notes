class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :priority_level, :updated_at
end
