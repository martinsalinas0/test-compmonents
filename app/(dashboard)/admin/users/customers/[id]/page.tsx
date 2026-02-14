"use client";

import { clientConfig } from "@/lib/config";
import { Customer } from "@/lib/types/customers";
import axios from "axios";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CustomerWithExtras = Customer & {
  transactions?: {
    id: string;
    product: string;
    status: string;
    date: string;
    amount: string;
  }[];
};

const SingleCustomerPage = () => {
  const params = useParams();
  const customerID = params?.id as string;

  const [customer, setCustomer] = useState<CustomerWithExtras | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarUrl = "https://randomuser.me/api/portraits/men/17.jpg";

  useEffect(() => {
    if (!customerID) return;

    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${clientConfig.apiUrl}/customers/${customerID}`,
        );
        setCustomer(res.data.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!customer) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-8 md:grid-cols-3">
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {customer.first_name} {customer.last_name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Customer</p>
            </div>

            <div className="w-full pt-4 border-t border-border">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-muted-foreground">
                  Customer ID
                </span>
                <span className="font-mono text-foreground">
                  {customer.id.slice(-8)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 font-semibold text-cerulean-900">Notes</h3>
          <div className="flex flex-wrap gap-2">
            {customer.notes ? (
              <span className="rounded-md bg-cerulean-100 px-2 py-1 text-xs font-medium text-cerulean-700">
                {customer.notes}
              </span>
            ) : (
              <span className="text-pacific-500 text-sm">No notes</span>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-cerulean-900">
            Customer Info
          </h2>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-base text-foreground mb-1">
                Address
              </h4>
              <p className="text-sm text-muted-foreground">
                {customer.address}
                <br />
                {customer.city}, {customer.state} {customer.zip_code}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-base text-foreground mb-1">
                Billing Address
              </h4>
              <p className="text-sm text-muted-foreground">
                {customer.billing_address}
                <br />
                {customer.billing_city}, {customer.billing_state}{" "}
                {customer.billing_zip}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground mb-1">
                Phone Number:
              </h4>
              <p className="text-sm text-muted-foreground">{customer.phone}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Transaction History
          </h3>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {customer.transactions && customer.transactions.length > 0 ? (
                customer.transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="border-b p-2">{t.product}</td>
                    <td className="border-b p-2">{t.status}</td>
                    <td className="border-b p-2">{t.date}</td>
                    <td className="border-b p-2">{t.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan={4}>
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:col-span-3 lg:col-span-1">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Connections
          </h3>
          <ul className="space-y-2">
            <li>No connections yet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
