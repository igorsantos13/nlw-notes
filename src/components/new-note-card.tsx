export function NewNoteCard() {
  return (
    <div className="bg-slate-600 p-5 space-y-6 relative rounded-md">
      <div className="bg-slate-800 rounded-tr-sm absolute top-0 right-0 h-8 w-8 flex justify-center items-center">
        xD
      </div>
      <span className="text-slate-200">Adicionar nota</span>
      <p className="text-slate-400">
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
    </div>
  );
}
