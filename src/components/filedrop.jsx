import { useRef, useState } from "react";
import { RiUpload2Line } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";

export default function FileDrop({
  accept = "image/*,application/pdf",
  onChange,
  className
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [arquivo, setArquivo] = useState(null);

  function handleFile(file) {
    if (!file) return;
    setArquivo(file);
    onChange?.(file);
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        w-full flex flex-col items-center justify-center gap-3
        py-10 px-6 rounded-lg cursor-pointer
        border-2 border-dashed transition-colors duration-200
        ${dragging ? "border-amber-400 bg-amber-50" : "border-slate-300 hover:border-amber-400 bg-slate-50"}
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
      />
      {arquivo ? (
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-semibold text-indigo-950 flex items-center gap-2">
            <FaRegFileAlt size={20} className="text-amber-400" />
            {arquivo.name}
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500 flex flex-col items-center gap-2">
          <RiUpload2Line size={36} className="text-slate-500" />
          Clique para selecionar um arquivo
        </p>
      )}
    </div>
  );
}
