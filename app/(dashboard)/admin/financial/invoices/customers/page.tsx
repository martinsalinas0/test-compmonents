import { redirect } from "next/navigation";

export default function CustomerInvoicesPage() {
  redirect("/admin/list/financials/invoices/customers");
}
