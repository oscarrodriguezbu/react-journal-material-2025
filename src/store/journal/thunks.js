import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote } from "./";
import {
  deleteNoteById,
  savingNewNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // getState tiene todo lo que esta en el store
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)); //esto es de firebase
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //! dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  //PARA RECIBIR LA DATA DE LAS NOTAS
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe"); //ES UN POR SI ACASO

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id; //eleiminar una propiedad de un objeto, es necesario porque no lo quiero guardar en firebase

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true }); //merge es una union para mantener la info de la base de datos y guardar lo que se neciste guardar

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  //carga de imagenes
  return async (dispatch) => {
    dispatch(setSaving());

    // await fileUpload( files[0] );
    const fileUploadPromises = []; //arreglo de promesas
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file)); //subir todos los archivos simultaneamente
    }

    const photosUrls = await Promise.all(fileUploadPromises); //subir todos los archivos simultaneamente
    //cuanto todas son resueltas, se obtiene la respuesta
    dispatch(setPhotosToActiveNote(photosUrls)); //guardar urls en firebase
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id)); //tambien se podria eliminar la imagen del cloudinary, pero se recomienda usar cloudinary por backend
  };
};
