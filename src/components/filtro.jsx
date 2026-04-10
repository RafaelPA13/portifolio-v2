export default function Filtro({ options, selectedOption, onSelect }) {
  return (
    <ul className="flex items-center justify-center flex-wrap gap-2 w-full md:w-[95%]">
      <li
        className={`py-2 px-3 rounded-full hover:cursor-pointer transition-colors ${selectedOption !== "Todos" ? "bg-slate-200 text-indigo-950 hover:bg-indigo-950 hover:text-slate-50" : "bg-amber-400 text-indigo-950"}`}
        onClick={() => onSelect("Todos")}
      >
        Todos
      </li>
      {options.tecnologias?.map((tech, index) => (
        <li 
            key={index} 
            className={`py-2 px-3 rounded-full hover:cursor-pointer transition-colors ${selectedOption === tech.skill ? "bg-amber-400 text-indigo-950" : "bg-slate-200 text-indigo-950 hover:bg-indigo-950 hover:text-slate-50"}`}
            onClick={() => onSelect(tech.skill)}>
            {tech.skill}
        </li>
      ))}
    </ul>
  );
}
