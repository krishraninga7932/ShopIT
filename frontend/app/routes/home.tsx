import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";
import axios from "axios";
import { useLoaderData } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const res = await axios.get("http://localhost:9000/products/stats")
  return res.data.data
}


export default function Home() {

  const stats: any = useLoaderData()


  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen px-6 pt-28 pb-16">

      {/* 🧠 Top Info Strip (NOT hero) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
        <div>
          <p className="text-sm text-gray-400">Dashboard Overview</p>
          <h1 className="text-4xl font-bold mt-1">
            Product Control Center
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            to="/add-product"
            className="px-5 py-2 rounded-lg text-black bg-emerald-400 hover:bg-emerald-500 transition font-medium"
          >
            + New Product
          </Link>
          <Link
            to="/products"
            className="px-5 py-2 rounded-lg border border-white/20 hover:border-white transition"
          >
            View All
          </Link>
        </div>
      </div>

      {/* 📊 Stats Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Total Products", value: stats.totalProducts },
          { title: "Active Listings", value: "102" },
          { title: "Out of Stock", value: "26" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#111] p-6 rounded-xl border border-white/20 hover:border-emerald-400 transition"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* 🧾 Activity Feed (NEW IDEA) */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Recent Activity */}
        <div className="bg-[#111] rounded-xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {[
              "Added new product: iPhone 15",
              "Updated price: Laptop",
              "Deleted product: Headphones",
              "Added image to: Shoes",
            ].map((item, i) => (
              <div
                key={i}
                className="text-sm text-gray-300 border-b border-white/10 pb-2"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 🧠 Quick Actions Panel */}
        <div className="bg-[#111] rounded-xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/add-product"
              className="p-4 rounded-lg bg-white/5 hover:bg-emerald-500/20 transition text-center"
            >
              Add Product
            </Link>

            <Link
              to="/products"
              className="p-4 rounded-lg bg-white/5 hover:bg-emerald-400/20 transition text-center"
            >
              Manage Products
            </Link>

            <div className="p-4 rounded-lg bg-white/5 text-gray-400 text-center">
              Analytics
            </div>

            <div className="p-4 rounded-lg bg-white/5 text-gray-400 text-center">
              Reports
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
