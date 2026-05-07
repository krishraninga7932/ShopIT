import axios from "axios";
import {
    Form,
    redirect,
    useLoaderData,
    useActionData,
} from "react-router";
import { useEffect } from "react";

export async function loader({ params }: any) {
    try {
        const res = await axios.get(`http://localhost:9000/products/${params.id}`);
        return res.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function action({ request, params }: any) {
    const formData = await request.formData();

    try {
        await axios.put(
            `http://localhost:9000/products/update/${params.id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return redirect("/products");
    } catch (err: any) {
        return {
            error: err.response?.data?.message || "Update failed",
        };
    }
}

export default function EditProduct() {
    const product = useLoaderData<any>();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            alert(actionData.error);
        }
    }, [actionData]);

    if (!product) {
        return <p className="text-center mt-20 text-gray-400">Product not found</p>;
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white px-6 pt-28 pb-16 flex justify-center">

            <div className="w-full max-w-md bg-[#111] border border-white/20 rounded-xl p-8">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white text-center">
                    Edit Product
                </h2>

                <p className="text-gray-400 text-center mt-2">
                    Update your product details
                </p>

                {/* Form */}
                <Form
                    method="post"
                    encType="multipart/form-data"
                    className="mt-6 flex flex-col gap-5"
                >

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={product.name}
                            className="w-full mt-1 px-4 py-2 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm text-gray-400">Price</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={product.price}
                            className="w-full mt-1 px-4 py-2 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="text-sm text-gray-400">Update Image</label>
                        <input
                            type="file"
                            name="image"
                            className="mt-2 text-sm text-gray-300 cursor-pointer"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="mt-4 cursor-pointer bg-emerald-400 text-black py-3 rounded-lg font-semibold hover:bg-emerald-500 transition"
                    >
                        Update Product
                    </button>

                </Form>

            </div>
        </div>
    );
}