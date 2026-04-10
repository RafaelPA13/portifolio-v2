import { useState } from "react";
import { IoClose } from "react-icons/io5";

import Buttons from "./buttons";

export default function Form({
  titulo,
  onClose,
  onSubmit,
  loading = false,
  children,
}) {
  const [saindo, setSaindo] = useState(false);

  function fechar() {
    setSaindo(true);
    setTimeout(() => {
      onClose?.();
    }, 100);
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) fechar();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 ${saindo ? "animate-fade-out" : "animate-fade-in"}`}
      onClick={handleBackdropClick}
    >
      <form
        onSubmit={handleSubmit}
        className={`          
          w-full max-w-2xl
          max-h-[90vh]
          bg-slate-50 p-6 border border-slate-300 rounded-xl
          grid grid-cols-2 gap-5
          overflow-y-auto
          ${saindo ? "animate-zoom-out-form" : "animate-zoom-in-form"}`}
      >
        <span className="col-span-2 flex items-center justify-between">
          <p className="font-semibold">{titulo}</p>
          <button
            type="button"
            onClick={fechar}
            className="opacity-50 transition-opacity duration-300 hover:opacity-100"
            aria-label="Fechar formulário"
          >
            <IoClose size={20} />
          </button>
        </span>
        {children}
        <Buttons
          text={loading ? "Salvando..." : "Salvar"}
          type="submit"
          disabled={loading}
          className="col-span-2"
        />
      </form>
    </div>
  );
}
