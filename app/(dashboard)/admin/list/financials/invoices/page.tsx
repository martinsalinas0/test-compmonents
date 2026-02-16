import { redirect } from "next/navigation";

export default function InvoicesListPage() {
  redirect("/admin/list/financials/invoices/customers");
}
