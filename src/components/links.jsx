import { Link } from "react-router-dom";

export default function Links({ text, icon, to, blank, iconLeft }) {
  return (
    <Link
      to={to}
      target={blank ? "_blank" : "_self"}
      className="px-4 py-2 bg-mist-50 border-2 border-mist-300 flex items-center gap-2 rounded-md transition-colors duration-300 hover:cursor-pointer hover:bg-amber-400"
    >
      {icon ? (
        iconLeft ? (
          <span className="flex items-center gap-2">
            {icon} {text}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {text} {icon}
          </span>
        )
      ) : (
        text
      )}
    </Link>
  );
}
