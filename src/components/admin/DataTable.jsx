import { classNames } from "../../utils/format";

export default function DataTable({ columns, data, keyField = "id", emptyMessage = "No records found." }) {
  return (
    <div className="overflow-x-auto -mx-5 md:mx-0">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr className="border-b border-black/8 text-left">
            {columns.map((col) => (
              <th key={col.key} className={classNames("py-3 px-5 md:px-3 text-xs font-semibold uppercase tracking-wide text-ink/45", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-10 text-center text-ink/40 text-sm">
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row[keyField]} className="hover:bg-black/[0.02] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={classNames("py-3.5 px-5 md:px-3", col.className)}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
