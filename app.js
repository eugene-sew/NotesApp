const noteTitle = document.querySelector(".note-title");
const noteBody = document.querySelector(".note-body");
const addBtn = document.getElementById("add-btn");
const clrBtn = document.getElementById("clear");
const recents = document.getElementById("recents");

const date = new Date();

const smallText =
  date.getDate() +
  "/" +
  date.getMonth() +
  "/" +
  date.getFullYear() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes();

const noteInfo = {
  title: noteTitle.value,
  body: noteBody.value,
  time: smallText,
};

const addIntoRecents = (notes) => {
  const row = document.createElement("li");
  row.innerHTML = `${notes.title} <br />
  <small>${notes.time}</small>`;

  recents.append(row);
  saveToLocalStorage(notes);
};

const saveToLocalStorage = (note) => {
  let storedNotes = getNotesFromLocalStorage();
  storedNotes.push(note);
  localStorage.setItem("notes", JSON.stringify(storedNotes));
};

const getNotesFromLocalStorage = () => {
  let storedNotes;
  if (localStorage.getItem("notes") === null) {
    storedNotes = [];
  } else {
    storedNotes = JSON.parse(localStorage.getItem("notes"));
  }
  return storedNotes;
};

const addNote = async () => {
  addIntoRecents(noteInfo);
  document.location.reload();
};

addBtn.addEventListener("click", addNote);

const getFromLocalStorage = () => {
  let notesInStorage = getNotesFromLocalStorage();
  notesInStorage.forEach((note) => {
    const row = document.createElement("li");
    row.innerHTML = `${note.title}... <br />
    <small>${note.time}</small>`;
    recents.append(row);
  });
};

getFromLocalStorage();

const clearFromStorage = () => {
  localStorage.clear("notes");
  recents.innerHTML = "";
};

clrBtn.addEventListener("click", clearFromStorage);
