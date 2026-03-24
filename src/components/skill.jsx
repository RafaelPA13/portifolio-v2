import useInView from "../hooks/useInView";

export default function Skill({ skill, animated = true, delay = 0, inicio = true, card = false }) {
  const { ref, inView } = useInView();

  return (
    <li
      ref={ref}
      style={animated ? { animationDelay: `${delay}ms`, animationFillMode: "backwards" } : {}}
      className={
        `${inicio ? "bg-slate-200 border-2 border-slate-300 px-3 py-2 text-indigo-950" 
          : card ? "bg-slate-200 border-0 px-2 py-1 text-sm" : "bg-amber-100 border-0 px-2 py-1 text-sm text-amber-400"} 
        rounded-full transition-opacity duration-300 
        ${animated ? (inView ? "animate-zoom-in" : "opacity-0") : ""}`}
    >
      {skill}
    </li>
  );
}
