class NotesController < ApplicationController
  def index
    render json: Note.all
  end

  def create
    safe_note = params.require(:note).permit(:title, :body, :priority_level)
    note = Note.create(safe_note)
    render json: note
  end

  def update
    safe_note = params.require(:note).permit(:title, :body, :priority_level)
    note = Note.find(params[:id])
    note.update(safe_note)
    render json: note    
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    render json: {}
  end
end
