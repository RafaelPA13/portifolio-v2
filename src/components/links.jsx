import { Link } from "react-router-dom";

export default function Links({ text, icon, to, blank, iconLeft, amarelo = false }) {
  return (
    <Link
      to={to}
      target={blank ? "_blank" : "_self"}
      className={`px-4 py-2 flex items-center gap-2 rounded-md transition-colors duration-300 hover:cursor-pointer ${amarelo ? "border-0 bg-amber-400 hover:bg-amber-500" : "bg-slate-50 border border-slate-300 hover:bg-amber-400"}`}
    >
      {icon ? (
        iconLeft ? (
          <span className="flex items-center justify-center gap-2">
            {icon} {text}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {text} {icon}
          </span>
        )
      ) : (
        text
      )}
    </Link>
  );
}
