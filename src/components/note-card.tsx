import * as Dialog from "@radix-ui/react-dialog";
import { NoteDataInfo } from "./note-data-info";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}
export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <NoteDataInfo note={note} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/0 h-1/2 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md overflow-hidden flex flex-col outline-none">
          <div className="flex w-full justify-end">
            <Dialog.Close className="h-8 w-8 bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-100">
              <X className="size-5 " />
            </Dialog.Close>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <NoteDataInfo note={note} />
          </div>
          <button className="w-full bg-slate-800 text-sm text-center py-4 font-medium group">
            Deseja{" "}
            <span className="text-red-400 hover:underline group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
