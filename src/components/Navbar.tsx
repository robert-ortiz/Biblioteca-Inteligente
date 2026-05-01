"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/acerca", label: "Acerca" },
];

// Eliminamos la interfaz Props porque ya no recibimos dark/setDark desde afuera
export function Navbar() {
  const pathname = usePathname();
  // Estado local para saber en qué tema estamos (para cambiar el ícono del botón)
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Al montar, verificamos si el HTML ya tiene la clase dark (puesta por el ThemeProvider)
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // Actualizamos el DOM directo y guardamos en localStorage (Persistencia 🚀)
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__brand">
          Biblioteca
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="navbar__nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="navbar__item">
                  <Link
                    className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <button
          onClick={toggleTheme}
          className="btn btn--secondary"
          // Evitamos mostrar texto incorrecto antes de que el componente se hidrate
          style={{ visibility: mounted ? 'visible' : 'hidden' }}
        >
          {isDark ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>
    </header>
  );
}