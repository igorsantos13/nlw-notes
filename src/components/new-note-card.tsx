import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onSaveNote: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onSaveNote }: NewNoteCardProps) {
  const [chooseText, setChooseText] = useState(false);
  const [contentFromTextArea, setContentFromTextArea] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentFromTextArea(event.target.value);
    if (event.target.value === "") setChooseText(false);
  };

  const handleSaveNote = () => {
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
    const isSpeechRecognitionApiAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionApiAvailable) {
      alert(
        "Infelizmente seu navegador não suporta a funcionalidade de gravação"
      );
      return;
    }

    setChooseText(true);
    setIsRecording(true);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContentFromTextArea(transcription);
    };

    speechRecognition.onerror = (err) => {
      console.error(err);
    };

    speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
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
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md overflow-hidden flex flex-col outline-none">
          <div className="flex w-full justify-end">
            <Dialog.Close
              onClick={() => setChooseText(false)}
              className="h-8 w-8 bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-100"
            >
              <X className="size-5 " />
            </Dialog.Close>
          </div>
          <form className="flex-1 flex flex-col">
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
                className="flex flex-row items-center gap-2 justify-center w-full bg-slate-800 text-sm text-slate-300 text-center py-4 font-medium  transition transform hover:text-slate-100 delay-150"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 text-sm text-lime-950 text-center py-4 font-medium  transition transform hover:bg-lime-500 delay-150"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
