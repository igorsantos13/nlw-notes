import logo from "./assets/logo.svg";
import { NoteCard } from "./components/note-card";
import { NewNoteCard } from "./components/new-note-card";
import { ChangeEvent, useState } from "react";

interface Notes {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Notes[]>(() => {
    let notesFromLS = localStorage.getItem("notes");

    if (notesFromLS) return JSON.parse(notesFromLS);

    return [];
  });

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLowerCase())
        )
      : notes;

  function onSaveNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function onDeleteNote(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
          value={search}
        />
      </form>
      <div className="bg-slate-700 h-px" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onSaveNote={onSaveNote} />
        {filteredNotes?.map((note) => (
          <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} />
        ))}
      </div>
    </div>
  );
}
