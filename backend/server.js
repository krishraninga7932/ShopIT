import express from "express"
import cors from "cors"
import pool from "./db.js"
import productRoutes from "./routes/productRoutes.js"


const app = express()
const port = 9000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/products",productRoutes)

app.use("/uploads", express.static("uploads"));



async function initDB(params) {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                image TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log("Database initialized successfully");
    } catch (err) {
        console.error("Error initializing database", err);
    }
}

initDB().then(() => {

    app.listen(port, console.log("Your port is running at", port))
})