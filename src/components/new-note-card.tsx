import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onSaveNote: (content: string) => void;
}

export function NewNoteCard({ onSaveNote }: NewNoteCardProps) {
  const [chooseText, setChooseText] = useState(false);
  const [contentFromTextArea, setContentFromTextArea] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentFromTextArea(event.target.value);
    if (event.target.value === "") setChooseText(false);
  };

  const handleSaveNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //salva a nota como estado
    if (contentFromTextArea == "") {
      toast.error("Não é permitido notas vazias");
      return;
    }
    onSaveNote(contentFromTextArea);
    setContentFromTextArea("");
    setChooseText(false);

    toast.success("Nota salva com sucesso!");
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-slate-600 p-5 gap-3 flex flex-col text-left relative rounded-md hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none overflow-hidden">
        <div className="bg-slate-800 rounded-tr-sm absolute top-0 right-0 h-8 w-8 flex justify-center items-center">
          xD
        </div>
        <span className="text-slate-200">Adicionar nota</span>
        <p className="text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md overflow-hidden flex flex-col outline-none">
          <div className="flex w-full justify-end">
            <Dialog.Close
              onClick={() => setChooseText(false)}
              className="h-8 w-8 bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-100"
            >
              <X className="size-5 " />
            </Dialog.Close>
          </div>
          <form className="flex-1 flex flex-col" onSubmit={handleSaveNote}>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {chooseText ? (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleTextAreaChange}
                  value={contentFromTextArea}
                ></textarea>
              ) : (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="text-lime-400 font-medium bg-white/5 hover:underline"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    className="text-lime-400 font-medium bg-white/5 hover:underline"
                    onClick={() => setChooseText(true)}
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full bg-slate-800 text-sm text-slate-300 text-center py-4 font-medium  transition transform hover:text-slate-100 delay-150"
              >
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button className="w-full bg-lime-400 text-sm text-lime-950 text-center py-4 font-medium  transition transform hover:bg-lime-500 delay-150">
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
