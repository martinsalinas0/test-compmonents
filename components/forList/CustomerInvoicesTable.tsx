"use client";

import { CustomerInvoice } from "@/lib/types/all";

import Link from "next/link";
import GenericTable, { Column } from "./GenericTable";

interface Props {
  data: CustomerInvoice[];
}

export default function CustomerInvoicesTable({ data }: Props) {
  const getLastSix = (str: string) => str.slice(-6);

  const columns: Column<CustomerInvoice>[] = [
    {
      header: "ID",
      accessor: "id",
      render: (_, invoice) => (
        <Link href={`/admin/jobs/${invoice.id}`}>
          E-{getLastSix(invoice.id)}
        </Link>
      ),
    },
    {
      header: "Job ID",
      accessor: "job_id",
      render: (v) => `F${getLastSix(v as string)}`,
    },
    {
      header: "Customer ID",
      accessor: "customer_id",
      render: (v) => `C-${getLastSix(v as string)}`,
    },
    {
      header: "Invoice Number",
      accessor: "invoice_number",
      render: (v) => `INV-${(v as string).slice(-9)}`,
    },
    {
      header: "Total",
      accessor: "total",
      render: (v) => `$${v}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (v) => String(v).toUpperCase(),
    },
    {
      header: "Due Date",
      accessor: "created_at",
      render: (v) => new Date(v as string).toLocaleDateString(),
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      emptyMessage="No invoices found"
    />
  );
}
