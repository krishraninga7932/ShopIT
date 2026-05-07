import pool from "../db.js"

export const getProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products ORDER BY created_at DESC")
        console.log("fetched products:", products.rows)

        res.status(200).json({
            success: true,
            data: products.rows,
        })
    } catch (err) {
        console.log("Error in getAllProducts function", err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const singleProduct = await pool.query("SELECT * FROM products WHERE id=$1", [id])

        res.json({
            success: true,
            data: singleProduct.rows[0]
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body

        const image = req.file ? req.file.filename : null;

        if (!name || !price || !image) {
            return res.status(400).json({
                success: false,
                message: "Name, price and image are required",
            });
        }

        const newProduct = await pool.query(`INSERT INTO products (name,price,image) VALUES ($1,$2,$3) RETURNING *`, [name, price, image]);

        res.status(200).json({
            success: true,
            message: "Product inserted successfully",
            data: newProduct.rows[0]
        })

    } catch (err) {
        console.log("Error in addProduct:", err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [id])

        // checking remaining rows
        const countResult = await pool.query("SELECT COUNT(*) FROM products")

        const count = parseInt(countResult.rows[0].count)

        if (count === 0) {
            await pool.query("ALTER SEQUENCE products_id_seq RESTART WITH 1")
        }

        res.json({
            success: true,
            message: "Product Deleted Successfully",
            data: deleted.rows[0]
        })


    } catch (err) {
        console.log("Error in deleteProduct function", err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const existing = await pool.query(`SELECT * FROM products WHERE id = $1`, [id])

        if (existing.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let image = existing.rows[0].image

        if (req.file) {
            image = req.file.filename;
        }

        const updated = await pool.query(
            "UPDATE products SET name=$1, price=$2, image=$3 WHERE id=$4 RETURNING *",
            [name || existing.rows[0].name,
            price || existing.rows[0].price,
                image,
                id]
        );

        res.json({
            success: true,
            data: updated.rows[0]
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
}

export const stats = async (req, res) => {
    try {

        const totalProducts = await pool.query("SELECT COUNT(*) FROM products")

        res.json({
            success: true,
            data: {
                totalProducts: parseInt(totalProducts.rows[0].count),
            },
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in showing stats"
        })
    }
}