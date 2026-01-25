"use client";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}
function GenericTable<T>({
  data,
  columns,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto text-center">
      <div></div>
      <table className="min-w-full bg-background border border-cerulean-100">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border-b border-cerulean-200 px-6 py-3 text-sm font-medium text-cerulean"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-sm text-cerulean"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-olive-50">
                {columns.map((col) => {
                  const value = row[col.accessor];

                  return (
                    <td
                      key={String(col.accessor)}
                      className="border-b border-cerulean-200 px-6 py-4 text-sm text-cerulean"
                    >
                      {col.render ? col.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
