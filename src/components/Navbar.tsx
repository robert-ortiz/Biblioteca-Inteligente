import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/acerca", label: "Acerca" },
];

export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-zinc-950/90 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Biblioteca Inteligente
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-5 text-sm text-zinc-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}