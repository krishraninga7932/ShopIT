import { useLoaderData, Link } from "react-router";
import axios from "axios";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export async function loader() {
    const res = await axios.get("http://localhost:9000/products")
    return res.data.data
}

export default function Products() {
    const data: any[] = useLoaderData();
    const [products, setProducts] = useState(data)
    const handleDelete = async (id: Number) => {
        try {
            await axios.delete(`http://localhost:9000/products/delete/${id}`);

            setProducts(products.filter((p) => p.id !== id))

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white px-6 pt-28 pb-16">

            <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
                <div>
                    <p className="text-gray-400 text-sm">Inventory</p>
                    <h1 className="text-3xl font-bold">All Products</h1>
                </div>

                <Link
                    to="/add-product"
                    className="bg-emerald-400 text-black px-5 py-2 rounded-lg font-medium hover:bg-emerald-500 transition"
                >
                    + Add Product
                </Link>
            </div>
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map((p) => (
                    <div
                        key={p.id}
                        className="bg-[#111] rounded-xl border border-white/20 overflow-hidden hover:border-emerald-400 transition group"
                    >
                        {/* Image */}
                        <div className="h-60 bg-black overflow-hidden">
                            <img
                                src={`http://localhost:9000/uploads/${p.image}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h2 className="font-semibold text-lg">{p.name}</h2>
                            <p className="text-gray-400 text-sm mt-1">₹ {p.price}</p>

                            {/* Actions */}
                            <div className="flex justify-between mt-4 text-sm">
                                <Link
                                    to={`/edit-product/${p.id}`}
                                    className="text-yellow-200 hover:underline"
                                >
                                    <Pencil size={18} />
                                </Link>

                                <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:underline cursor-pointer">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* 🧾 Empty State */}
            {products.length === 0 && (
                <div className="text-center mt-20 text-gray-400">
                    No products found. Start by adding one 🚀
                </div>
            )}

        </div >
    )

}