import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("products", "routes/products.tsx"),
    route("add-product", "routes/add-product.tsx"),
    route("edit-product/:id", "routes/edit-product.tsx"),
] satisfies RouteConfig;