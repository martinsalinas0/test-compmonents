"use client";

import { clientConfig } from "@/lib/config";
import { Customer } from "@/lib/types/customers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type CustomerWithExtras = Customer & {
  activities?: string[];
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
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={avatarUrl}
              height={150}
              width={150}
              alt="profile pic"
              className="rounded-full"
            />
            <h2 className="text-xl font-bold">{customer.first_name} {customer.last_name}</h2>
            <span className="text-sm text-muted-foreground">
              {customer.city}, {customer.state}
            </span>

            <div className="mt-4 flex justify-between w-full text-center text-sm font-medium">
              <div>
                <p>{customer.id}</p>
                <span className="text-muted-foreground">ID</span>
              </div>
              <div>
                <p>{customer.address}</p>
                <span className="text-muted-foreground">Address</span>
              </div>
              <div>
                <p>{customer.state}</p>
                <span className="text-muted-foreground">State</span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>{customer.email}</p>
              <p>{customer.phone ?? "—"}</p>
              <a
                href={customer.phone ? `tel:${customer.phone}` : "#"}
                className="text-cerulean-700 hover:underline block"
              >
                Call {customer.first_name}
              </a>
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
        {/* Latest Activity */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-cerulean-900">
            Latest Activity
          </h3>
          <ul className="space-y-2">
            {customer.activities && customer.activities.length > 0 ? (
              customer.activities.map((act, i) => <li key={i}>{act}</li>)
            ) : (
              <li>No activities yet.</li>
            )}
          </ul>
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
