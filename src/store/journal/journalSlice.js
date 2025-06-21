import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: { //es como quiero que luzca el active
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567, //formato numerico para reconstruirlo posteriormente
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
  },
  reducers: {
    savingNewNote: (state) => {//es para esperar cuando se esté guardando una nota
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {//clic en el boton crear nota
      state.notes.push(action.payload);//el push muta, pero como se trata de un slice, no pasa nada. No se debe preocupar por eso
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {//establecer cual es la nota activa en el slide
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {//cargar las notas
      state.notes = action.payload;
    },
    setSaving: (state) => {//guardar notas
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action) => {//actualizar notas
      // payload: note
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },

    deleteNoteById: (state, action) => {//eliminacion de la nota
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
