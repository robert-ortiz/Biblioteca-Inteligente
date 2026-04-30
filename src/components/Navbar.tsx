"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/acerca", label: "Acerca" },
];

export function Navbar() {
  const pathname = usePathname();

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
      </div>
    </header>
  );
}