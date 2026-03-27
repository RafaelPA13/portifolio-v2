import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  renderCell,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-slate-50">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-200 text-indigo-950 font-semibold">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 ${!col.mobile ? "hidden md:table-cell" : ""}`}
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-center text-mist-500"
              >
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id ?? index}
                className="border-t border-slate-200 hover:bg-slate-100 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-indigo-950 ${!col.mobile ? "hidden md:table-cell" : ""}`}
                  >
                    {renderCell
                      ? renderCell(col.key, item[col.key], item)
                      : item[col.key] ?? "—"}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(item)}
                      className="p-2 rounded-lg text-indigo-950 hover:bg-amber-100 hover:text-amber-500 transition-colors duration-150"
                      title="Editar"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete?.(item)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-500 transition-colors duration-150"
                      title="Deletar"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}