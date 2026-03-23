import useInView from "../hooks/useInView";

export default function Skill({ skill, animated = true, delay = 0 }) {
  const { ref, inView } = useInView();

  return (
    <li
      ref={ref}
      style={animated ? { animationDelay: `${delay}ms`, animationFillMode: "backwards" } : {}}
      className={`bg-mist-200 border-2 border-mist-300 rounded-full px-3 py-2 text-indigo-950 transition-opacity duration-300 ${animated ? (inView ? "animate-zoom-in" : "opacity-0") : ""}`}
    >
      {skill}
    </li>
  );
}
