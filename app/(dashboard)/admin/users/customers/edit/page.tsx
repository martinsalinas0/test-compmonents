import { redirect } from "next/navigation";

export default function EditCustomerPage() {
  redirect("/admin/list/customers");
}
