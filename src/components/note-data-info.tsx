import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

export function NoteDataInfo({ note }: NoteCardProps) {
  return (
    <>
      <span className="text-sm font-medium text-slate-300">
        {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
      </span>

      <p className="text-sm leading-6 text-slate-400">{note.content}</p>
    </>
  );
}
