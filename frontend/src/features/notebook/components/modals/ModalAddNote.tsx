import { useState } from "react";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";

type ModalAddNoteProps = {
  isOpen: boolean;
  closeModal: () => void;
  addNote: (title: string, content: string, category: "vocabulary" | "grammar" | "pronunciation") => void;
};

const ModalAddNote = ({ isOpen, closeModal, addNote }: ModalAddNoteProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"vocabulary" | "grammar" | "pronunciation">("vocabulary");

  const categories = [
    { id: "vocabulary" as const, label: "Slovíčka" },
    { id: "grammar" as const, label: "Gramatika" },
    { id: "pronunciation" as const, label: "Výslovnost" },
  ];

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      addNote(title, content, category);
      setTitle("");
      setContent("");
      setCategory("vocabulary");
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="flex absolute  h-screen w-screen items-start justify-center  z-50 backdrop-brightness-70 pt-20">
          <div className="flex flex-col relative w-5xl gap-base px-12 pb-8 pt-12 bg-brand-neutral-100 border border-brand-neutral-200 rounded-base">
            <div className="top-base text-brand-300 text-2xl font-bold absolute self-center">
              Vytvořit poznámku
            </div>
            <Icon
              name="close"
              className="right-base top-base text-brand-neutral-300 absolute size-8 cursor-pointer"
              onClick={closeModal}
            />
            
            <div className="flex flex-col gap-6 mt-8">
              <div>
                <input
                  type="text"
                  placeholder="Nadpis poznámky..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-black bg-transparent outline-none border-none placeholder:text-neutral-400"
                />
                <textarea
                  placeholder="Napište svou poznámku..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 px-4 py-3 bg-neutral-100 border-b-2 border-brand-300 outline-none text-lg resize-none mt-4"
                />
              </div>
              
              <div>
                <button className="text-brand-300 text-base font-medium">+ přidat blok</button>
              </div>
              
              <div>
                <div className="text-xl font-semibold mb-4">Kategorie</div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-full bg-brand-300 text-white font-semibold text-sm">
                    Obecně
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`px-6 py-3 rounded-full font-semibold text-sm ${
                        category === cat.id
                          ? "bg-brand-300 text-white"
                          : "bg-neutral-300 text-neutral-600"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-base mt-6">
              <div className="flex-1">
                <Button text="Zrušit" size="large" autoWidth onClick={closeModal} />
              </div>
              <div className="flex-1">
                <Button text="Vytvořit poznámku" size="large" autoWidth onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddNote;
