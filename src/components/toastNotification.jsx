import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function ToastNotification({ danger = false, mensagem, onClose }) {
  const [saindo, setSaindo] = useState(false);

  function fechar() {
    setSaindo(true);

    setTimeout(() => {
      onClose?.();
    }, 400);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fechar();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <span
        className={`group w-90 p-6 rounded-lg shadow-lg relative flex flex-col gap-1
          ${danger ? "bg-red-500" : "bg-mist-50 border border-mist-300"}
          ${saindo ? "animate-slide-out-right" : "animate-slide-in-up"}
        `}
      >
        <h2 className={danger ? "font-bold text-mist-50" : "hidden"}>
          Erro
        </h2>

        <p className={danger ? "font-medium text-slate-50 text-sm" : "font-semibold"}>
          {mensagem}
        </p>

        <button onClick={fechar} className="absolute top-4 right-4" aria-label="Fechar notificação">
          <IoClose size={20} className={`opacity-0 transition-opacity group-hover:opacity-50 hover:!opacity-100 ${danger ? "text-slate-50" : "text-indigo-950"}`}/>
        </button>
      </span>
    </div>
  );
}