import { Form, redirect } from "react-router"
import axios from "axios"
import { useState } from "react"

export async function action({ request }: any) {
    const formData = await request.formData();

    await axios.post("http://localhost:9000/products", formData)
    return redirect("/products")
}

export default function AddProduct() {
    const [preview, setPreview] = useState<string | null>(null)

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white px-6 pt-28 pb-16">

            <div className="max-w-3xl mx-auto bg-[#111] border border-white/20 rounded-xl p-8">

                <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

                <Form method="post" encType="multipart/form-data" className="space-y-6">

                    <div>
                        <label className="text-sm text-gray-400">Product Name</label>
                        <input type="text" name="name" className="w-full mt-1 px-4 py-2 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400" required />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Price</label>
                        <input
                            type="number"
                            name="price"
                            required
                            className="w-full mt-1 px-4 py-2 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Product Image</label>
                        <input type="file" name="image" accept="image/*" onChange={(e: any) => {
                            const file = e.target.files[0]
                            if (file) {
                                setPreview(URL.createObjectURL(file))
                            }
                        }} className="mt-2 block text-sm text-gray-300 cursor-pointer" />
                        {/* Preview */}
                        {preview && (
                            <img
                                src={preview}
                                className="mt-4 h-40 rounded-lg object-cover border border-white/20"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-400 cursor-pointer text-black py-3 rounded-lg font-semibold hover:bg-emerald-500 transition"
                    >
                        Add Product
                    </button>

                </Form>

            </div>
        </div>
    )
}