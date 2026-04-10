export default function Buttons({ text, icon, onClick, className, type = "button" , disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 bg-amber-400 text-indigo-950 flex items-center justify-center gap-2 rounded-md transition-colors duration-300 text-left hover:cursor-pointer hover:bg-indigo-950 hover:text-amber-400 ${className || ''}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}