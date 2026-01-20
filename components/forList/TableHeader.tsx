"use client";

interface TableHeaderProps {
  columns: string[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead className="bg-cerulean-50 uppercase">
      <tr>
        {columns.map((label) => (
          <th
            key={label}
            className="border-b border-cerulean-100 px-6 py-3 text-center text-sm font-semibold text-cerulean"
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
