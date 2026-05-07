import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const linkBase =
    "px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition relative";

  const active =
    "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-emerald-400";

  return (
    <>
      {/* 🌑 Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0b]/80 backdrop-blur-lg border-b border-white/20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <NavLink to="/">
            <h1 className="text-xl font-bold text-white tracking-wide">
              Shop<span className="text-emerald-400">IT</span>
            </h1>
          </NavLink>

          {/* Links */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ""}`
              }
            >
              Add Product
            </NavLink>
          </div>

          {/* CTA */}
          <NavLink
            to="/products"
            className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-500 text-black font-semibold transition"
          >
            Explore
          </NavLink>
        </nav>
      </header>
      {/* 🔥 MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
