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
function GenericTable<T extends object>({
  data,
  columns,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full bg-card border border-border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border-b border-border px-6 py-3 text-sm font-medium text-foreground"
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
                className="py-4 text-sm text-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={
                  "id" in row && (row as { id?: unknown }).id != null
                    ? String((row as { id: unknown }).id)
                    : i
                }
                className="hover:bg-olive-50"
              >
                {columns.map((col) => {
                  const value = row[col.accessor];

                  return (
                    <td
                      key={String(col.accessor)}
                      className="border-b border-border px-6 py-4 text-sm text-foreground"
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
